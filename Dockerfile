FROM nginx:1.27-alpine

COPY docker/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx . /usr/share/nginx/html

RUN rm -rf \
    /usr/share/nginx/html/.git \
    /usr/share/nginx/html/.idea \
    /usr/share/nginx/html/.gitlab-ci.yml \
    /usr/share/nginx/html/Dockerfile \
    /usr/share/nginx/html/docker-compose.yml \
    /usr/share/nginx/html/docker \
    /usr/share/nginx/html/__MACOSX \
    && find /usr/share/nginx/html -name '.DS_Store' -delete

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://127.0.0.1/ || exit 1
