const charCount = document.querySelector(".char-count");
const modalDesc = document.getElementById("modal-desc");

const modalTitle = document.getElementById("modal-title");
const charCount2 = document.querySelector(".char-count-2"); 

const maxLen = 186;
const maxLenTitle = 20;

let currentLen = modalDesc.value.length;
charCount.textContent = currentLen + "/186";

let currentLen2 = modalTitle.value.length;
charCount2.textContent = currentLen2 + "/20";

modalDesc.addEventListener("input", () => {
    currentLen = modalDesc.value.length;
    if (currentLen > maxLen) {
        modalDesc.value = modalDesc.value.substring(0, maxLen);
        charCount.textContent = maxLen + "/186";
        return;
    }
    charCount.textContent = currentLen + "/186";
});

modalTitle.addEventListener("input", () => {
    currentLen2 = modalTitle.value.length;
    if (currentLen2 > maxLenTitle) {
        modalTitle.value = modalTitle.value.substring(0, maxLenTitle);
        charCount2.textContent = maxLenTitle + "/20";
        return;
    }
    charCount2.textContent = currentLen2 + "/20";

});