### STAGE 1: Build ###
FROM node:11.0.0 as builder

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Let Docker know about the port that serve runs on.
EXPOSE 3005

# Copy npm package files
COPY package.json package.json
COPY npm-shrinkwrap.json npm-shrinkwrap.json

# Install npm dependencies
RUN npm set progress=false && npm i --silent

# Copy app files to out container
COPY . .

# Test app
RUN npm run test

# Build app
RUN npm run build

# Clean-up all files except the build artifact just created
RUN ls | grep -v "dist" | xargs rm -rf

### STAGE 2: Setup ###
FROM nginx:1.15.1

COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

# Copy build files from first image to nginx dir
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/app/dist/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]