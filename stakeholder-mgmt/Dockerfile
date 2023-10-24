FROM node:12.18.4 AS dep
# ENV PHANTOMJS_VERSION 2.1.1

COPY ./dist /app/
COPY ./package*.json /app/
WORKDIR /app
RUN npm install --production

FROM node:12.18.4-slim
COPY --from=dep /app /app
WORKDIR /app
# Install phantomjs
RUN sed -i s/deb.debian.org/archive.debian.org/g /etc/apt/sources.list
RUN sed -i 's|security.debian.org|archive.debian.org|g' /etc/apt/sources.list
RUN sed -i '/stretch-updates/d' /etc/apt/sources.list
RUN apt-get update \
      && apt-get install -y --no-install-recommends \
          ca-certificates \
          bzip2 \
          fontconfig \
          libfontconfig \
      && apt-get clean \
      && rm -rf /var/lib/apt/lists/*
RUN npm install --production
RUN npm install -g phantomjs-prebuilt --unsafe-perm

EXPOSE 3000
CMD ["server.js"]