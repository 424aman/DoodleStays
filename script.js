const pages = document.querySelectorAll("[data-page]");
const pageLinks = document.querySelectorAll("[data-page-link]");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");
const faqQuestions = document.querySelectorAll(".faq-question");
const currentYear = document.getElementById("currentYear");

function showPage(pageName) {
  const validPage = document.querySelector(`[data-page="${pageName}"]`)
    ? pageName
    : "home";

  pages.forEach((page) => {
    page.classList.toggle("active", page.dataset.page === validPage);
  });

  pageLinks.forEach((link) => {
    link.classList.toggle("active", link.dataset.pageLink === validPage);
  });

  document.title =
    validPage === "home"
      ? "Beach House Guest Guide"
      : `${validPage.charAt(0).toUpperCase() + validPage.slice(1)} | Beach House`;

  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const pageName = link.dataset.pageLink;
    window.location.hash = pageName;
    showPage(pageName);
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("menu-open", isOpen);
});

faqQuestions.forEach((button) => {
  button.addEventListener("click", () => {
    const isExpanded = button.getAttribute("aria-expanded") === "true";
    const answer = button.nextElementSibling;

    faqQuestions.forEach((otherButton) => {
      otherButton.setAttribute("aria-expanded", "false");
      otherButton.nextElementSibling.style.maxHeight = null;
    });

    if (!isExpanded) {
      button.setAttribute("aria-expanded", "true");
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
});

window.addEventListener("hashchange", () => {
  showPage(window.location.hash.replace("#", "") || "home");
});

currentYear.textContent = new Date().getFullYear();
showPage(window.location.hash.replace("#", "") || "home");
