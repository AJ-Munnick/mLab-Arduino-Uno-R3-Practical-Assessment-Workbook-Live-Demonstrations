const menuButton = document.querySelector(".menu-toggle");
const siteNavigation = document.querySelector(".site-nav");

if (menuButton && siteNavigation) {
  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    siteNavigation.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    siteNavigation.classList.toggle("is-open", !isExpanded);
  });

  siteNavigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });

  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  for (const link of siteNavigation.querySelectorAll("a")) {
    if (link.getAttribute("href") === currentPage) {
      link.setAttribute("aria-current", "page");
    }
  }
}
