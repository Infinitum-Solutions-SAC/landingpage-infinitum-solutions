#!/bin/bash

echo "🚀 Iniciando Landing Page de Infinitum Solutions..."

# Cambiar al directorio public donde está el docker-compose
cd "$(dirname "$0")"

# Construir y levantar el contenedor
echo "🔨 Construyendo imagen Docker..."
docker-compose build --no-cache

echo "🚀 Levantando servicios..."
docker-compose up -d

echo "✅ Servicios iniciados correctamente!"
echo "🌐 La aplicación está disponible en: http://localhost:81"
echo "📋 Para ver los logs: docker-compose logs -f"
echo "🛑 Para detener: docker-compose down"

# Mostrar el estado de los contenedores
echo ""
echo "📊 Estado de los contenedores:"
docker-compose ps
