// //////////////////////////////////////////
// Selecting Elements
// console.log(document.documentElement);

const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");

// console.log(allSections);

const allButtons = document.getElementsByTagName("button");

// console.log(allButtons);

// Creating and Inserting Elements
const message = document.createElement("div");
// This message represents a DOM element
message.classList.add("cookie-message");
// message.textContent = "We use cookies for improve our functionality and analitycs";

// Add some text and button with innerHTML
message.innerHTML = `We use cookies for improve our functionality and analitycs. <button class="btn btn--close-cookie">Got it!</button>`;

// Adding right BEFORE the header element
// header.prepend(message);
// Adding inside the header element as a sibling
// header.append(message);
// Adding after the header element
header.after(message);

// Notice the header only insert at once. It's because this message element is now indeed a life element living in the DOM

document.querySelector(".btn--close-cookie").addEventListener("click", function () {
  // Old way to delete the element, look up to the parent and remove the child
  message.parentElement.removeChild(message);
});

// --------------------------------------------------------
// Styles, Attributes and Classes
// Adding inline styles
message.style.color = "#252525";
message.style.backgroundColor = "tomato";
message.style.width = "120%";

// Add a computed style for inline styles
message.style.height = Number.parseFloat(getComputedStyle(message).height, 10) + 30 + "px";

// Changing CSS Variables
// document.documentElement.style.setProperty("--color-primary", "blue");

// Attributes,
const logo = document.querySelector(".nav__logo");
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

const link = document.querySelector(".nav__link--btn");
// console.log(link.href);
// console.log(link.getAttribute("href"));

// Data attributes
// console.log(logo.dataset.versionNumber);

// Types of Events and Event Handlers
// const h1 = document.querySelector("h1");
// h1.addEventListener("mouseenter", function (e) {
//   console.log(e.currentTarget);
// });

// Event Propagation in practice
const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomColor = () => {
  return `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)} )`;
};

console.log(randomColor(0, 255));

// Changing the color of Nav Link
document.querySelector(".nav__link").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("Link", e.target, e.currentTarget);
});

document.querySelector(".nav__links").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("CONTAINER", e.target, e.currentTarget);
});

document.querySelector(".nav").addEventListener("click", function (e) {
  this.style.backgroundColor = randomColor();
  console.log("NAV", e.target, e.currentTarget);
});
