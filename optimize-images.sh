#!/bin/bash

# Script para optimizar imágenes y mejorar LCP
# Genera versiones WebP de las imágenes para mejor rendimiento

echo "🚀 Optimizando imágenes para mejorar LCP..."

# Función para convertir a WebP
convert_to_webp() {
    local input_file="$1"
    local output_file="${input_file%.*}.webp"
    
    if command -v cwebp >/dev/null 2>&1; then
        echo "Convirtiendo: $input_file -> $output_file"
        cwebp -q 85 "$input_file" -o "$output_file"
    else
        echo "⚠️ cwebp no está instalado. Instala webp tools:"
        echo "Ubuntu/Debian: sudo apt install webp"
        echo "macOS: brew install webp"
        echo "Windows: choco install webp"
    fi
}

# Crear directorio para imágenes optimizadas
mkdir -p public/assets/images/optimized

# Convertir imágenes PNG/JPG a WebP
find public/assets/images -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | while read -r file; do
    convert_to_webp "$file"
done

echo "✅ Optimización de imágenes completada"

# Generar manifests para recursos críticos
echo "📝 Generando manifest de recursos críticos..."

cat > public/critical-resources.json << EOF
{
  "images": [
    "/assets/images/og-image.webp",
    "/favicon.ico"
  ],
  "css": [
    "/assets/critical.css"
  ],
  "js": [
    "/src/main.tsx"
  ]
}
EOF

echo "✅ Manifest de recursos críticos generado"

# Verificar tamaños de archivos
echo "📊 Tamaños de archivos optimizados:"
find public/assets/images -name "*.webp" -exec ls -lh {} \; | awk '{print $5 "\t" $9}'

echo "🎉 Optimización completada. Beneficios esperados:"
echo "   • Imágenes WebP: ~25-35% más pequeñas"
echo "   • LCP mejorado: ~1-2s más rápido"
echo "   • Core Web Vitals optimizados"
