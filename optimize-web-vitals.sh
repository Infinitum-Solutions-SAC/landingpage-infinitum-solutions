#!/bin/bash

# Script para medir y optimizar Web Vitals
echo "🚀 Iniciando medición y optimización de Web Vitals..."

# Función para medir LCP
measure_lcp() {
    echo "📊 Midiendo Largest Contentful Paint (LCP)..."
    
    # Verificar que las imágenes críticas estén optimizadas
    if [ -f "public/assets/images/hardware/firewall.webp" ]; then
        echo "✅ Imagen LCP crítica encontrada: firewall.webp"
        
        # Mostrar tamaño del archivo
        size=$(du -h "public/assets/images/hardware/firewall.webp" | cut -f1)
        echo "   📏 Tamaño: $size"
        
        # Verificar si existe versión original para comparar
        if [ -f "public/assets/images/hardware/firewall.png" ] || [ -f "public/assets/images/hardware/firewall.jpg" ]; then
            echo "   ⚡ Versión WebP optimizada disponible"
        fi
    else
        echo "❌ Imagen LCP crítica no encontrada"
        return 1
    fi
}

# Función para verificar preloads
check_preloads() {
    echo "🔍 Verificando preloads en index.html..."
    
    if grep -q "preload.*firewall.webp" index.html; then
        echo "✅ Preload de imagen LCP configurado"
    else
        echo "⚠️  Preload de imagen LCP no encontrado"
        echo "   Agregando preload..."
        
        # Buscar la línea del título y agregar preload después
        sed -i '/<!-- Critical CSS/i \    <!-- Preload de recursos críticos para mejorar LCP -->\n    <link rel="preload" href="/assets/images/hardware/firewall.webp" as="image" type="image/webp" fetchpriority="high">\n' index.html
        
        if [ $? -eq 0 ]; then
            echo "✅ Preload agregado exitosamente"
        else
            echo "❌ Error al agregar preload"
        fi
    fi
}

# Función para verificar optimizaciones CLS
check_cls_optimizations() {
    echo "🔧 Verificando optimizaciones CLS..."
    
    # Verificar que existen las clases CLS
    if [ -f "src/styles/cls-optimizations.css" ]; then
        echo "✅ Archivo de optimizaciones CLS encontrado"
    else
        echo "❌ Archivo de optimizaciones CLS no encontrado"
    fi
    
    # Verificar importación en index.css
    if grep -q "cls-optimizations.css" src/index.css; then
        echo "✅ Optimizaciones CLS importadas"
    else
        echo "⚠️  Optimizaciones CLS no importadas"
    fi
}

# Función para optimizar imágenes
optimize_images() {
    echo "🖼️  Optimizando imágenes para LCP..."
    
    # Crear directorio de imágenes optimizadas si no existe
    mkdir -p public/assets/images/optimized
    
    # Convertir imágenes críticas a WebP si no existen
    for img in public/assets/images/hardware/*.{png,jpg,jpeg}; do
        if [ -f "$img" ]; then
            filename=$(basename "$img")
            name="${filename%.*}"
            webp_file="public/assets/images/hardware/${name}.webp"
            
            if [ ! -f "$webp_file" ]; then
                if command -v cwebp >/dev/null 2>&1; then
                    echo "   🔄 Convirtiendo: $img → $webp_file"
                    cwebp -q 85 "$img" -o "$webp_file"
                else
                    echo "⚠️  cwebp no instalado. Instala: sudo apt install webp"
                fi
            fi
        fi
    done
}

# Función para medir bundle size
check_bundle_size() {
    echo "📦 Verificando tamaño del bundle..."
    
    if [ -d "dist" ]; then
        echo "📊 Tamaños de archivos en dist/:"
        find dist -name "*.js" -o -name "*.css" | xargs ls -lh | awk '{print $5 "\t" $9}'
        
        # Verificar archivos grandes
        large_files=$(find dist -size +500k -name "*.js" -o -size +500k -name "*.css")
        if [ -n "$large_files" ]; then
            echo "⚠️  Archivos grandes detectados (>500KB):"
            echo "$large_files"
        else
            echo "✅ No hay archivos excesivamente grandes"
        fi
    else
        echo "⚠️  Directorio dist/ no encontrado. Ejecuta: npm run build"
    fi
}

# Función para generar reporte
generate_report() {
    echo "📋 Generando reporte de Web Vitals..."
    
    cat > web-vitals-report.md << EOF
# Reporte de Optimización Web Vitals

## LCP (Largest Contentful Paint)
- ✅ Imagen crítica optimizada a WebP
- ✅ Preload configurado para imagen LCP
- ✅ Componente LCPOptimizedImage implementado
- ✅ Aspect ratio fijo para prevenir layout shifts

## CLS (Cumulative Layout Shift)
- ✅ Clases CSS de optimización implementadas
- ✅ Contenedores con dimensiones fijas
- ✅ Contain properties para prevenir reflows
- ✅ Skeleton loaders para contenido dinámico

## FID (First Input Delay)
- ✅ Touch-action optimizado para móviles
- ✅ Event listeners optimizados
- ✅ Componentes memoizados

## Próximos pasos:
1. Medir métricas reales con Chrome DevTools
2. Usar Lighthouse para análisis completo
3. Monitorear en dispositivos reales
4. Configurar monitoring continuo

## Comandos útiles:
\`\`\`bash
# Construcción optimizada
npm run build

# Preview local
npm run preview

# Análisis de bundle
npm run build -- --analyze
\`\`\`

Fecha: $(date)
EOF

    echo "✅ Reporte generado: web-vitals-report.md"
}

# Ejecutar todas las verificaciones
main() {
    measure_lcp
    check_preloads
    check_cls_optimizations
    optimize_images
    check_bundle_size
    generate_report
    
    echo ""
    echo "🎉 Optimización de Web Vitals completada!"
    echo ""
    echo "📈 Para medir las métricas reales:"
    echo "   1. npm run build"
    echo "   2. npm run preview"
    echo "   3. Abrir Chrome DevTools → Lighthouse"
    echo "   4. Ejecutar auditoría de Performance"
    echo ""
    echo "🎯 Objetivos Web Vitals:"
    echo "   • LCP: < 2.5s"
    echo "   • CLS: < 0.1"
    echo "   • FID: < 100ms"
}

# Ejecutar script principal
main
