#!/bin/bash

# Script de inicialización para limpiar archivos .git y ocultar información del servidor

echo "🧹 Iniciando limpieza de archivos sensibles..."

# Eliminar directorio .git si existe
if [ -d "/usr/share/nginx/html/.git" ]; then
    echo "🗑️  Eliminando directorio .git..."
    rm -rf /usr/share/nginx/html/.git
    echo "✅ Directorio .git eliminado"
else
    echo "ℹ️  No se encontró directorio .git"
fi

# Eliminar archivos relacionados con git
echo "🗑️  Eliminando archivos relacionados con git..."
rm -f /usr/share/nginx/html/.gitignore
rm -f /usr/share/nginx/html/.gitattributes
rm -f /usr/share/nginx/html/.github

# Crear configuración personalizada de nginx para ocultar información del servidor
echo "🔒 Configurando nginx para ocultar información del servidor..."

# Crear directorio de configuración si no existe
mkdir -p /etc/nginx/conf.d

# Crear archivo de configuración personalizada
cat > /etc/nginx/conf.d/security.conf << 'EOF'
# Ocultar versión de nginx
server_tokens off;

# Headers de seguridad adicionales
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

# Remover headers que revelan información del servidor
more_clear_headers 'Server';
more_clear_headers 'X-Powered-By';
EOF

# Crear configuración principal del sitio
cat > /etc/nginx/conf.d/default.conf << 'EOF'
server {
    listen 80;
    server_name localhost;
    
    # Ocultar versión de nginx en páginas de error
    server_tokens off;
    
    # Directorio raíz
    root /usr/share/nginx/html;
    index index.html index.htm;
    
    # Configuración para aplicaciones SPA (Single Page Application)
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cachear archivos estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|webp)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
    
    # Desactivar logs para archivos comunes que no existen
    location = /favicon.ico {
        log_not_found off;
        access_log off;
    }
    
    location = /robots.txt {
        log_not_found off;
        access_log off;
    }
    
    # Denegar acceso a archivos sensibles
    location ~ /\. {
        deny all;
        access_log off;
        log_not_found off;
    }
    
    # Denegar acceso a archivos de configuración
    location ~* \.(env|git|gitignore|gitattributes)$ {
        deny all;
        access_log off;
        log_not_found off;
    }
}
EOF

echo "✅ Configuración de nginx completada"

# Verificar la configuración de nginx
echo "🔍 Verificando configuración de nginx..."
nginx -t

if [ $? -eq 0 ]; then
    echo "✅ Configuración de nginx válida"
    echo "🚀 Iniciando nginx..."
    
    # Iniciar nginx en primer plano
    exec nginx -g 'daemon off;'
else
    echo "❌ Error en la configuración de nginx"
    exit 1
fi
