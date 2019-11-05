# React - TypeScript ToDo list app

The project will create a simple ToDo list web application where we will mainly focus in the definition of the architecture, and the automatization using a CI/CD approach. For this, we have used the following technologies stack:

**Client**

    - Using techonologies React with hooks along with Typescript

    - For state management is used Apollo GraphQL client for React

    - Component and hooks are tested using React Testing Library

**Server**

    - Apollo GraphQL server

    - Mongoose for MongoDB and Node.js to connect with MongoDB Atlas

**CI/CD**

    - Jenkins

    - Containarization using Docker

    - In Progress: Container orchestration using Kubernetes

### How to run this app (development):

First of all, if we don't have a MongoDB Atlas URI to connect, we could install and run a local MongoDB database (https://docs.mongodb.com/manual/administration/install-community/)

An example of environment variable for a MongoDB URI:

> MONGO_DB_URI=mongodb+srv://<dbuser>:<dbpassword>@<mongodb-atlas-cluster-name>.mongodb.net

Locally it can be:

> MONGO_DB_URI=mongodb://127.0.0.1:27017

But for running the MongoDB locally (if not yet installed) we will need to follow these steps as follow.

To install it and run on MacOS:

1. `brew tap mongodb/brew`
2. `brew install mongodb-community@4.2`
3. `mongod --config /usr/local/etc/mongod.conf` add `--fork` flag to run in the background.

Also, if you don't have Docker already installed in your local machine, you can download it from: https://hub.docker.com/?overlay=onboarding 

**Using Docker**

1. `time docker-compose build --no-cache`
2. `time docker-compose up -d`

To have Hot Reload working smoothier: `npm run docker:dev`

**Using local scripts**

1. Running backend: `cd backend; npm run server`
2. Running frontend: `npm run dev`

By default, the client app will run at `localhost:8900` and the server at `localhost:7000` either using Docker or scripts.

This project has been deployed in a DigitalOcean droplet using a CI/CD using Jenkins and containarizing the client and server using Docker. You can visit an example of the deployed app in: https://pinolabs.gq/

### How to run this app (production):

To run a production build version locally, we can run the following commands:

**Using Docker**

`docker-compose -f docker-compose.yml -f docker-compose.production.yml up --build -d`

Using Docker, by default in production mode the client app will run at `localhost:3005`

**Using local scripts**

`npm run build:serve`

Using scripts, the client app will run at `localhost:3000`

### DOCKER commands

-   Build docker image:

    `time docker build -t react-docker .`

-   Build docker images from compose (fresh build)

    `time docker-compose build --no-cache`

    <!-- To run producion build pass compose files -->

    `time docker-compose -f docker-compose.yml -f docker-compose.production.yml build --no-cache`

-   Run container:

    `docker run --rm -d -p 3005:80 --name react-app-docker react-docker`

-   Run compose up containers -detached- (development):

    `docker-compose up -d`

    <!-- In case of build images and then up compose -->

    `docker-compose up -d --build`

    <!-- In case of build images, recreate containers and then up compose -->

    `docker-compose up -d --build --force-recreate`

-   Run compose up containers -detached- (production):

    `docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d`

-   Remove compose images:

    `docker rmi $(docker-compose images -q) --force`

-   Remove stopped compose containers:

    `docker-compose rm -f`

-   Stop and remove compose containers and its volumes:

    `docker-compose down -v`

-   Remove all images

    `docker rmi $(docker images -q) --force`

-   Remove all (stopped) containers

    `docker rm $(docker ps -q)`

-   Remove dangling images

    `docker rmi $(docker images --filter \"dangling=true\" -q --no-trunc) --force`

For more docker commands visit the docs: https://docs.docker.com/engine/reference/commandline/docker/

### OTHER COMMANDS

-   Create shrinkwrap.json file:

    `npm shrinkwrap`
