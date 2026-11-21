/* =========================================
   GAME STATION MIRZAPUR
   Clean Website JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // =====================================
  // ELEMENTS
  // =====================================

  const loader = document.querySelector(".loader");
  const header = document.querySelector(".site-header");

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-link");

  const backTop = document.getElementById("backTop");

  const demoModal = document.getElementById("demoModal");
  const demoOpen = document.getElementById("demoOpen");
  const demoClose = document.getElementById("demoClose");
  const demoDismiss = document.getElementById("demoDismiss");
  const demoExplore = document.getElementById("demoExplore");

  const whatsappButton = document.getElementById("whatsappButton");
  const whatsappFloat = document.getElementById("whatsappFloat");

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");

  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const smoothBehavior = reducedMotion ? "auto" : "smooth";

  // =====================================
  // LOADER
  // =====================================

  function hideLoader() {
    if (!loader) return;

    loader.classList.add("hidden");
    loader.classList.add("loaded");
  }

  window.addEventListener("load", hideLoader);

  // Fallback
  setTimeout(hideLoader, 2500);

  // =====================================
  // HEADER
  // =====================================

  function updateHeader() {
    if (!header) return;

    header.classList.toggle("scrolled", window.scrollY > 40);
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();

  // =====================================
  // MOBILE NAVIGATION
  // =====================================

  function closeMenu() {
    if (nav) {
      nav.classList.remove("open");
      nav.classList.remove("active");
    }

    if (menuToggle) {
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }

    document.body.classList.remove("modal-open");
    document.body.classList.remove("menu-open");
  }

  function openMenu() {
    if (!nav || !menuToggle) return;

    nav.classList.add("open");
    nav.classList.add("active");

    menuToggle.classList.add("active");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");

    document.body.classList.add("modal-open");
    document.body.classList.add("menu-open");
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen =
        nav.classList.contains("open") ||
        nav.classList.contains("active");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", event => {
    if (!nav || !menuToggle) return;

    const insideNav = nav.contains(event.target);
    const insideButton = menuToggle.contains(event.target);

    if (
      (nav.classList.contains("open") ||
        nav.classList.contains("active")) &&
      !insideNav &&
      !insideButton
    ) {
      closeMenu();
    }
  });

  // =====================================
  // SMOOTH SCROLL
  // =====================================

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: smoothBehavior,
        block: "start"
      });
    });
  });

  // =====================================
  // ACTIVE NAVIGATION
  // =====================================

  const sections = document.querySelectorAll("main section[id]");

  function updateActiveNavigation() {
    let currentSection = "";

    sections.forEach(section => {
      const top = section.offsetTop - 160;
      const bottom = top + section.offsetHeight;

      if (
        window.scrollY >= top &&
        window.scrollY < bottom
      ) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute("href");

      link.classList.toggle(
        "active",
        href === "#" + currentSection
      );
    });
  }

  window.addEventListener("scroll", updateActiveNavigation, {
    passive: true
  });

  updateActiveNavigation();

  // =====================================
  // REVEAL ANIMATIONS
  // =====================================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealElements.forEach(element => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }

  // =====================================
  // BACK TO TOP
  // =====================================

  function updateBackTop() {
    if (!backTop) return;

    backTop.classList.toggle("visible", window.scrollY > 500);
  }

  window.addEventListener("scroll", updateBackTop, {
    passive: true
  });

  updateBackTop();

  if (backTop) {
    backTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: smoothBehavior
      });
    });
  }

  // =====================================
  // WHATSAPP CONTACT
  // =====================================

  // India country code + business number
  const BUSINESS_WHATSAPP_NUMBER = "919336243712";

  function openWhatsApp(message) {
    const url =
      "https://wa.me/" +
      BUSINESS_WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (whatsappButton) {
    whatsappButton.addEventListener("click", event => {
      event.preventDefault();

      openWhatsApp(
        "Hello GAME STATION MIRZAPUR! I want to book a PS5 gaming session. Please share available slots and pricing."
      );
    });
  }

  if (whatsappFloat) {
    whatsappFloat.addEventListener("click", event => {
      event.preventDefault();

      openWhatsApp(
        "Hello GAME STATION MIRZAPUR! I want to check gaming session availability."
      );
    });
  }

  // =====================================
  // DEMO POPUP
  // =====================================

  function openDemo() {
    if (!demoModal) return;

    demoModal.classList.add("active");
    demoModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");
  }

  function closeDemo() {
    if (!demoModal) return;

    demoModal.classList.remove("active");
    demoModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");
  }

  if (demoOpen) {
    demoOpen.addEventListener("click", openDemo);
  }

  if (demoClose) {
    demoClose.addEventListener("click", closeDemo);
  }

  if (demoDismiss) {
    demoDismiss.addEventListener("click", closeDemo);
  }

  if (demoExplore) {
    demoExplore.addEventListener("click", () => {
      closeDemo();

      const gamesSection = document.getElementById("games");

      if (gamesSection) {
        gamesSection.scrollIntoView({
          behavior: smoothBehavior
        });
      }
    });
  }

  if (demoModal) {
    demoModal.addEventListener("click", event => {
      if (event.target === demoModal) {
        closeDemo();
      }
    });
  }

  // =====================================
  // GALLERY LIGHTBOX
  // =====================================

  const galleryItems = Array.from(
    document.querySelectorAll(".gallery-item")
  );

  let currentGalleryIndex = 0;

  function getGalleryData(index) {
    const item = galleryItems[index];

    if (!item) return null;

    const image = item.querySelector("img");
    const caption = item.querySelector(".gallery-caption");

    if (!image) return null;

    return {
      src: image.src,
      alt: image.alt || "Game Station Mirzapur gallery",
      caption: caption
        ? caption.textContent.replace("↗", "").trim()
        : "GAME STATION MIRZAPUR"
    };
  }

  function showGalleryImage(index) {
    if (
      !lightbox ||
      !lightboxImage ||
      galleryItems.length === 0
    ) {
      return;
    }

    currentGalleryIndex =
      (index + galleryItems.length) % galleryItems.length;

    const data = getGalleryData(currentGalleryIndex);

    if (!data) return;

    lightboxImage.src = data.src;
    lightboxImage.alt = data.alt;

    if (lightboxCaption) {
      lightboxCaption.textContent =
        data.caption +
        " / " +
        (currentGalleryIndex + 1) +
        " OF " +
        galleryItems.length;
    }

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");
  }

  function closeLightbox() {
    if (!lightbox) return;

    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    if (lightboxImage) {
      lightboxImage.removeAttribute("src");
    }
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      showGalleryImage(index);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeLightbox);
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", () => {
      showGalleryImage(currentGalleryIndex + 1);
    });
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", () => {
      showGalleryImage(currentGalleryIndex - 1);
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // =====================================
  // KEYBOARD SUPPORT
  // =====================================

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeMenu();
      closeDemo();
      closeLightbox();
    }

    if (lightbox && lightbox.classList.contains("active")) {
      if (event.key === "ArrowRight") {
        showGalleryImage(currentGalleryIndex + 1);
      }

      if (event.key === "ArrowLeft") {
        showGalleryImage(currentGalleryIndex - 1);
      }
    }
  });

  // =====================================
  // DESKTOP CURSOR
  // =====================================

  const desktopPointer = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  ).matches;

  if (desktopPointer && !reducedMotion) {
    const cursorDot = document.createElement("div");
    const cursorRing = document.createElement("div");

    cursorDot.className = "cursor-dot";
    cursorRing.className = "cursor-ring";

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    document.addEventListener("mousemove", event => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      cursorDot.style.left = mouseX + "px";
      cursorDot.style.top = mouseY + "px";
    });

    function animateCursor() {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      cursorRing.style.left = ringX + "px";
      cursorRing.style.top = ringY + "px";

      requestAnimationFrame(animateCursor);
    }

    animateCursor();

    document.querySelectorAll(
      "a, button, .game-card, .gallery-item"
    ).forEach(element => {
      element.addEventListener("mouseenter", () => {
        cursorRing.classList.add("hover");
      });

      element.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("hover");
      });
    });
  }

  // =====================================
  // HERO PARALLAX
  // =====================================

  const heroArt = document.querySelector(".hero-art");

  if (desktopPointer && !reducedMotion && heroArt) {
    document.addEventListener("mousemove", event => {
      const x =
        (event.clientX / window.innerWidth - 0.5) * 12;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 12;

      heroArt.style.setProperty("--parallax-x", x + "px");
      heroArt.style.setProperty("--parallax-y", y + "px");
    });
  }

  // =====================================
  // GALLERY IMAGE ERROR
  // =====================================

  document.querySelectorAll(".gallery-item img").forEach(image => {
    image.addEventListener("error", () => {
      image.style.display = "none";

      const parent = image.closest(".gallery-item");

      if (parent) {
        parent.style.background =
          "linear-gradient(135deg, #151720, #30151f)";
      }
    });
  });

  // =====================================
  // FINISH
  // =====================================

  console.log("GAME STATION MIRZAPUR JavaScript loaded!");
});
