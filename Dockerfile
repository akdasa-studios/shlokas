FROM joseluisq/static-web-server:2.15.0
ENV SERVER_FALLBACK_PAGE=/public/index.html
COPY ./dist /public