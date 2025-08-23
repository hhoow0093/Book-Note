import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import path from "path";
import {
  getThemes,
  getSelectedThemes,
  editThemes,
  deleteThemes,
  createTheme,
  getStories,
  getTitle,
  createStory,
  getStory,
  updateStory,
  deleteStory,
  getMarkDownText,
  saveMdFile
} from "./db/queries.js";
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
app.use(express.json());

app.get("/", async (req, res) => {
  const themes = await getThemes();
  if (isString(themes)) {
    res.send(`${themes}`);
    return;
  }
  return res.render("index", { title: "BookNote", list_theme: themes });
});

app.post("/edit", async (req, res) => {
  const { id } = req.body;
  const theme = await getSelectedThemes(id);
  const themes = await getThemes();
  if (isString(theme)) {
    res.send(`${theme}`);
    return;
  }
  return res.render("index", {
    title: "BookNote",
    theme: theme[0],
    list_theme: themes,
  });
});

app.post("/save-edit/:id", async (req, res) => {
  const id = req.params.id;
  const { modalTitle, modalDesc } = req.body;
  if (!modalTitle || !modalDesc) {
    const themes = await getThemes();
    const message = "cannot be empty!";
    return res.render("index", {
      title: "BookNote",
      list_theme: themes,
      emptyform: message,
    
    });
  }
  const update = await editThemes(id, modalTitle, modalDesc);
  const themes = await getThemes();


  if (isString(update)) {
    res.send(`${update}`);
    return;
  }
  return res.render("index", { title: "BookNote", list_theme: themes });
});

app.post("/delete", async (req, res) => {
  const { id } = req.body;
  const themes = await getThemes();
  if (isString(themes)) {
    res.send(`${themes}`);
    return;
  }
  return res.render("index", {
    title: "BookNote",
    mydelete: id,
    list_theme: themes,
  });
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
    return res.render("index", {
      title: "BookNote",
      list_theme: themes,
      emptyform: message,
    });
  }
  const createNewTheme = await createTheme(modalTitle, modalDesc);
  if (isString(createNewTheme)) {
    return res.send(createNewTheme);
  }
  const themes = await getThemes();
  return res.render("index", {
    title: "BookNote",
    list_theme: themes,
  });
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
    theme_title: title,
  });
});

app.post("/create-story", async (req, res) => {
  const { modalTime, modalTitle, theme_id } = req.body;
  const dateTime = modalTime.replace("T", " ");

  const stories_list = await getStories(theme_id);
  const theme = await getTitle(theme_id);
  const title = theme.title;

  // empty form
  if (!modalTime || !modalTitle || !theme_id) {
    const message = "form cannot be empty!";
    return res.render("check_dashboard", {
      id: theme_id,
      title: "DashBoard",
      story_list: stories_list,
      theme_title: title,
      emptyform: message,
    });
  }
  // query error
  const createNewStory = await createStory(modalTitle, dateTime, theme_id);
  if (isString(createNewStory)) {
    return res.send(createNewStory);
  }
  // query success
  const sucessStoryList = await getStories(theme_id);
  return res.render("check_dashboard", {
    id: theme_id,
    title: "DashBoard",
    story_list: sucessStoryList,
    theme_title: title,
  });
});

app.post("/edit-story", async (req, res) => {
  const { id } = req.body;
  const story = await getStory(id);
  const theme_id = story.theme_id;
  const storyList = await getStories(theme_id);
  const theme = await getTitle(theme_id);
  const title = theme.title;

  return res.render("check_dashboard", {
    original_id: id,
    id: theme_id,
    title: "DashBoard",
    story_list: storyList,
    theme_title: title,
    story: story,
  });
});

app.post("/edit-story/:id", async (req, res) => {
  const id = req.params.id;
  const { modalTitle, modalTime } = req.body;

  const story = await getStory(id);
  const theme_id = story.theme_id;
  const stories_list = await getStories(theme_id);
  const theme = await getTitle(theme_id);
  const title = theme.title;

  if (!modalTime || !modalTitle ) {
    const message = "form cannot be empty!";
    return res.render("check_dashboard", {
      id: theme_id,
      title: "DashBoard",
      story_list: stories_list,
      theme_title: title,
      emptyform: message,
    });
  }
  
  const dateTime = modalTime.replace("T", " ");
  const update = await updateStory(id, modalTitle, dateTime);

  

  if (isString(update)) {
    return res.send(update);
  }

  return res.render("check_dashboard", {
    id: theme_id,
    title: "DashBoard",
    story_list: stories_list,
    theme_title: title,
  })

});

app.post("/delete-story", async (req, res) => {
  const { id } = req.body;

  const story = await getStory(id);
  const theme_id = story.theme_id;
  const stories_list = await getStories(theme_id);
  const theme = await getTitle(theme_id);
  const title = theme.title;

  return res.render("check_dashboard", {
    id: theme_id,
    title: "DashBoard",
    story_list: stories_list,
    theme_title: title,
    mydelete: id
  })
});

app.post("/delete-story/:id", async (req, res) => {
  const id = req.params.id;
  const story = await getStory(id);
  const theme_id = story.theme_id;

  const mydelete = await deleteStory(id);
  if (isString(mydelete)) {
    return res.send(mydelete);
  }
  
  return res.redirect(`/checkDashBoard?id=${theme_id}`);
});

app.get("/check-content", async (req, res) => {
  const id = req.query.id;
  const story = await getStory(id);
  const theme_id = story.theme_id;

  const content = await getMarkDownText(id);

  let markdownContent = "";
  if (content.description) {
    markdownContent = content.description;
  }
  
  return res.render("markdown", {
    title: content.title,
    markdown: markdownContent,
    theme_id: theme_id, 
    id: id
  })

});

app.post("/save-markdown", async (req, res) => {
  const { textValue, id } = req.body;

  const saveFile = await saveMdFile(textValue, id);

  res.json({
    message: saveFile
  })

});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
