const input = document.getElementById("markdown-input");
const preview = document.getElementById("markdown-preview");

const updatePreview = () => {
    const markDownText = input.value;
    const rawHTML = marked.parse(markDownText);
    const cleanHTML = DOMPurify.sanitize(rawHTML);
    preview.innerHTML = cleanHTML;
}

document.addEventListener("DOMContentLoaded", () => {
    input.addEventListener("input", updatePreview);
    updatePreview();
});