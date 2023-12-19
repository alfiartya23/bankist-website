"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");

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

// Project Code
const btnScrolloTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrolloTo.addEventListener("click", function (e) {
  const s1Coords = section1.getBoundingClientRect();
  console.log(s1Coords);

  // Getting the current scroll position distance between the current position viewport and the top of the page (relative to the document)
  // console.log("Current Scroll (X/Y)", window.scrollX, window.scrollY);

  // Height and Weight of the viewport
  // This affect if we change the height/width of the viewport when we open the inspect element
  // console.log(`Height/width of the viewport ${document.documentElement.clientHeight}, ${document.documentElement.clientWidth}.`);

  // Scrolling
  // Distance between the section to the top of the page
  // Old Approach
  window.scrollTo({
    // Current position + current scroll
    left: s1Coords.left + window.scrollX,
    top: s1Coords.top + window.scrollY,
    behavior: "smooth",
  });

  // New Approach
  // section1.scrollIntoView({ behavior: "smooth" });
});
