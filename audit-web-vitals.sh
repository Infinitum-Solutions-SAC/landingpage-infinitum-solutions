#!/bin/bash

# Script completo para optimización y medición de Web Vitals
echo "🚀 Ejecutando auditoría completa de Web Vitals..."

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para logging con colores
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar dependencias
check_dependencies() {
    log_info "Verificando dependencias..."
    
    if ! command -v npm &> /dev/null; then
        log_error "npm no está instalado"
        exit 1
    fi
    
    if ! command -v lighthouse &> /dev/null; then
        log_warning "Lighthouse CLI no está instalado"
        log_info "Instalando Lighthouse..."
        npm install -g lighthouse
    fi
    
    log_success "Dependencias verificadas"
}

# Función para build optimizado
build_project() {
    log_info "Construyendo proyecto con optimizaciones..."
    
    # Limpiar dist anterior
    rm -rf dist/
    
    # Build optimizado
    npm run build
    
    if [ $? -eq 0 ]; then
        log_success "Build completado exitosamente"
    else
        log_error "Error en el build"
        exit 1
    fi
}

# Función para analizar bundle
analyze_bundle() {
    log_info "Analizando tamaño del bundle..."
    
    if [ -d "dist" ]; then
        # Mostrar tamaños de archivos principales
        echo "📊 Tamaños de archivos principales:"
        find dist -name "*.js" -o -name "*.css" | sort | while read file; do
            size=$(du -h "$file" | cut -f1)
            filename=$(basename "$file")
            echo "   $size - $filename"
        done
        
        # Verificar archivos grandes (>500KB)
        large_files=$(find dist -size +500k -name "*.js" -o -size +500k -name "*.css")
        if [ -n "$large_files" ]; then
            log_warning "Archivos grandes detectados (>500KB):"
            echo "$large_files"
        else
            log_success "No hay archivos excesivamente grandes"
        fi
        
        # Total size
        total_size=$(du -sh dist/ | cut -f1)
        log_info "Tamaño total del build: $total_size"
    else
        log_error "Directorio dist/ no encontrado"
        return 1
    fi
}

# Función para ejecutar Lighthouse
run_lighthouse() {
    log_info "Ejecutando auditoría Lighthouse..."
    
    # Iniciar servidor de preview
    npm run preview &
    SERVER_PID=$!
    
    # Esperar a que el servidor esté listo
    sleep 5
    
    # URL del servidor local
    URL="http://localhost:4173"
    
    # Verificar que el servidor esté respondiendo
    if ! curl -s "$URL" > /dev/null; then
        log_error "El servidor no está respondiendo en $URL"
        kill $SERVER_PID 2>/dev/null
        return 1
    fi
    
    # Crear directorio para reportes
    mkdir -p reports
    
    # Ejecutar Lighthouse para desktop
    log_info "Ejecutando auditoría para Desktop..."
    lighthouse "$URL" \
        --preset=desktop \
        --output=html,json \
        --output-path=reports/lighthouse-desktop \
        --chrome-flags="--headless --no-sandbox" \
        --quiet
    
    # Ejecutar Lighthouse para móvil
    log_info "Ejecutando auditoría para Móvil..."
    lighthouse "$URL" \
        --output=html,json \
        --output-path=reports/lighthouse-mobile \
        --chrome-flags="--headless --no-sandbox" \
        --quiet
    
    # Detener servidor
    kill $SERVER_PID 2>/dev/null
    
    if [ -f "reports/lighthouse-desktop.json" ] && [ -f "reports/lighthouse-mobile.json" ]; then
        log_success "Auditorías Lighthouse completadas"
        return 0
    else
        log_error "Error en las auditorías Lighthouse"
        return 1
    fi
}

# Función para extraer métricas de Lighthouse
extract_metrics() {
    log_info "Extrayendo métricas Web Vitals..."
    
    if [ -f "reports/lighthouse-mobile.json" ]; then
        # Extraer métricas usando jq si está disponible
        if command -v jq &> /dev/null; then
            echo "📱 Métricas Móvil:"
            echo "   LCP: $(jq -r '.audits["largest-contentful-paint"].displayValue // "N/A"' reports/lighthouse-mobile.json)"
            echo "   CLS: $(jq -r '.audits["cumulative-layout-shift"].displayValue // "N/A"' reports/lighthouse-mobile.json)"
            echo "   FID: $(jq -r '.audits["max-potential-fid"].displayValue // "N/A"' reports/lighthouse-mobile.json)"
            echo "   Performance Score: $(jq -r '.categories.performance.score * 100 // "N/A"' reports/lighthouse-mobile.json)"
            
            if [ -f "reports/lighthouse-desktop.json" ]; then
                echo ""
                echo "🖥️  Métricas Desktop:"
                echo "   LCP: $(jq -r '.audits["largest-contentful-paint"].displayValue // "N/A"' reports/lighthouse-desktop.json)"
                echo "   CLS: $(jq -r '.audits["cumulative-layout-shift"].displayValue // "N/A"' reports/lighthouse-desktop.json)"
                echo "   FID: $(jq -r '.audits["max-potential-fid"].displayValue // "N/A"' reports/lighthouse-desktop.json)"
                echo "   Performance Score: $(jq -r '.categories.performance.score * 100 // "N/A"' reports/lighthouse-desktop.json)"
            fi
        else
            log_warning "jq no está instalado. Instala con: sudo apt install jq"
            log_info "Reportes HTML disponibles en reports/"
        fi
    else
        log_error "No se encontraron reportes de Lighthouse"
    fi
}

# Función para generar reporte consolidado
generate_report() {
    log_info "Generando reporte consolidado..."
    
    cat > reports/web-vitals-summary.md << EOF
# Reporte de Web Vitals - $(date)

## Resumen Ejecutivo
Este reporte contiene las métricas de Web Vitals y recomendaciones de optimización.

## Archivos Generados
- \`lighthouse-mobile.html\` - Reporte Lighthouse para móvil
- \`lighthouse-desktop.html\` - Reporte Lighthouse para desktop
- \`lighthouse-mobile.json\` - Datos JSON móvil
- \`lighthouse-desktop.json\` - Datos JSON desktop

## Métricas Objetivo
- **LCP (Largest Contentful Paint)**: < 2.5s (Bueno), < 4.0s (Aceptable)
- **CLS (Cumulative Layout Shift)**: < 0.1 (Bueno), < 0.25 (Aceptable)
- **FID (First Input Delay)**: < 100ms (Bueno), < 300ms (Aceptable)

## Optimizaciones Implementadas
✅ Imagen LCP preload  
✅ Componente LCPOptimizedImage  
✅ Optimizaciones CSS para CLS  
✅ Bundle splitting optimizado  
✅ Compresión Terser en producción  
✅ Critical CSS inline  
✅ Resource hints configurados  

## Próximos Pasos
1. Revisar reportes HTML detallados
2. Implementar mejoras sugeridas por Lighthouse
3. Monitorear métricas en producción
4. Configurar alertas para regresiones

## Comandos Útiles
\`\`\`bash
# Ver reportes
open reports/lighthouse-mobile.html
open reports/lighthouse-desktop.html

# Re-ejecutar auditoría
./audit-web-vitals.sh

# Deploy con optimizaciones
npm run build && npm run preview
\`\`\`
EOF
    
    log_success "Reporte consolidado generado: reports/web-vitals-summary.md"
}

# Función principal
main() {
    echo "🎯 Auditoría de Web Vitals - Infinitum Solutions"
    echo "=============================================="
    
    check_dependencies
    build_project
    analyze_bundle
    
    if run_lighthouse; then
        extract_metrics
        generate_report
        
        echo ""
        log_success "🎉 Auditoría completada exitosamente!"
        echo ""
        log_info "📊 Reportes disponibles en:"
        echo "   - reports/lighthouse-mobile.html"
        echo "   - reports/lighthouse-desktop.html"
        echo "   - reports/web-vitals-summary.md"
        echo ""
        log_info "🚀 Para abrir los reportes:"
        echo "   xdg-open reports/lighthouse-mobile.html"
    else
        log_error "La auditoría falló. Revisa los logs anteriores."
        exit 1
    fi
}

# Ejecutar script principal
main "$@"
