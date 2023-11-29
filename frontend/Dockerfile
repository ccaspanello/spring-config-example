FROM nginx

RUN rm /etc/nginx/conf.d/default.conf
COPY dist /usr/share/nginx/html
COPY default.conf.template /etc/nginx/templates/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]