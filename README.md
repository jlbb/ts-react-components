#TypeScript 101Learning
To start your development server and run the page in the browser:
* Open your terminal
 * Run `npm run dev`: This command will run our development server under the port specified in the webpack.config (by default 8900), and it will open the default browser serving the page under the path localhost:8900.
    
    * If after stopping the server using CMD + C (Ctrl + C on Windows) this keeps running and, `npm run dev` doesn't work because it says the port is already in use, you can try the following commands to firstly stop the server  before try again (based on https://stackoverflow.com/a/45130296/1186541 comment):

For Linux/Mac OS search (sudo) run this in the terminal:

`$ lsof -i tcp:8900`  
`$ kill -9 PID`

On Windows:

`netstat -ano | findstr :8900`  
`tskill PID`

Remember to replace your the PID for the actual value returned in the terminal.
