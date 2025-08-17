// card from html
const list_card = document.querySelectorAll(".list-card");

// pagination from html
const prev_pagination = document.querySelector(".previous");
const next_pagination = document.querySelector(".next");
const first_item_pagination = document.getElementById("first-item");
const second_item_pagination = document.getElementById("second-item");
const third_item_pagination = document.getElementById("third-item");

// pagination logic
const cardPerPage = 6;
const totalPages = Math.ceil((list_card.length) / cardPerPage);
let currentPage = 1;


window.ShowPage = (page) => {
    if (page < 1) {
        currentPage = 1;
    }
    else if (page > totalPages) {
        currentPage = totalPages;
    } else {
        currentPage = page;
    }
    const start = (page - 1) * cardPerPage;
    const end = start + cardPerPage - 1
    list_card.forEach((card, index) => {
        if (index >= start && index <= end) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    })
}

window.UpdatePagination = () => {
    const prevPage = currentPage - 1;
    const nextPage = currentPage + 1;

    first_item_pagination.innerHTML = prevPage >= 1 ? prevPage : "";
    second_item_pagination.innerHTML = currentPage;
    third_item_pagination.innerHTML = nextPage <= totalPages ? nextPage : "";
}

next_pagination.addEventListener("click", () => {
    currentPage++;
    if (currentPage > totalPages || currentPage < 1) {
        currentPage--;
        return;
    }
    ShowPage(currentPage);
    UpdatePagination();
});

prev_pagination.addEventListener("click", () => {
    currentPage--;
    if (currentPage > totalPages || currentPage < 1) {
        currentPage++;
        return;
    }
    ShowPage(currentPage);
    UpdatePagination();
})

document.addEventListener("DOMContentLoaded", () => {
    ShowPage(currentPage);
    UpdatePagination();
});


