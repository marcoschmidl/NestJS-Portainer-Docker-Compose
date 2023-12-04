###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:18-alpine AS development
 
#ENV NODE_ENV=development
WORKDIR /workplace-backend/src/app 
COPY --chown=node:node package*.json ./
RUN npm ci
COPY --chown=node:node . .
USER node


###################
# BUILD FOR PRODUCTION
###################
 
FROM node:18-alpine AS build

WORKDIR /workplace-backend/src/app

COPY --chown=node:node package*.json ./
COPY --chown=node:node --from=development /workplace-backend/src/app/node_modules ./node_modules 
COPY --chown=node:node . .

RUN npm run build 

RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:18-alpine AS production

ENV NODE_ENV production

WORKDIR /workplace-backend/src/app
 
COPY --from=build /workplace-backend/src/app/node_modules ./node_modules 
COPY --from=build /workplace-backend/src/app/dist ./dist
 
USER node

#CMD ["npm", "run", "start:prod"]
CMD [ "node", "dist/main.js"] 
#Schneller aber ich verliere die flexibilität bei Docker Compose - wobei ich nehme es ja durch Docker Kompose auch vorweg, wenn ich eine Stage früher verwende? 

#Das Kommando kann eigentlich in das Docker - Compose File ausgelagert werden & auskommentiert
#Das ist nur für Docker Compose und nicht für K8s relevant
