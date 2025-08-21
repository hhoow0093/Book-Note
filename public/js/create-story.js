const createStoryModal = document.querySelector(".create-story-modal");
const addNewStory = document.querySelector(".add-new-story");


addNewStory.addEventListener("click", () => {
    createStoryModal.classList.toggle("hidden");
    createStoryModal.classList.toggle("block");    
});