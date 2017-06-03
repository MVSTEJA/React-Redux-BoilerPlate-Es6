1. Install Node v5.12.0.

2. Install Python v2.7.

3. Go to Application path in CLI. Install Application Node Packages. - 'npm install'

4. Run the developer application. command -> 'npm run dev'. (This will run the automated build process, start up a webserver, and open the application in your default browser. When doing development with configuration, this command will continue watching files all your files. Every time you hit save the code is rebuilt, linting runs, and tests run automatically. Note: The -s flag is optional. It enables silent mode which suppresses unnecessary messages during the build).

5. Run the production application. -> 'npm run build'. (This will package the application to be minified and output it, css packaging has been configured to be done separately.).

6. To run the test for the application -> 'npm run test', To run the tests continously and reload when we change files -> 'npm run test:watch'.
