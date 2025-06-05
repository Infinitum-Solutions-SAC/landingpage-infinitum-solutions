# Docker Configuration - Infinitum Solutions Landing Page

Esta configuración de Docker incluye medidas de seguridad y limpieza automática de archivos sensibles.

## 🚀 Inicio Rápido

### Scripts disponibles
```bash
./start.sh    # Iniciar la aplicación con verificaciones completas
./stop.sh     # Detener con opciones de limpieza avanzadas
./status.sh   # Verificar estado de todos los servicios
./logs.sh     # Ver logs en tiempo real
./sync.sh     # Sincronizar cambios durante desarrollo
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

## 🛠️ Scripts Mejorados

### 📋 `status.sh` - Diagnóstico completo
- ✅ Estado de Docker y contenedores
- ✅ Verificación de conectividad HTTP
- ✅ Información de recursos y puertos
- ✅ Comandos sugeridos según el estado

### 🚀 `start.sh` - Inicio inteligente
- ✅ Verificaciones previas (Docker, puertos)
- ✅ Compatibilidad con docker-compose legacy y moderno
- ✅ Detección automática de problemas
- ✅ Opción para abrir navegador automáticamente

### 🛑 `stop.sh` - Parada avanzada
- ✅ Múltiples opciones de limpieza
- ✅ Limpieza específica del proyecto
- ✅ Verificación de recursos liberados
- ✅ Resumen completo del estado final

### 📊 `logs.sh` - Monitoreo en tiempo real
- ✅ Logs con formato y timestamps
- ✅ Estado de contenedores antes de mostrar logs
- ✅ Fácil acceso a información de debugging

## 🔒 Seguridad Avanzada

### 🛡️ Separación de Archivos Host/Contenedor

**Nueva característica:** Los archivos `.git` y sensibles se mantienen **solo en tu servidor**, mientras que el contenedor recibe una **copia limpia** sin información confidencial.

#### Cómo funciona:
1. **Host (tu servidor):** Mantiene todos los archivos incluyendo `.git`, `.env`, etc.
2. **Contenedor:** Solo recibe archivos necesarios para servir la web
3. **Resultado:** Máxima seguridad sin perder funcionalidad de desarrollo

#### Estructura de volúmenes:
```yaml
volumes:
  - ./:/tmp/source:ro      # Código fuente como solo lectura
  - web_clean_files:/usr/share/nginx/html  # Archivos limpios para nginx
```

### 🔄 Sincronización durante Desarrollo

Usa el script `sync.sh` para actualizar el contenedor durante el desarrollo:

```bash
./sync.sh    # Menú interactivo
```

**Opciones disponibles:**
- **Sincronización única:** Actualiza archivos una vez
- **Modo watch:** Detecta cambios automáticamente (requiere `inotify-tools`)
