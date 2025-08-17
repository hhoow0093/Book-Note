const title = document.getElementById("topics");
const cardTitle = document.querySelectorAll(".card-title");

title.addEventListener("input", () => {
  const keyword = title.value.toLowerCase();
  cardTitle.forEach((card) => {
    const topic = card.textContent.toLowerCase();
    if (topic.includes(keyword)) {
      card.parentElement.style.display = "block";
    } else {
      card.parentElement.style.display = "none";
    }
  });
  if (title.value.length <= 0) {
    let currentPage = 1;
    ShowPage(currentPage);
    UpdatePagination();
  }
});
