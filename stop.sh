#!/bin/bash

# Configuración de colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
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

echo "🛑 Deteniendo Landing Page de Infinitum Solutions..."

# Cambiar al directorio donde está el docker-compose
SCRIPT_DIR="$(dirname "$0")"
cd "$SCRIPT_DIR" || {
    error "No se pudo cambiar al directorio $SCRIPT_DIR"
    exit 1
}

# Verificar si docker-compose existe
if ! command -v docker-compose &> /dev/null && ! command -v docker &> /dev/null; then
    error "Docker no está instalado o no está en el PATH"
    exit 1
fi

# Usar docker compose (nuevo) o docker-compose (legacy)
DOCKER_CMD="docker compose"
if ! docker compose version &> /dev/null; then
    if command -v docker-compose &> /dev/null; then
        DOCKER_CMD="docker-compose"
    else
        error "Ni 'docker compose' ni 'docker-compose' están disponibles"
        exit 1
    fi
fi

log "Usando comando: $DOCKER_CMD"

# Verificar si hay servicios corriendo
if $DOCKER_CMD ps --services &> /dev/null; then
    log "Deteniendo servicios de Docker Compose..."
    
    # Mostrar contenedores que se van a detener
    echo "📋 Contenedores activos:"
    $DOCKER_CMD ps
    
    # Detener y eliminar contenedores, redes y volúmenes
    if $DOCKER_CMD down --volumes; then
        success "Servicios detenidos correctamente!"
    else
        error "Hubo un problema al detener los servicios"
        exit 1
    fi
else
    warning "No se encontraron servicios de Docker Compose ejecutándose"
fi

# Función para mostrar opciones de limpieza
show_cleanup_options() {
    echo ""
    echo "🧹 Opciones de limpieza disponibles:"
    echo "1) Limpiar imágenes no utilizadas (dangling)"
    echo "2) Limpiar todo (imágenes, contenedores, redes, volúmenes no utilizados)"
    echo "3) Limpiar solo este proyecto"
    echo "4) No limpiar nada"
    echo ""
}

# Opcional: limpiar recursos Docker
show_cleanup_options
read -p "Selecciona una opción (1-4): " -n 1 -r CLEANUP_OPTION
echo

case $CLEANUP_OPTION in
    1)
        log "Limpiando imágenes no utilizadas..."
        if docker image prune -f; then
            success "Imágenes no utilizadas eliminadas!"
        else
            error "Error al limpiar imágenes"
        fi
        ;;
    2)
        warning "Esta opción eliminará TODOS los recursos Docker no utilizados"
        read -p "¿Estás seguro? (y/N): " -n 1 -r CONFIRM
        echo
        if [[ $CONFIRM =~ ^[Yy]$ ]]; then
            log "Realizando limpieza completa del sistema Docker..."
            docker system prune -af --volumes
            success "Limpieza completa realizada!"
        else
            log "Limpieza completa cancelada"
        fi
        ;;
    3)
        log "Limpiando recursos específicos del proyecto..."
        # Eliminar imágenes del proyecto
        PROJECT_IMAGES=$(docker images --filter=reference="*landing*" -q)
        if [ ! -z "$PROJECT_IMAGES" ]; then
            echo "Eliminando imágenes del proyecto..."
            docker rmi $PROJECT_IMAGES 2>/dev/null || true
        fi
        
        # Limpiar volúmenes del proyecto
        PROJECT_VOLUMES=$(docker volume ls --filter=name="landing" -q)
        if [ ! -z "$PROJECT_VOLUMES" ]; then
            echo "Eliminando volúmenes del proyecto..."
            docker volume rm $PROJECT_VOLUMES 2>/dev/null || true
        fi
        
        success "Recursos del proyecto limpiados!"
        ;;
    4)
        log "No se realizará limpieza"
        ;;
    *)
        warning "Opción no válida, no se realizará limpieza"
        ;;
esac

# Mostrar resumen final
echo ""
echo "📊 Resumen final:"
echo "- Servicios detenidos: ✅"
echo "- Puerto 81 liberado: ✅"

# Verificar que no hay contenedores relacionados corriendo
RUNNING_CONTAINERS=$(docker ps --filter="name=landing" --format="table {{.Names}}" | tail -n +2)
if [ -z "$RUNNING_CONTAINERS" ]; then
    success "No hay contenedores relacionados ejecutándose"
else
    warning "Aún hay contenedores relacionados ejecutándose:"
    echo "$RUNNING_CONTAINERS"
fi

echo ""
success "🎯 Landing Page detenida completamente!"
echo ""
echo "💡 Comandos útiles:"
echo "   - Para ver logs: $DOCKER_CMD logs [servicio]"
echo "   - Para iniciar de nuevo: ./start.sh"
echo "   - Para ver estado: docker ps"
