const btnOpen = document.querySelector(".js-nav-open");
const btnClose = document.querySelector(".js-nav-close");
const media = window.matchMedia("(width < 45em)");
const topNavMenu = document.querySelector(".nav__menu");
const navOverlay = document.querySelector(".nav__overlay");
const main = document.querySelector("main");
const footer = document.querySelector("footer");
const body = document.querySelector("body");

const btnPrevious = document.querySelector(".js-last-btn");
const btnNext = document.querySelector(".js-next-btn");
const heroPicture = document.querySelector(".js-hero-picture");
const heroImage = document.querySelector(".js-hero-image");
const heroSource = document.querySelector(".js-hero-source");
const pageTitle = document.querySelector(".js-title");
const pageDescription = document.querySelector(".js-description");
const promo = document.querySelector(".js-promo");

let imageNumber = 1;

function openMobileMenu() {
  btnOpen.setAttribute("aria-expanded", "true");
  topNavMenu.removeAttribute("inert");
  topNavMenu.removeAttribute("style");
  navOverlay.classList.remove("hidden");
  main.setAttribute("inert", "");
  footer.setAttribute("inert", "");
  bodyScrollLockUpgrade.disableBodyScroll(body);
  btnClose.focus();
}

function closeMobileMenu() {
  btnOpen.setAttribute("aria-expanded", "false");
  topNavMenu.setAttribute("inert", "");
  main.removeAttribute("inert");
  footer.removeAttribute("inert");
  bodyScrollLockUpgrade.enableBodyScroll(body);
  btnOpen.focus();

  setTimeout(() => {
    topNavMenu.style.transition = "none";
    navOverlay.classList.add("hidden");
  }, 500);
}

function setupTopNav(e) {
  if (e.matches) {
    topNavMenu.setAttribute("inert", "");
    topNavMenu.style.transition = "none";
    navOverlay.classList.remove("hidden");
  } else {
    closeMobileMenu();
    topNavMenu.removeAttribute("inert");
  }
}

function resetAnimations(direction) {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    heroPicture.style.animation = "none";
    promo.style.animation = "none";
    updatePromoContent();
  } else {
    heroPicture.style.animation = "none";
    void heroPicture.offsetWidth;
    heroPicture.style.animation =
      direction === "next"
        ? "slide-in-left 1000ms ease-in-out"
        : "slide-in-right 1000ms ease-in-out";
    heroPicture.style.animationDelay = "300ms";
    promo.style.animation = "fade-out 500ms ease-in-out";

    setTimeout(() => {
      updatePromoContent();

      promo.style.animation = "fade-in 1000ms ease-in-out";
    }, 300);
  }
}

function updatePromoContent() {
  heroSource.srcset = `/assets/images/desktop-image-hero-${imageNumber}.jpg`;
  heroImage.src = `/assets/images/mobile-image-hero-${imageNumber}.jpg`;

  if (imageNumber === 1) {
    pageTitle.textContent = "Discover innovative ways to decorate";
    pageDescription.textContent = `
      We provide unmatched quality, comfort, and style for property owners across the country. Our experts combine form and function in bringing your vision to life. Create a room in your own style with our collection and make your property a reflection of you and what you love.
    `;

    heroImage.alt = `
    1. A modern dining area with two white chairs featuring wooden legs and a rectangular wooden table with a white frame. A small bonsai tree in a black pot is placed on the table, adding a touch of greenery to the minimalist setting.
    `;
  } else if (imageNumber === 2) {
    pageTitle.textContent = "We are available all across the globe";
    pageDescription.textContent = `
      With stores all over the world, it's easy for you to find furniture for your home or place of business. Locally, we’re in most major cities throughout the country. Find the branch nearest you using our store locator. Any questions? Don't hesitate to contact us today.
    `;
    heroImage.alt = `
    2.Three modern chairs in yellow, light green, and white, each with smooth, curved backs and seats, and matching thin metal legs. The chairs are placed against a plain, neutral wall, highlighting their minimalist design and vibrant colors.
    `;
  } else if (imageNumber === 3) {
    pageTitle.textContent = "Manufactured with the best materials";
    pageDescription.textContent = `
      Our modern furniture store provides a high level of quality. Our company has invested in advanced technology to ensure that every product is made as perfect and as consistent as possible. With three decades of experience in this industry, we understand what customers want for their home and office.
    `;
    heroImage.alt = `
    3.A close-up view of a black folding chair against a dark background. The chair is partially unfolded, with the seat and part of the backrest visible. The metal frame and hinges of the chair are also visible, highlighting its collapsible design.
    `;
  }
}

function handleNextBtn() {
  imageNumber = imageNumber === 3 ? 1 : imageNumber + 1;
  resetAnimations("next");
}

function handlePreviousBtn() {
  imageNumber = imageNumber === 1 ? 3 : imageNumber - 1;
  resetAnimations("previous");
}

setupTopNav(media);

btnOpen.addEventListener("click", openMobileMenu);
btnClose.addEventListener("click", closeMobileMenu);

media.addEventListener("change", function (e) {
  setupTopNav(e);
});

btnPrevious.addEventListener("click", handlePreviousBtn);
btnNext.addEventListener("click", handleNextBtn);
