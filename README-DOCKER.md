# Docker Configuration - Infinitum Solutions Landing Page

Esta configuración de Docker incluye medidas de seguridad y limpieza automática de archivos sensibles.

## 🚀 Inicio Rápido

### Iniciar la aplicación
```bash
./start.sh
```

### Detener la aplicación
```bash
./stop.sh
```

### Comandos manuales
```bash
# Construir y levantar
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Detener
docker-compose down
```

## 🔒 Características de Seguridad

### Limpieza Automática
Cuando el contenedor se inicia, automáticamente:
- ✅ Elimina el directorio `.git` y archivos relacionados
- ✅ Oculta la versión del servidor nginx
- ✅ Configura headers de seguridad
- ✅ Bloquea acceso a archivos sensibles

### Headers de Seguridad Incluidos
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: no-referrer-when-downgrade`
- `Content-Security-Policy: default-src 'self'...`

### Información del Servidor Oculta
- Server tokens deshabilitados
- Headers `Server` y `X-Powered-By` removidos
- Versión de nginx no visible

## 📁 Archivos Incluidos

- `Dockerfile`: Imagen personalizada con herramientas de seguridad
- `init-script.sh`: Script de inicialización que limpia archivos sensibles
- `compose.yaml`: Configuración de Docker Compose
- `.dockerignore`: Archivos excluidos del contexto de Docker
- `start.sh`: Script para iniciar fácilmente
- `stop.sh`: Script para detener y limpiar

## 🌐 Acceso

La aplicación estará disponible en: **http://localhost:81**

## 🛠️ Personalización

Para modificar la configuración de nginx, edita el archivo `init-script.sh` en la sección donde se crea `/etc/nginx/conf.d/default.conf`.

## 📋 Logs y Debugging

```bash
# Ver logs en tiempo real
docker-compose logs -f web

# Ver logs específicos
docker-compose logs web

# Ejecutar comando dentro del contenedor
docker-compose exec web /bin/bash
```
