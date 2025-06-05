# Dockerfile personalizado para nginx con herramientas de seguridad
FROM nginx:alpine

# Instalar herramientas necesarias y nginx-mod-http-headers-more
RUN apk add --no-cache \
    bash \
    nginx-mod-http-headers-more \
    && rm -rf /var/cache/apk/*

# Cargar el módulo headers-more
RUN echo "load_module modules/ngx_http_headers_more_filter_module.so;" > /etc/nginx/modules/headers-more.conf

# Crear directorio para configuraciones personalizadas
RUN mkdir -p /etc/nginx/conf.d

# Copiar script de inicialización
COPY init-script.sh /init-script.sh
RUN chmod +x /init-script.sh

# Modificar la configuración principal de nginx para incluir el módulo
RUN sed -i '1i\include /etc/nginx/modules/headers-more.conf;' /etc/nginx/nginx.conf

# Exponer puerto 80
EXPOSE 80

# Comando por defecto
CMD ["/init-script.sh"]
