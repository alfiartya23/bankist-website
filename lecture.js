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
