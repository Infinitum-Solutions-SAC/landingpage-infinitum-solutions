#!/bin/bash

# Configuración de colores
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Función para logging
log() {
    echo -e "${BLUE}[$(date '+%H:%M:%S')]${NC} $1"
}

success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

echo "📋 Visor de Logs - Landing Page de Infinitum Solutions"

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
    warning "No se encontraron servicios ejecutándose"
    echo "Inicia los servicios con: ./start.sh"
    exit 1
fi

# Mostrar estado actual
echo ""
echo "📊 Estado actual de los contenedores:"
$DOCKER_CMD ps

echo ""
echo "🔄 Mostrando logs en tiempo real (Ctrl+C para salir)..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Mostrar logs en tiempo real
$DOCKER_CMD logs -f web
