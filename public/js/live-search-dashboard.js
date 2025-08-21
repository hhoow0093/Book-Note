const title = document.getElementById("title");
const rows = document.querySelectorAll(".story-list");

title.addEventListener("input", () => {
    const keyword = title.value.toLowerCase();
    rows.forEach((row) => {
        const title = row.querySelector("td:nth-child(1)").textContent.toLowerCase();
        if (title.includes(keyword)) {
            row.style.display = "table-row";
        } else {
            row.style.display = "none";
        }
    });
    if (title.value.length <= 0) {
        let currentPage = 1;
        ShowPage(currentPage);
        UpdatePagination();
    }
})