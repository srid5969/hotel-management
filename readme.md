# ITC-API

Project description goes here...
---------------------------------------------------------------------------------------------------------------------------
## For development ( not in production server) 
Sequelize Documentation ( https://sequelize.org )
  Install Dependecies
 ### Run `npm i` to install nodemodules . ( Node version v20.11.0 is used and npm 10.2.4 is used )
 Step 1: For schema migration edit `src/server.js line 5` change ` authendicate() ` to `sync({force:true})` which means deleting all tables models defined in this project to be deleted and newly create tables which is defenately not for production servers because it deletes all tables and creates as new tables .
 Step 2 : Now change  `src/server.js line 5 `change `sync({force:true})` to `authendicate()` to authicate database
 Step 3 : Configure all environmental values which are credetials related to database username , passwort etc., in `.env` file
 For Development Use command ` npm run dev ` this command is used to listed to the file changes and it will restart application every time the changes are saved . Strictly not to use in production server . 
 To create a build Use command ` npm run build ` this command is used to convert ts files to js file for deployment
 To run build file Use command ` npm start `
---------------------------------------------------------------------------------------------------------------------------
## Requirements

For development, you will only need Node.js(v18/v20) and a node global package installed in your environnement.

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v20.11.0

    $ npm --version
    10.2.4

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

## Configure app

Open `a/nice/path/to/a.file` then edit it with your settings. You will need:

- A setting;
- Another setting;
- One more setting;

## Running the project

    $ npm start

## Simple build for production

    $ npm run build
