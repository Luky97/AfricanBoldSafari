const body = document.body;
const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");

if (window.lucide) {
  window.lucide.createIcons();
}

if (year) {
  year.textContent = new Date().getFullYear();
}

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

const alignHashTarget = () => {
  if (!window.location.hash) return;
  const id = decodeURIComponent(window.location.hash.slice(1));
  const target = document.getElementById(id);
  if (!target) return;

  const headerOffset = (header?.offsetHeight || 0) + 24;
  const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;
  const previousBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo({ top: Math.max(0, top), behavior: "instant" });
  window.requestAnimationFrame(() => {
    document.documentElement.style.scrollBehavior = previousBehavior;
  });
};

const scheduleHashAlignment = () => {
  [0, 200, 700, 1400, 2400].forEach((delay) => {
    window.setTimeout(alignHashTarget, delay);
  });
};

window.addEventListener("load", () => {
  scheduleHashAlignment();
});

window.addEventListener("hashchange", () => {
  scheduleHashAlignment();
});

navToggle?.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

nav?.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;
  body.classList.remove("nav-open");
  navToggle?.setAttribute("aria-expanded", "false");
  navToggle?.setAttribute("aria-label", "Open navigation");
});

const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
  revealObserver.observe(item);
});

const parallaxItems = document.querySelectorAll("[data-parallax]");
let ticking = false;

const updateParallax = () => {
  parallaxItems.forEach((item) => {
    const rect = item.parentElement.getBoundingClientRect();
    const progress = Math.max(-1, Math.min(1, rect.top / window.innerHeight));
    item.style.transform = `translateY(${progress * -28}px) scale(1.04)`;
  });
  ticking = false;
};

const requestParallax = () => {
  if (!ticking) {
    window.requestAnimationFrame(updateParallax);
    ticking = true;
  }
};

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  updateParallax();
  window.addEventListener("scroll", requestParallax, { passive: true });
  window.addEventListener("resize", requestParallax);
}

const galleryButtons = Array.from(document.querySelectorAll(".gallery-item"));
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const lightboxCaption = document.querySelector("[data-lightbox-caption]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const lightboxPrev = document.querySelector("[data-lightbox-prev]");
const lightboxNext = document.querySelector("[data-lightbox-next]");
let activeGalleryIndex = 0;
let lastFocusedElement = null;

const getFullImageUrl = (button) => {
  const img = button.querySelector("img");
  return img.src.replace(/w=\d+/, "w=1800");
};

const showGalleryImage = (index) => {
  activeGalleryIndex = (index + galleryButtons.length) % galleryButtons.length;
  const button = galleryButtons[activeGalleryIndex];
  const img = button.querySelector("img");
  const caption = button.dataset.caption || img.alt;

  lightboxImage.src = getFullImageUrl(button);
  lightboxImage.alt = img.alt;
  lightboxCaption.textContent = caption;
};

const openLightbox = (index) => {
  if (!lightbox) return;
  lastFocusedElement = document.activeElement;
  showGalleryImage(index);
  lightbox.hidden = false;
  requestAnimationFrame(() => lightbox.classList.add("is-open"));
  body.style.overflow = "hidden";
  lightboxClose?.focus();
};

const closeLightbox = () => {
  if (!lightbox) return;
  lightbox.classList.remove("is-open");
  body.style.overflow = "";
  window.setTimeout(() => {
    lightbox.hidden = true;
    lightboxImage.removeAttribute("src");
    lastFocusedElement?.focus?.();
  }, 220);
};

galleryButtons.forEach((button, index) => {
  button.addEventListener("click", () => openLightbox(index));
});

lightboxClose?.addEventListener("click", closeLightbox);
lightboxPrev?.addEventListener("click", () => showGalleryImage(activeGalleryIndex - 1));
lightboxNext?.addEventListener("click", () => showGalleryImage(activeGalleryIndex + 1));

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox || lightbox.hidden) return;

  if (event.key === "Escape") {
    closeLightbox();
  }

  if (event.key === "ArrowLeft") {
    showGalleryImage(activeGalleryIndex - 1);
  }

  if (event.key === "ArrowRight") {
    showGalleryImage(activeGalleryIndex + 1);
  }
});

const contactForm = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) {
    return;
  }

  const formData = new FormData(contactForm);
  const name = formData.get("name")?.toString().trim() || "there";
  const destination = formData.get("destination")?.toString().trim() || "Tanzania";
  const message = `Hello African Bold Safari, my name is ${name}. I am interested in ${destination}.`;

  window.open(`https://wa.me/255759047484?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  formStatus.textContent = "Inquiry noted. For the fastest response, continue on WhatsApp.";
  contactForm.reset();
});
