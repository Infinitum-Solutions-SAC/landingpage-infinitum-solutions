#!/bin/bash

echo "🛑 Deteniendo Landing Page de Infinitum Solutions..."

# Cambiar al directorio public donde está el docker-compose
cd "$(dirname "$0")"

# Detener y eliminar contenedores
docker-compose down

echo "✅ Servicios detenidos correctamente!"

# Opcional: limpiar imágenes no utilizadas
read -p "¿Deseas limpiar las imágenes Docker no utilizadas? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🧹 Limpiando imágenes no utilizadas..."
    docker image prune -f
    echo "✅ Limpieza completada!"
fi
