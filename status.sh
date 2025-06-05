#!/bin/bash

# Configuración de colores
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

success() {
    echo -e "${GREEN}✅${NC} $1"
}

error() {
    echo -e "${RED}❌${NC} $1"
}

warning() {
    echo -e "${YELLOW}⚠️${NC} $1"
}

info() {
    echo -e "${BLUE}ℹ️${NC} $1"
}

header() {
    echo -e "${PURPLE}$1${NC}"
}

echo "📊 Estado de Landing Page - Infinitum Solutions"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Cambiar al directorio donde está el docker-compose
SCRIPT_DIR="$(dirname "$0")"
cd "$SCRIPT_DIR" || {
    error "No se pudo cambiar al directorio $SCRIPT_DIR"
    exit 1
}

# Determinar comando de Docker Compose
DOCKER_CMD="docker compose"
if ! docker compose version &> /dev/null; then
    if command -v docker-compose &> /dev/null; then
        DOCKER_CMD="docker-compose"
    else
        error "Ni 'docker compose' ni 'docker-compose' están disponibles"
        exit 1
    fi
fi

echo ""
header "🐳 Docker Status:"

# Verificar Docker
if command -v docker &> /dev/null; then
    success "Docker instalado"
    if docker info &> /dev/null; then
        success "Docker ejecutándose"
    else
        error "Docker no está ejecutándose"
    fi
else
    error "Docker no instalado"
fi

echo ""
header "📦 Contenedores:"

# Estado de contenedores
if $DOCKER_CMD ps --services &> /dev/null 2>&1; then
    $DOCKER_CMD ps
    
    # Verificar específicamente el contenedor web
    WEB_STATUS=$($DOCKER_CMD ps --filter "name=web" --format "{{.Status}}" 2>/dev/null)
    if [[ $WEB_STATUS == *"Up"* ]]; then
        success "Contenedor web: $WEB_STATUS"
    else
        if [ -n "$WEB_STATUS" ]; then
            warning "Contenedor web: $WEB_STATUS"
        else
            error "Contenedor web no encontrado"
        fi
    fi
else
    warning "No hay servicios de Docker Compose ejecutándose"
fi

echo ""
header "🌐 Conectividad:"

# Verificar puerto 81
if command -v netstat &> /dev/null; then
    if netstat -tuln | grep -q ":81 "; then
        success "Puerto 81 en uso"
    else
        warning "Puerto 81 no está en uso"
    fi
elif command -v ss &> /dev/null; then
    if ss -tuln | grep -q ":81 "; then
        success "Puerto 81 en uso"
    else
        warning "Puerto 81 no está en uso"
    fi
fi

# Test de conectividad HTTP
if command -v curl &> /dev/null; then
    if curl -s -f http://localhost:81 > /dev/null 2>&1; then
        success "Aplicación responde en http://localhost:81"
    else
        error "Aplicación no responde en http://localhost:81"
    fi
else
    info "curl no disponible, no se puede verificar conectividad HTTP"
fi

echo ""
header "💾 Recursos:"

# Uso de recursos
if command -v docker &> /dev/null && docker info &> /dev/null; then
    CONTAINERS_RUNNING=$(docker ps -q | wc -l)
    IMAGES_COUNT=$(docker images -q | wc -l)
    
    info "Contenedores ejecutándose: $CONTAINERS_RUNNING"
    info "Imágenes Docker: $IMAGES_COUNT"
    
    # Información específica del proyecto
    PROJECT_IMAGES=$(docker images --filter=reference="*landing*" --format "table {{.Repository}}:{{.Tag}}\t{{.Size}}" | tail -n +2)
    if [ -n "$PROJECT_IMAGES" ]; then
        echo ""
        header "🏗️ Imágenes del proyecto:"
        echo "$PROJECT_IMAGES"
    fi
fi

echo ""
header "🛠️ Comandos útiles:"
echo "  ./start.sh    - Iniciar servicios"
echo "  ./stop.sh     - Detener servicios"
echo "  ./logs.sh     - Ver logs en tiempo real"
echo "  ./status.sh   - Ver este estado"

echo ""
if $DOCKER_CMD ps --services &> /dev/null 2>&1; then
    success "🎯 Landing Page está operativa"
    info "🌐 Accede en: http://localhost:81"
else
    warning "🚀 Landing Page no está ejecutándose"
    info "💡 Usa './start.sh' para iniciarla"
fi
