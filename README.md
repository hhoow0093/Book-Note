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
├── public/               # Static files served by Express
│   └── css/
│       └── style.css     # Will contain compiled Tailwind CSS
├── src/
│   └── input.css         # Your Tailwind source file
│
├── views/                # Your EJS or other templates
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── index.js             # Your Express app
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
  plugins: [],
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
  "dev": "concurrently \"npx tailwindcss -i ./src/input.css -o ./public/css/style.css --watch\" \"nodemon server.js\""
}
```

to run the project, type `npm run dev`. make sure `"type" : "module"` in `package.json` 



