const modalTitle = document.getElementById("modal-title");
const charCount2 = document.querySelector(".char-count"); 

const maxLenTitle = 20;
let currentLen2 = modalTitle.value.length;
charCount2.textContent = currentLen2 + "/20";

modalTitle.addEventListener("input", () => {
    currentLen2 = modalTitle.value.length;
    if (currentLen2 > maxLenTitle) {
        modalTitle.value = modalTitle.value.substring(0, maxLenTitle);
        charCount2.textContent = maxLenTitle + "/20";
        return;
    }
    charCount2.textContent = currentLen2 + "/20";
});