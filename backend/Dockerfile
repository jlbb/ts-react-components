#define the latest nodejs image  to build from
FROM node:11.0.0 as server-builder

#create a working directory
WORKDIR /usr/src/app/graphqlServer

#copy package.json file under the working directory 
COPY package.json /usr/src/app/graphqlServer/
COPY npm-shrinkwrap.json npm-shrinkwrap.json

# install all the dependencies 
RUN npm set progress=false && npm i --silent

#copy all your files under the working directory
COPY . .

# Make port 7000 available to the world outside this container
EXPOSE 7000

#start nodejs server 
CMD ["npm", "run", "server"]