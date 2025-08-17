const createThemeModal = document.querySelector(".create-theme-modal");
const createThemeButton = document.querySelector(".my-add-theme-button");

createThemeButton.addEventListener("click", () => {
    createThemeModal.classList.toggle("hidden");
    createThemeModal.classList.toggle("block");
})