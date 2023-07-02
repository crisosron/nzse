FROM node:18-alpine

# Add bash
RUN apk update
RUN apk upgrade
RUN apk add bash

WORKDIR /usr/src/app/client
COPY package.json ./
COPY yarn.lock ./

# Set a high timeout for yarn to give it extra time in case of poor network conditions
RUN yarn config set network-timeout 600000 -g

# Temporarily disable platform checks and add SWC
# (need to do this manually to get this Dockerfile to work on Apple Silicon...)
RUN yarn config set ignore-platform true
RUN yarn add --dev @next/swc-linux-x64-gnu
RUN yarn config set ignore-platform false

RUN yarn install --frozen-lockfile

COPY ./ .

EXPOSE 3000

RUN chmod +x ./docker-scripts/wait-for.sh

CMD ["yarn", "dev"]