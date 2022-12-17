FROM node:14-slim

# Installing libvips-dev for sharp compatability
RUN apt-get update && apt-get -y install libvips-dev

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

WORKDIR /opt/app
COPY ./package.json ./
COPY ./yarn.lock ./

# Set a high timeout for yarn to give it extra time in case of poor network conditions
RUN yarn config set network-timeout 600000 -g

# Install additional packages required for Strapi
RUN yarn add sharp
RUN yarn add pg knex

COPY ./ .

EXPOSE 1337

RUN chmod +x /opt/app/docker-scripts/docker-entrypoint.sh
ENTRYPOINT [ "/opt/app/docker-scripts/docker-entrypoint.sh" ]