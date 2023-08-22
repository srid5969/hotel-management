FROM node:18 AS dep
RUN npm install 
RUN npm run build 
COPY ./dist /app/
COPY ./package*.json /app/
WORKDIR /app
RUN npm install --production

FROM node:18-slim
COPY --from=dep /app /app
WORKDIR /app
EXPOSE 3000
CMD ["server.js"]