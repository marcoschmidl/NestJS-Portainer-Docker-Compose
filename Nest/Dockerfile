#------------------------- DEVELOPMENT STAGE -------------------------#
FROM node:18-alpine3.14 AS development

ENV TZ=Europe/Germany
#ARG NODE_ENV=dev
#ENV NODE_ENV=${NODE_ENV}

WORKDIR /workplace-backend/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

#------------------------- PRODUCTION STAGE -------------------------#
FROM node:18-alpine3.14 AS production

#ARG NODE_ENV=prod
#ENV NODE_ENV=${NODE_ENV}

WORKDIR /workplace-backend/src/app

COPY package*.json ./

RUN npm install

COPY --from=development /workplace-backend/src/app/dist ./dist
COPY --chown=node:node . /workplace-backend/src/app

USER node

CMD [ "node","dist/main" ]