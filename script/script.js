"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++) btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

// ///////////////////////////////////////////////
// Header CTA

// First get the coordinate that we want to go (Section 1 location (X/Y))
btnScrollTo.addEventListener("click", function () {
  // Getting the coordinate detail
  const section1Coords = section1.getBoundingClientRect();

  // console.log(event.target.getBoundingClientRect());
  // console.log(`Current value of X/Y: ${window.scrollX}, ${window.scrollY}`);

  // Read the height and width of viewport
  console.log(`Height/width viewport is ${document.documentElement.clientHeight}, ${document.documentElement.clientWidth}`);

  // Scrolling
  // Here we find the coordinate of Section 1
  // Curent position + current scroll
  window.scrollTo({
    top: section1Coords.top + window.scrollY,
    left: section1Coords.left + window.scrollX,
    behavior: "smooth",
  });

  console.log(`Top: ${section1Coords.top + window.scrollY} Left: ${section1Coords.left + window.scrollX}`);
});

// ///////////////////////////////////////////////
// Page Navigation
// Using Event Delegation
// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector(".nav__links").addEventListener("click", function (event) {
  event.preventDefault();

  // Matching Strategy
  if (event.target.classList.contains("nav__link")) {
    // Selecting the navigation based on its id href
    const idSection = event.target.getAttribute("href");

    // Scrolling to their section
    document.querySelector(idSection).scrollIntoView({ behavior: "smooth" });
  }
});

// ///////////////////////////////////////////////
// Tabbed Component

// Attach the event handler to the tabs
// We don't have to add the event listener to the all tabs element (imagine if we got 100 tabs?)
// Instead we could use the, event delegations approach
// BEST PRACTICE - attach the event handler on the parent element
tabsContainer.addEventListener("click", function (event) {
  // Using the matching strategy
  // Find the closest parent element that has class name
  const clicked = event.target.closest(".operations__tab");

  if (!clicked) return;

  // 1.  Moving down other button and remove content appear
  tabs.forEach((tab) => {
    tab.classList.remove("operations__tab--active");
  });
  tabsContent.forEach((c) => {
    c.classList.remove("operations__content--active");
  });

  // 2.  Raising the active tabs
  clicked.classList.add("operations__tab--active");

  // 3. Activate content area
  const selectedContent = document.querySelector(`.operations__content--${clicked.dataset.tab}`);
  selectedContent.classList.add("operations__content--active");
});

// ///////////////////////////////////////////////
// Menu Fade Out Animations
// Using Event Delegations Approach
const nav = document.querySelector(".nav");

// Handling the opacity function
function handleHover(event, opacity) {
  if (event.target.classList.contains("nav__link")) {
    const hoverLink = event.target;
    const siblings = hoverLink.closest(".nav").querySelectorAll(".nav__link");
    const logo = hoverLink.closest(".nav").querySelector("img");

    siblings.forEach((element) => {
      if (element !== hoverLink) {
        element.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
}

// Mouse enter
nav.addEventListener("mouseover", function (event) {
  handleHover(event, 0.5);
});

// Mouse leave
nav.addEventListener("mouseout", function (event) {
  handleHover(event, 1);
});

// ///////////////////////////////////////////////
// Sticky Navigation
// Selecting the Header element
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

// --- BEST PRACTICE ---
const stickyNav = function (entries) {
  // This entries parameter in here is actually an array of the threshold element, that's why we can use forEach
  // We can do the array destructure on the entries array too
  const [entry] = entries;

  // The degree of intersection between the target element and its root is the intersectionRatio
  // console.log(entry.intersectionRatio);

  // Checking if the intersecting value is true then add the sticky class to the NAV
  if (!entry.isIntersecting) {
    // Add the sticky classes to the nav
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  // When the header here is not visible (0% of the threshold) and the height -90px of nav height then do something in the callback function
  threshold: 0,
  // The navigation should appear exactly -90px before the threshold was actually reach
  rootMargin: `-${navHeight}px`,
});

// Targeting section-1 element to be observed
headerObserver.observe(header);

// ///////////////////////////////////////////////
// Revealing Element on Scroll
const allSections = document.querySelectorAll(".section");

const sectionObserver = new IntersectionObserver(
  function (entries, observer) {
    const [entry] = entries;

    // To prevent the section-1 showing first
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");

    // Stopping the observer to observe the target element
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0.15,
  }
);

allSections.forEach((section) => {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

// ///////////////////////////////////////////////
// Lazy Loading Images Concept
// In this section we just have to focus on the image that has the lazy-images class
// Selecting those image target that has the data-src attr
const imgTarget = document.querySelectorAll("img[data-src]");

// Create observe variable for every images
const imgObserver = new IntersectionObserver(
  function (entries, observer) {
    const [entry] = entries;

    // This return is used only to end the execution of a function. So, if there is no intersection, do nothing.
    if (!entry.isIntersecting) return;

    // Replacing the img src with the dataset src
    entry.target.src = entry.target.dataset.src;

    // Removing the lazy-img class for each image
    entry.target.addEventListener("load", function () {
      entry.target.classList.remove("lazy-img");
    });

    // Stop browser to observe again when scrolling to the top
    observer.unobserve(entry.target);
  },
  {
    root: null,
    threshold: 0,
    // The image should loaded exactly -200px before the threshold was actually reach
    rootMargin: "-200px",
  }
);

// Targeting element to be observed
imgTarget.forEach((img) => {
  imgObserver.observe(img);
});

// ///////////////////////////////////////////////
// Slider Component - PART1
const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotsContainer = document.querySelector(".dots");
let currentSlide = 0;
const maxSlide = slides.length;

// We need to reveal all those images, so we can see the image
// slider.style.transform = "scale(0.4)";
// slider.style.overflow = "visible";
// slides.forEach((slide, index) => {
//   // 0% 100% 200% 300%
//   slide.style.transform = `translateX(${100 * index}%)`;
// });

// ------ Function ------
// Creating the dots with innerAdjacentHTML before end
function createDots() {
  slides.forEach((_, index) => {
    // Creating the dot with button tag
    dotsContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${index}"></button>`);
  });
}

function activateDots(currentSlide) {
  // Lookup to the parent first. Then forEach button, add the logic
  document.querySelectorAll(".dots__dot").forEach((dot) => {
    // Removing all active tabs
    dot.classList.remove("dots__dot--active");

    // Selecting based on data-slide attr
    document.querySelector(`.dots__dot[data-slide="${currentSlide}"]`).classList.add("dots__dot--active");
  });
}

// Refactoring the function
function goToSlide(slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
}

function nextSlide() {
  // When user click this button change the order into
  // -100% 0% 100% 100%

  // Facing the issue of maximum next slide
  currentSlide === maxSlide - 1 ? (currentSlide = 0) : currentSlide++;

  goToSlide(currentSlide);
  activateDots(currentSlide);
}

function previousSlide() {
  // Facing the issue of maximum next slide
  currentSlide === 0 ? (currentSlide = maxSlide - 1) : currentSlide--;

  goToSlide(currentSlide);
  activateDots(currentSlide);
}

// This will activate all dots
function initializeSliderDots() {
  createDots();
  activateDots(0);
  goToSlide(0);
}
initializeSliderDots();

// Handling Button
btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", previousSlide);

// Handling with Arrow Keys
document.addEventListener("keydown", function (event) {
  event.key === "ArrowRight" && nextSlide();
  event.key === "ArrowLeft" && previousSlide();
});

// Selecting the dots based on the Event Delegation approach
dotsContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("dots__dot")) {
    // Taking the number of the image dataset
    const { slide } = event.target.dataset;
    // Slide to the image selected
    goToSlide(slide);

    // Activate the white dots
    activateDots(slide);
  }
});
