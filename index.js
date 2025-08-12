import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { getThemes } from "./db/queries.js";
import { isString } from "./functions/function.js";


const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));


// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (Tailwind CSS)
app.use(express.static(path.join(__dirname, "public")));


app.get("/", async (req, res) => {
  const themes = await getThemes();
  if (isString(themes)) {
    res.send(`${themes}`);
  }
  res.render("index", { title: "BookNote", list_theme: themes  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
