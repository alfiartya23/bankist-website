// // LECTURE ---------------------

// // Selecting Elements
// // console.log(document.head);
// // console.log(document.body);

// const header = document.querySelector(".header");

// // This return NodeList
// const allSections = document.querySelectorAll(".section");
// // console.log(allSections);

// // This returns HTMlCollection
// const allButton = document.getElementsByTagName("button");
// // console.log(allButton);

// // Creating and inserting elements
// // .insertAdjacentHTML
// const message = document.createElement("div");
// message.classList.add("cookie-message");
// // message.textContent = "We use cookies to improve functionality and analytics";
// message.innerHTML = `We use cookies to improve functionality and analytics <button class="btn btn--close-cookie">Got it!</button>`;

// // inside of the element
// // header.prepend(message);
// header.append(message);

// // Before and after sibling of the element
// // header.before(message);
// // header.after(message);

// // console.log(message);

// // Removing elements
// // document.querySelector(".btn--close-cookie").addEventListener("click", function () {
// //   message.remove();
// // });

// // Styles, Attributes, and Classes
// message.style.backgroundColor = "#252525";

// // Getting the height with getComputedStyle
// // console.log(getComputedStyle(message).height);

// // Changing the message height
// message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// document.documentElement.style.setProperty("--color-primary", "orangered");

// // Attributes
// const logo = document.querySelector(".nav__logo");

// EVENT PROPAGATION IN PRACTICE
// Giving Random color to the navigation
// const randomInt = (min, max) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };

// const randomColor = () => {
//   return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
// };

// // Nav anchor / a tag element
// document.querySelector(".nav__link").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("LINK", e.target, e.currentTarget);
//   console.log(e.currentTarget === this);

//   //   Stop Propagation
//   //   e.stopPropagation();
// });

// // Nav Container / ul tag element. This here point to the parent of a tag
// document.querySelector(".nav__links").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("LINK CONTAINER", e.target, e.currentTarget);
//   console.log(e.currentTarget === this);
// });

// // Nav parent
// document.querySelector(".nav").addEventListener("click", function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("NAV", e.target, e.currentTarget);
// });

// //////////////////////////////////////////
// DOM Traversing
// 1. Going Downwards: Selecting "Child"
const h1 = document.querySelector("h1");
// This will return a NodeList that has the highlight class on the element itself
console.log(h1.querySelectorAll(".highlight"));
// Any child inside of this element will showed
console.log(h1.childNodes);

// This will return a HTML Collection (Life Collection) only the element tag inside of it
console.log(h1.children);

// 2. Going Upwards: Selecting "Parents"
// This will return the closest parent node - and this is actually returns the same result
// console.log(h1.parentNode);
console.log(h1.parentElement);

// This will select the closest header/parent element that has this .header class so then we can appy those style to that element
h1.closest(".header").style.background = `#ddce78`;

// 3. Going Sideways: Selecting direct "Siblings"
// Only the previous and next element sibling
// This will return null because there's no sibling before
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

// If we need all of those element sibling
// Moving up to the parent element and looking up from there
// Returns A HTML Collection
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach((element) => {
  // If the element is not h1 itself, then change the scale into 0.5
  if (element !== h1) {
    element.style.fontStyle = "italic";
  }
});
