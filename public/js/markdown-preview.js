const input = document.getElementById("markdown-input");
const preview = document.getElementById("markdown-preview");

const saveButton = document.querySelector(".save-button");
const md = document.getElementById("markdown");
const id = md.value;

const updatePreview = () => {
    const markDownText = input.value;
    const rawHTML = marked.parse(markDownText);
    const cleanHTML = DOMPurify.sanitize(rawHTML);
    preview.innerHTML = cleanHTML;
}

const saveMarkdown = async () => {
    const textValue = input.value;
    try {
        const res = await axios.post("/save-markdown", { textValue, id });
        alert(res.data.message);
    } catch (error) {
        console.error(error);
        alert("save error");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    input.addEventListener("input", updatePreview);
    saveButton.addEventListener("click", saveMarkdown);
    updatePreview();
    
    document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        saveMarkdown();
   } 
});
});
