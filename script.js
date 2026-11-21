/* =========================================
   GAME STATION MIRZAPUR
   Website Interactions
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
  // =====================================
  // ELEMENTS
  // =====================================

  const loader = document.querySelector(".loader");
  const header = document.querySelector(".site-header");

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-link");

  const demoOpen = document.getElementById("demoOpen");
  const demoClose = document.getElementById("demoClose");
  const demoDismiss = document.getElementById("demoDismiss");
  const demoExplore = document.getElementById("demoExplore");
  const demoModal = document.getElementById("demoModal");

  const backTop = document.getElementById("backTop");

  const whatsappButton = document.getElementById("whatsappButton");

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCaption = document.getElementById("lightboxCaption");

  const lightboxClose = document.getElementById("lightboxClose");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  // =====================================
  // LOADING SCREEN
  // =====================================

  function hideLoader() {
    if (loader) {
      loader.classList.add("hidden");
    }
  }

  window.addEventListener("load", () => {
    setTimeout(hideLoader, 500);
  });

  // Fallback in case some images load slowly
  setTimeout(hideLoader, 3000);

  // =====================================
  // STICKY NAVBAR
  // =====================================

  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateHeader, {
    passive: true
  });

  updateHeader();

  // =====================================
  // MOBILE NAVIGATION
  // =====================================

  function openMenu() {
    nav.classList.add("open");
    menuToggle.classList.add("active");

    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");

    document.body.classList.add("modal-open");
  }

  function closeMenu() {
    nav.classList.remove("open");
    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");

    document.body.classList.remove("modal-open");
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("open");

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu after clicking a navigation link
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", event => {
    const clickedInsideNav = nav.contains(event.target);
    const clickedMenuButton = menuToggle.contains(event.target);

    if (
      nav.classList.contains("open") &&
      !clickedInsideNav &&
      !clickedMenuButton
    ) {
      closeMenu();
    }
  });

  // =====================================
  // ACTIVE NAVIGATION
  // =====================================

  const sections = document.querySelectorAll("main section[id]");

  function updateActiveNavigation() {
    let currentSection = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 160;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionBottom
      ) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      const target = link.getAttribute("href");

      if (target === `#${currentSection}`) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavigation, {
    passive: true
  });

  updateActiveNavigation();

  // =====================================
  // SCROLL REVEAL ANIMATIONS
  // =====================================

  const revealElements = document.querySelectorAll(".reveal");

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

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
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
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
  // BACK TO TOP BUTTON
  // =====================================

  function updateBackTop() {
    if (window.scrollY > 500) {
      backTop.classList.add("visible");
    } else {
      backTop.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", updateBackTop, {
    passive: true
  });

  updateBackTop();

  backTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? "auto" : "smooth"
    });
  });

  // =====================================
  // DEMO POPUP
  // =====================================

  let previousFocus = null;

  function openDemo() {
    previousFocus = document.activeElement;

    demoModal.classList.add("active");
    demoModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    demoClose.focus();
  }

  function closeDemo() {
    demoModal.classList.remove("active");
    demoModal.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    if (previousFocus) {
      previousFocus.focus();
    }
  }

  demoOpen.addEventListener("click", openDemo);

  demoClose.addEventListener("click", closeDemo);

  demoDismiss.addEventListener("click", closeDemo);

  // Explore Website button
  demoExplore.addEventListener("click", () => {
    closeDemo();

    document.getElementById("games").scrollIntoView({
      behavior: reducedMotion ? "auto" : "smooth"
    });
  });

  // Close modal when clicking outside popup
  demoModal.addEventListener("click", event => {
    if (event.target === demoModal) {
      closeDemo();
    }
  });

  // =====================================
  // WHATSAPP CONTACT
  // =====================================

  /*
    IMPORTANT:
    Replace the placeholder below with the
    owner's real WhatsApp number.

    Format:
    Country code + phone number
    Example format for India: 9193362 43712

    Do not include:
    + symbol, spaces or hyphens.
  */

  const BUSINESS_WHATSAPP_NUMBER = "";

  whatsappButton.addEventListener("click", () => {
    if (!BUSINESS_WHATSAPP_NUMBER) {
      alert(
        "The owner's WhatsApp number has not been added yet. Please contact the business directly."
      );

      return;
    }

    const message =
      "Hello Game Station Mirzapur! I would like to know more about your gaming services and current pricing.";

    const whatsappURL =
      "https://wa.me/" +
      BUSINESS_WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );
  });

  // =====================================
  // GALLERY LIGHTBOX
  // =====================================

  const galleryItems = Array.from(
    document.querySelectorAll(".gallery-item")
  );

  let currentGalleryIndex = 0;

  function getGalleryData(index) {
    const item = galleryItems[index];

    const image = item.querySelector("img");

    const caption = item.querySelector(
      ".gallery-caption"
    );

    return {
      src: image.src,
      alt: image.alt,
      caption: caption
        ? caption.textContent.replace("↗", "").trim()
        : "GAME STATION MIRZAPUR"
    };
  }

  function showGalleryImage(index) {
    if (galleryItems.length === 0) {
      return;
    }

    // Wrap around the gallery
    currentGalleryIndex =
      (index + galleryItems.length) %
      galleryItems.length;

    const data = getGalleryData(currentGalleryIndex);

    lightboxImage.src = data.src;
    lightboxImage.alt = data.alt;

    lightboxCaption.textContent =
      data.caption +
      "  /  " +
      (currentGalleryIndex + 1) +
      " OF " +
      galleryItems.length;
  }

  function openLightbox(index) {
    previousFocus = document.activeElement;

    showGalleryImage(index);

    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");

    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.classList.remove("modal-open");

    lightboxImage.removeAttribute("src");

    if (previousFocus) {
      previousFocus.focus();
    }
  }

  function nextGalleryImage() {
    showGalleryImage(currentGalleryIndex + 1);
  }

  function previousGalleryImage() {
    showGalleryImage(currentGalleryIndex - 1);
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      openLightbox(index);
    });
  });

  lightboxClose.addEventListener(
    "click",
    closeLightbox
  );

  lightboxNext.addEventListener(
    "click",
    nextGalleryImage
  );

  lightboxPrev.addEventListener(
    "click",
    previousGalleryImage
  );

  // Close lightbox when clicking its background
  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // =====================================
  // KEYBOARD SUPPORT
  // =====================================

  document.addEventListener("keydown", event => {
    // Escape closes open menu and overlays
    if (event.key === "Escape") {
      if (demoModal.classList.contains("active")) {
        closeDemo();
      }

      if (lightbox.classList.contains("active")) {
        closeLightbox();
      }

      if (nav.classList.contains("open")) {
        closeMenu();
      }
    }

    // Gallery navigation
    if (lightbox.classList.contains("active")) {
      if (event.key === "ArrowRight") {
        nextGalleryImage();
      }

      if (event.key === "ArrowLeft") {
        previousGalleryImage();
      }
    }
  });

  // =====================================
  // DESKTOP CURSOR EFFECT
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

    // Cursor changes over clickable elements
    const interactiveElements = document.querySelectorAll(
      "a, button, .game-card, .gallery-item"
    );

    interactiveElements.forEach(element => {
      element.addEventListener("mouseenter", () => {
        cursorRing.classList.add("hover");
      });

      element.addEventListener("mouseleave", () => {
        cursorRing.classList.remove("hover");
      });
    });
  }

  // =====================================
  // SUBTLE HERO PARALLAX
  // =====================================

  const heroArt = document.querySelector(".hero-art");

  if (
    desktopPointer &&
    !reducedMotion &&
    heroArt
  ) {
    document.addEventListener("mousemove", event => {
      const x =
        (event.clientX / window.innerWidth - 0.5) * 12;

      const y =
        (event.clientY / window.innerHeight - 0.5) * 12;

      heroArt.style.setProperty(
        "--parallax-x",
        x + "px"
      );

      heroArt.style.setProperty(
        "--parallax-y",
        y + "px"
      );
    });
  }

  // =====================================
  // IMAGE ERROR HANDLING
  // =====================================

  const galleryImages = document.querySelectorAll(
    ".gallery-item img"
  );

  galleryImages.forEach(image => {
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

  console.log(
    "GAME STATION MIRZAPUR website initialized."
  );
});


document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // =====================================
  // 1. REMOVE LOADING SCREEN
  // =====================================

  const loader = document.querySelector(".loader");

  if (loader) {
    setTimeout(() => {
      loader.classList.add("loaded");

      setTimeout(() => {
        loader.style.display = "none";
      }, 600);
    }, 500);
  }


  // =====================================
  // 2. MOBILE NAVIGATION MENU
  // =====================================

  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("active");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen);

      document.body.classList.toggle("menu-open", isOpen);
    });

    // Close menu when clicking a link
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        nav.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      });
    });
  }


  // =====================================
  // 3. SMOOTH SCROLLING
  // =====================================

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });


  // =====================================
  // 4. ACTIVE NAVIGATION LINK
  // =====================================

  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  function updateNavigation() {
    let currentSection = "home";

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop <= 150) {
        currentSection = section.id;
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === "#" + currentSection
      );
    });
  }

  window.addEventListener("scroll", updateNavigation);
  updateNavigation();


  // =====================================
  // 5. REVEAL ANIMATION
  // =====================================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach(element => {
      element.classList.add("visible");
    });
  }


  // =====================================
  // 6. WHATSAPP BUTTONS
  // =====================================

  // Replace with the owner's real WhatsApp number.
  // Example format: 919876543210
  const WHATSAPP_NUMBER = "91";

  function openWhatsApp(message) {
    if (WHATSAPP_NUMBER.includes("X")) {
      alert("The owner needs to add the official WhatsApp number first.");
      return;
    }

    const url =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
  }

  const whatsappButton = document.querySelector("#whatsappButton");
  const whatsappFloat = document.querySelector("#whatsappFloat");

  if (whatsappButton) {
    whatsappButton.addEventListener("click", () => {
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
  // 7. WEBSITE DEMO POPUP
  // =====================================

  const demoOpen = document.querySelector("#demoOpen");
  const demoModal = document.querySelector("#demoModal");
  const demoClose = document.querySelector("#demoClose");
  const demoDismiss = document.querySelector("#demoDismiss");
  const demoExplore = document.querySelector("#demoExplore");

  function openDemo() {
    if (!demoModal) return;

    demoModal.classList.add("active", "open", "show");
    demoModal.setAttribute("aria-hidden", "false");

    document.body.classList.add("modal-open");
  }

  function closeDemo() {
    if (!demoModal) return;

    demoModal.classList.remove("active", "open", "show");
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

      document.querySelector("#games").scrollIntoView({
        behavior: "smooth"
      });
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
  // 8. GALLERY LIGHTBOX
  // =====================================

  const galleryItems = document.querySelectorAll("[data-gallery]");
  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = document.querySelector("#lightboxImage");
  const lightboxCaption = document.querySelector("#lightboxCaption");

  const lightboxClose = document.querySelector("#lightboxClose");
  const lightboxPrev = document.querySelector("#lightboxPrev");
  const lightboxNext = document.querySelector("#lightboxNext");

  const galleryImages = Array.from(galleryItems).map(item => {
    return {
      image: item.querySelector("img"),
      caption: item.querySelector(".gallery-caption")
    };
  });

  let currentImage = 0;

  function showGalleryImage(index) {
    if (!lightbox || !lightboxImage || galleryImages.length === 0) {
      return;
    }

    currentImage =
      (index + galleryImages.length) % galleryImages.length;

    const selected = galleryImages[currentImage];

    lightboxImage.src = selected.image.src;
    lightboxImage.alt = selected.image.alt;

    lightboxCaption.textContent =
      selected.caption
        ? selected.caption.textContent.trim()
        : "";

    lightbox.classList.add("active", "open", "show");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.classList.add("lightbox-open");
  }

  function closeGallery() {
    if (!lightbox) return;

    lightbox.classList.remove("active", "open", "show");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.classList.remove("lightbox-open");
  }

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      showGalleryImage(index);
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener("click", closeGallery);
  }

  if (lightboxPrev) {
    lightboxPrev.addEventListener("click", () => {
      showGalleryImage(currentImage - 1);
    });
  }

  if (lightboxNext) {
    lightboxNext.addEventListener("click", () => {
      showGalleryImage(currentImage + 1);
    });
  }

  if (lightbox) {
    lightbox.addEventListener("click", event => {
      if (event.target === lightbox) {
        closeGallery();
      }
    });
  }


  // =====================================
  // 9. BACK TO TOP BUTTON
  // =====================================

  const backTop = document.querySelector("#backTop");

  if (backTop) {
    window.addEventListener("scroll", () => {
      backTop.classList.toggle("visible", window.scrollY > 400);
    });

    backTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }


  // =====================================
  // 10. KEYBOARD ESCAPE
  // =====================================

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeDemo();
      closeGallery();

      if (nav && menuToggle) {
        nav.classList.remove("active");
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("menu-open");
      }
    }
  });


  console.log("Game Station Mirzapur JavaScript loaded successfully!");
});
