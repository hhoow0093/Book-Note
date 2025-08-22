module.exports = {
  content: [
    './views/**/*.ejs',   // Or .html, .pug, etc.
    './public/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};
