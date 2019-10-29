#TypeScript 101Learning
To start your development server and run the page in the browser:

-   Open your terminal
-   Run `npm run dev`: This command will run our development server under the port specified in the webpack.config (by default 8900), and it will open the default browser serving the page under the path localhost:8900.
    -   If after stopping the server using CMD + C (Ctrl + C on Windows) this keeps running and, `npm run dev` doesn't work because it says the port is already in use, you can try the following commands to firstly stop the server before try again (based on https://stackoverflow.com/a/45130296/1186541 comment):

For Linux/Mac OS search (sudo) run this in the terminal:

`$ lsof -i tcp:8900`  
`$ kill -9 PID`

On Windows:

`netstat -ano | findstr :8900`  
`tskill PID`

Remember to replace your the PID for the actual value returned in the terminal.

** DOCKER **

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

** OTHER COMMANDS **

-   Create shrinkwrap.json file:

`npm shrinkwrap`
