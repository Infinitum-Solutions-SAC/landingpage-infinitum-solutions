#!/bin/bash

# Script para sincronizar cambios durante el desarrollo

# Configuración de colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

log() {
    echo -e "${BLUE}[$(date '+%H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

echo "🔄 Sincronizador de Desarrollo - Landing Page"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Cambiar al directorio donde está el docker-compose
SCRIPT_DIR="$(dirname "$0")"
cd "$SCRIPT_DIR" || {
    echo "Error: No se pudo cambiar al directorio $SCRIPT_DIR"
    exit 1
}

# Determinar comando de Docker Compose
DOCKER_CMD="docker compose"
if ! docker compose version &> /dev/null; then
    if command -v docker-compose &> /dev/null; then
        DOCKER_CMD="docker-compose"
    else
        echo "Error: Ni 'docker compose' ni 'docker-compose' están disponibles"
        exit 1
    fi
fi

# Verificar si hay servicios corriendo
if ! $DOCKER_CMD ps --services &> /dev/null; then
    warning "No hay servicios ejecutándose"
    echo "Inicia los servicios con: ./start.sh"
    exit 1
fi

# Función para sincronizar archivos
sync_files() {
    log "🔄 Sincronizando archivos al contenedor..."
    
    # Ejecutar el script de copia dentro del contenedor
    $DOCKER_CMD exec web /bin/bash -c "
        echo '🔄 Actualizando archivos en el contenedor...'
        
        # Limpiar directorio actual
        rm -rf /usr/share/nginx/html/*
        rm -rf /usr/share/nginx/html/.* 2>/dev/null || true
        
        # Copiar archivos actualizados
        if command -v rsync &> /dev/null; then
            rsync -av \
                  --exclude='.git' \
                  --exclude='.gitignore' \
                  --exclude='.gitattributes' \
                  --exclude='.github' \
                  --exclude='node_modules' \
                  --exclude='*.log' \
                  --exclude='.env*' \
                  /tmp/source/ /usr/share/nginx/html/
        else
            cd /tmp/source
            find . -type f \
                 ! -path './.git/*' \
                 ! -name '.git*' \
                 ! -path './node_modules/*' \
                 ! -name '*.log' \
                 ! -name '.env*' \
                 -exec cp --parents {} /usr/share/nginx/html/ \; 2>/dev/null || true
        fi
        
        # Verificar archivos copiados
        FILE_COUNT=\$(find /usr/share/nginx/html -type f | wc -l)
        echo \"📊 Archivos sincronizados: \$FILE_COUNT\"
        
        # Recargar nginx
        nginx -s reload 2>/dev/null || echo 'ℹ️  nginx reload no necesario'
        
        echo '✅ Sincronización completada'
    "
    
    if [ $? -eq 0 ]; then
        success "Archivos sincronizados correctamente"
    else
        echo "❌ Error durante la sincronización"
        return 1
    fi
}

# Función para modo watch (desarrollo continuo)
watch_mode() {
    log "👀 Iniciando modo watch (desarrollo continuo)..."
    warning "Presiona Ctrl+C para salir del modo watch"
    
    if command -v inotifywait &> /dev/null; then
        log "Usando inotifywait para detectar cambios..."
        while true; do
            inotifywait -r -e modify,create,delete,move . \
                --exclude '\.git' \
                --exclude 'node_modules' \
                --exclude '\.log$' 2>/dev/null
            
            log "📝 Cambios detectados, sincronizando..."
            sync_files
            sleep 1
        done
    else
        warning "inotifywait no disponible, usando polling cada 5 segundos"
        while true; do
            sync_files
            sleep 5
        done
    fi
}

# Menú de opciones
echo ""
echo "Opciones disponibles:"
echo "1) Sincronizar una vez"
echo "2) Modo watch (desarrollo continuo)"
echo "3) Salir"
echo ""
read -p "Selecciona una opción (1-3): " -n 1 -r OPTION
echo

case $OPTION in
    1)
        sync_files
        ;;
    2)
        watch_mode
        ;;
    3)
        log "Saliendo..."
        exit 0
        ;;
    *)
        warning "Opción no válida"
        exit 1
        ;;
esac
