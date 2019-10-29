### STAGE 1: Build node alpine image ###
FROM node:11.0.0-alpine as alpine-builder

# Install needed alpine libs
RUN apk add --no-cache gcc \
    autoconf \
    automake \
    make \
    g++ \
    libgcc \
    libtool \
    nasm ;

### STAGE 2: Build base app image ###
FROM alpine-builder as builder

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Let Docker know about the port that serve runs on.
EXPOSE 8900

# Copy npm package files
COPY package.json package.json
COPY npm-shrinkwrap.json npm-shrinkwrap.json


# Install npm dependencies
RUN npm set progress=false && npm i --silent

# Copy app files to out container
COPY . .

# Test app
RUN npm run test

### STAGE 3: Build environment based image ###
FROM builder as production-builder
RUN npm run build && ls | grep -v "dist" | xargs rm -rf;

### STAGE 4: Setup for build image ###
FROM nginx:1.15.1-alpine

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

# Copy build files from first image to nginx dir
RUN rm -rf /usr/share/nginx/html/*
COPY --from=production-builder /usr/src/app/dist/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]