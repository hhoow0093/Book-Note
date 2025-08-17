import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { getThemes, getSelectedThemes, editThemes, deleteThemes, createTheme } from "./db/queries.js";
import { isString } from "./functions/function.js";


const PORT = process.env.PORT || 3000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));


// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (Tailwind CSS)
app.use(express.static(path.join(__dirname, "public")));

// form handling
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.get("/", async (req, res) => {
  const themes = await getThemes();
  if (isString(themes)) {
    res.send(`${themes}`);
    return;
  }
  res.render("index", { title: "BookNote", list_theme: themes  });
});

app.post("/edit", async (req, res) => {
  const { id } = req.body;
  const theme = await getSelectedThemes(id);
  const themes = await getThemes();
  if (isString(theme)) {
    res.send(`${theme}`);
    return
  }
  res.render("index", { title: "BookNote", theme: theme[0], list_theme: themes });
});

app.post("/save-edit/:id", async (req, res) => {
  const id = req.params.id;
  const { modalTitle, modalDesc } = req.body;
  const update = await editThemes(id, modalTitle, modalDesc);
  const themes = await getThemes();
  if (isString(update)) {
    res.send(`${update}`);
    return;
  }
  res.render("index", {title: "BookNote", list_theme: themes})
});

app.post("/delete", async (req, res) => {
  const { id } = req.body; 
  const themes = await getThemes();
  if (isString(themes)) {
    res.send(`${themes}`);
    return
  }
  res.render("index", { title: "BookNote", mydelete:id, list_theme: themes});
});

app.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const themeTodelete = await deleteThemes(id);
  if (isString(themeTodelete)) {
    res.send(themeTodelete);
  }
  res.redirect("/");
});

app.post("/create-themes", async (req, res) => {
  const { modalTitle, modalDesc } = req.body;
  if (modalTitle.length <= 0 || modalDesc.length <= 0) {
    const themes = await getThemes();
    const message = "cannot be empty!";
    res.render("index", { title: "BookNote", list_theme: themes, emptyform: message});
  }
  const createNewTheme = await createTheme(modalTitle, modalDesc);
  if (isString(createNewTheme)) {
    res.send(createNewTheme);
  }
  const themes = await getThemes();
  res.render("index", {
    title: "BookNote", list_theme: themes
  })
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
