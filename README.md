# Book-Note - Capstone project
This is a captstone project for storing notes as a reminder in general. if the user wants to see notes from they can use this platform for seeing all the things they wrote or keep in mind 

## Setting up the projects from scratch
this is an example of setting up the project locally from scratch
### adding tailwind, ejs, and express to project

- `npm init -y` - initialize the project
- `npm install -D tailwindcss@3 postcss autoprefixer` - install tailwind
- `npx tailwindcss init -p` - initialize tailwind config
- `npm i express ejs` to add  dependencies
> make sure project structure folder like this
```
your-project/
│
├── node_modules/           # all downloaded packages
|
├── db/
|   └── queries.js          # for storing database query function
|
|
├── functions/
|   └── function.js         # for storing function in index.js
| 
|  
├── public/                 # Static files served by Express
│   ├─ css/
│   |    └── style.css      # Will contain compiled Tailwind CSS
│   ├── js/
│   |    └── *.js           # for storing web functionalities from frontend
│   └── asset /             # store any images/svg
│                  
├── src/
│   └── input.css           # Your Tailwind source file
│
├── views/                  # Your EJS or other templates
├── .env                    # credentials
├── .env.example            # credentials example
├── .gitignore              # making sure not include node modules when updating project
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── index.js                # Your Express app
```
in `src/input.css` add:
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
configuring `tailwind.config.js`
```
module.exports = {
  content: [
    './views/**/*.ejs',   // Or .html, .pug, etc.
    './public/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")], 
  // enable tailwind for readme preview make sure  to install
  // *npm install @tailwindcss/typography* first, 
  // then add prose class to readme preview container
};

```

to enable tailwind css snippet in vscode , type `ctrl + shift + p`  → search “Preferences: Open Settings (JSON)”, then add:

```
"tailwindCSS.emmetCompletions": true,
"editor.quickSuggestions": {
  "strings": true
},
"emmet.includeLanguages": {
  "html": "html",
  "ejs": "html",
  "javascript": "javascriptreact"
}
```

since nodemon only includes the server js for rendering, install concurrently by typing `npm i -D concurrently` so that tailwind css and nodemon changes everytime refreshing the project page. update `package.json`

```
"scripts": {
  "dev": "concurrently \"npx tailwindcss -i ./src/input.css -o ./public/css/style.css --watch\" \"nodemon index.js\""
}
```

to run the project, type `npm run dev`. make sure `"type" : "module"` in `package.json` 

## Running the app from locally
> pre-requisite : install `npm`, `nodejs`, `nodemon`, and `pgadmin` on your system first

```bash
# cloning the repository
git clone https://github.com/hhoow0093/Book-Note.git

# installing all dependencies
npm i
```
After installing all the necessary package, fill up `.env.example` database credential from **PGadmin** then rename it to .env

> create database from pgadmin with the name as booknote. import the sql file `bookNoteTar.sql` by using the restire option from pg admin and tar data type.
[![Screenshot-2025-08-23-150635.png](https://i.postimg.cc/3JzQpdTQ/Screenshot-2025-08-23-150635.png)](https://postimg.cc/w75rYxMw)
```
DB_USERNAME= YourDbUsername
DB_PASSWORD= YourDbPassword
DB_PORT= 5432
DB_NAME= booknote 
DB_HOST= localhost
PORT= 3000
```
Finally, enter `npm run dev` in terminal to run application.


