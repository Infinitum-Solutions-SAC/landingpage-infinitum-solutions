#!/bin/bash

# Configuración de colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Función para logging con timestamp
log() {
    echo -e "${BLUE}[$(date '+%H:%M:%S')]${NC} $1"
}

# Función para mostrar errores
error() {
    echo -e "${RED}[ERROR]${NC} $1" >&2
}

# Función para mostrar advertencias
warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Función para mostrar éxito
success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

# Función para mostrar información
info() {
    echo -e "${PURPLE}[INFO]${NC} $1"
}

echo "🚀 Iniciando Landing Page de Infinitum Solutions..."

echo ""
echo "🛡️  CONFIGURACIÓN DE SEGURIDAD:"
echo "   ✅ Los archivos .git se mantienen en tu servidor"
echo "   ✅ Solo se copian archivos limpios al contenedor"
echo "   ✅ Sin exposición de información sensible"
echo ""

# Cambiar al directorio donde está el docker-compose
SCRIPT_DIR="$(dirname "$0")"
cd "$SCRIPT_DIR" || {
    error "No se pudo cambiar al directorio $SCRIPT_DIR"
    exit 1
}

# Verificar si Docker está instalado
if ! command -v docker &> /dev/null; then
    error "Docker no está instalado o no está en el PATH"
    echo "Instala Docker desde: https://docs.docker.com/get-docker/"
    exit 1
fi

# Verificar si Docker está ejecutándose
if ! docker info &> /dev/null; then
    error "El servicio Docker no está ejecutándose"
    echo "Inicia Docker con: sudo systemctl start docker"
    exit 1
fi

# Determinar comando de Docker Compose
DOCKER_CMD="docker compose"
if ! docker compose version &> /dev/null; then
    if command -v docker-compose &> /dev/null; then
        DOCKER_CMD="docker-compose"
        log "Usando docker-compose legacy"
    else
        error "Ni 'docker compose' ni 'docker-compose' están disponibles"
        exit 1
    fi
else
    log "Usando docker compose moderno"
fi

# Verificar si el puerto 81 está libre
if command -v netstat &> /dev/null; then
    if netstat -tuln | grep -q ":81 "; then
        warning "El puerto 81 parece estar en uso"
        read -p "¿Continuar de todas formas? (y/N): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            log "Operación cancelada"
            exit 0
        fi
    fi
fi

# Detener contenedores existentes si están corriendo
if $DOCKER_CMD ps --services &> /dev/null; then
    warning "Hay servicios corriendo, deteniéndolos..."
    $DOCKER_CMD down
fi

# Construir imagen
log "🔨 Construyendo imagen Docker..."
if $DOCKER_CMD build --no-cache; then
    success "Imagen construida correctamente"
else
    error "Falló la construcción de la imagen"
    exit 1
fi

# Levantar servicios
log "🚀 Levantando servicios..."
if $DOCKER_CMD up -d; then
    success "Servicios iniciados correctamente!"
else
    error "Falló el inicio de los servicios"
    echo "Verificando logs de error..."
    $DOCKER_CMD logs web
    exit 1
fi

# Esperar un momento para que los servicios se estabilicen
log "⏳ Esperando que los servicios se estabilicen..."
sleep 3

# Verificar estado de los contenedores
echo ""
echo "📊 Estado de los contenedores:"
$DOCKER_CMD ps

# Verificar si el servicio web está saludable
WEB_STATUS=$($DOCKER_CMD ps --filter "name=web" --format "{{.Status}}")
if [[ $WEB_STATUS == *"Up"* ]]; then
    success "Contenedor web está ejecutándose correctamente"
    
    # Verificar si responde en el puerto
    sleep 2
    if command -v curl &> /dev/null; then
        if curl -s -f http://localhost:81 > /dev/null; then
            success "La aplicación responde correctamente en el puerto 81"
        else
            warning "La aplicación no responde en el puerto 81 aún"
            info "Puede tomar unos segundos más en estar lista"
        fi
    fi
else
    error "El contenedor web no está ejecutándose correctamente"
    echo "Logs del contenedor:"
    $DOCKER_CMD logs web --tail 20
fi

echo ""
success "🎯 Landing Page iniciada!"
echo ""
info "🌐 La aplicación está disponible en: http://localhost:81"
echo ""
echo "💡 Comandos útiles:"
echo "   - Ver logs en tiempo real: $DOCKER_CMD logs -f web"
echo "   - Ver estado: $DOCKER_CMD ps"
echo "   - Detener servicios: ./stop.sh"
echo "   - Reiniciar: $DOCKER_CMD restart web"

# Opcional: abrir automáticamente en el navegador
if command -v xdg-open &> /dev/null; then
    read -p "¿Abrir en el navegador? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        xdg-open http://localhost:81 &
    fi
fi
