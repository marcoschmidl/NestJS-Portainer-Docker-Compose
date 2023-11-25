FROM node:18-alpine3.14  AS development

#ARG NODE_ENV=dev
#ENV NODE_ENV=${NODE_ENV}

WORKDIR /workplace-frontend/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.21.6-alpine as production

#ARG NODE_ENV=prod
#ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=development /workplace-frontend/frontend/src/app/dist/frontend .

RUN touch /var/run/nginx.pid \
  && chown -R nginx:nginx /var/run/nginx.pid \
  && chown -R nginx:nginx /var/cache/nginx \

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

USER nginx

ENTRYPOINT ["nginx", "-g", "daemon off;"]
