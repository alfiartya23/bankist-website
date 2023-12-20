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
