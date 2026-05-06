(function () {
  "use strict";

  const navbar = document.querySelector(".navbar");
  const navCollapse = document.querySelector(".navbar-collapse");
  const navLinks = document.querySelectorAll(".navbar .nav-link, .navbar .btn");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const researchItems = document.querySelectorAll(".research-item");
  const contactForm = document.querySelector("#contactForm");
  const formStatus = document.querySelector("#formStatus");
  const imageModal = document.querySelector("#imageModal");

  function updateNavbar() {
    if (!navbar) return;
    navbar.classList.toggle("is-scrolled", window.scrollY > 12);
  }

  updateNavbar();
  window.addEventListener("scroll", updateNavbar, { passive: true });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (!navCollapse || !navCollapse.classList.contains("show")) return;
      bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
    });
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      researchItems.forEach((item) => {
        const shouldShow = filter === "all" || item.dataset.category === filter;
        item.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.classList.add("was-validated");
        formStatus.textContent = "Please complete all fields with a valid email.";
        return;
      }

      contactForm.classList.remove("was-validated");
      formStatus.textContent = "Thanks. Your message is ready to be sent.";
      contactForm.reset();
    });
  }

  if (imageModal) {
    imageModal.addEventListener("show.bs.modal", (event) => {
      const trigger = event.relatedTarget;
      const image = document.querySelector("#modalImage");
      const label = document.querySelector("#imageModalLabel");

      if (!trigger || !image || !label) return;

      image.src = trigger.dataset.image;
      image.alt = trigger.dataset.title || "Gallery image";
      label.textContent = trigger.dataset.title || "Gallery image";
    });
  }
})();
