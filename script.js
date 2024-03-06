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

// Implement Smooth Scrolling
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());

  // Scroll x/y
  console.log(`Current scroll (X/Y): ${window.pageXOffset} ${window.pageYOffset}`);

  // Height/Width Viewport
  // This client height and width is not counting the scroll bar
  // It just dimension of the view port
  console.log(`Height/Widght Viewport: ${document.documentElement.clientHeight} ${document.documentElement.clientWidth}`);

  // Scrolling
  // The distance is from the top of Section 1 + the current scroll position
  // Determine the absolute position of this element relative to the document
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: "smooth",
  });

  // New alternative way to implement smooth scrolling
  // section1.scrollIntoView({ behavior: "smooth" });
});
