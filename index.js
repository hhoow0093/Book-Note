import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import { getThemes, getSelectedThemes, editThemes, deleteThemes, createTheme, getStories, getTitle } from "./db/queries.js";
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
  return res.render("index", { title: "BookNote", list_theme: themes  });
});

app.post("/edit", async (req, res) => {
  const { id } = req.body;
  const theme = await getSelectedThemes(id);
  const themes = await getThemes();
  if (isString(theme)) {
    res.send(`${theme}`);
    return
  }
  return res.render("index", { title: "BookNote", theme: theme[0], list_theme: themes });
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
  return res.render("index", {title: "BookNote", list_theme: themes})
});

app.post("/delete", async (req, res) => {
  const { id } = req.body; 
  const themes = await getThemes();
  if (isString(themes)) {
    res.send(`${themes}`);
    return
  }
  return res.render("index", { title: "BookNote", mydelete:id, list_theme: themes});
});

app.post("/delete/:id", async (req, res) => {
  const id = req.params.id;
  const themeTodelete = await deleteThemes(id);
  if (isString(themeTodelete)) {
    return res.send(themeTodelete);
  }
  return res.redirect("/");
});

app.post("/create-themes", async (req, res) => {
  const { modalTitle, modalDesc } = req.body;
  if (modalTitle.length <= 0 || modalDesc.length <= 0) {
    const themes = await getThemes();
    const message = "cannot be empty!";
    return res.render("index", { title: "BookNote", list_theme: themes, emptyform: message});
  }
  const createNewTheme = await createTheme(modalTitle, modalDesc);
  if (isString(createNewTheme)) {
    return res.send(createNewTheme);
  }
  const themes = await getThemes();
  return res.render("index", {
    title: "BookNote", list_theme: themes
  })
});

app.get("/checkDashBoard", async (req, res) => {
  const theme_id = req.query.id;
  const stories_list = await getStories(theme_id);
  const theme = await getTitle(theme_id);
  const title = theme.title;
  return res.render("check_dashboard", {
    id: theme_id,
    title: "DashBoard",
    story_list: stories_list,
    theme_title : title
  });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
