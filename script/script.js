"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

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
btnScrollTo.addEventListener("click", function (event) {
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

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching Strategy
  if (e.target.classList.contains("nav__link")) {
    //     // Selecting the navigation based on its id href
    const idSection = e.target.getAttribute("href");

    //     // Scrolling to their section
    document.querySelector(idSection).scrollIntoView({ behavior: "smooth" });
  }
});

// ///////////////////////////////////////////////
// Tabbed Component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

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
