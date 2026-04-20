const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const chips = Array.from(document.querySelectorAll(".chip"));
const cards = Array.from(document.querySelectorAll(".video-card"));
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

function applyFilters() {
  const activeChip = document.querySelector(".chip.active");
  const filter = activeChip ? activeChip.dataset.filter : "all";
  const query = searchInput.value.trim().toLowerCase();

  cards.forEach((card) => {
    const title = card.dataset.title.toLowerCase();
    const category = card.dataset.category;
    const chipMatch = filter === "all" || filter === category;
    const searchMatch = query.length === 0 || title.includes(query);

    card.classList.toggle("hidden", !(chipMatch && searchMatch));
  });
}

chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((button) => button.classList.remove("active"));
    chip.classList.add("active");
    applyFilters();
  });
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  applyFilters();
});

menuBtn.addEventListener("click", () => {
  if (window.innerWidth <= 900) {
    sidebar.classList.toggle("open");
  } else {
    sidebar.classList.toggle("collapsed");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    sidebar.classList.remove("open");
  }
});

cards.forEach((card) => {
  card.addEventListener("click", () => {
    card.style.outline = "2px solid #ff2f4b";
    setTimeout(() => {
      card.style.outline = "none";
    }, 220);
  });
});

applyFilters();
