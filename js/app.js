/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const pageHeader = document.querySelector(".page__header");
const navBarMenu = pageHeader.querySelector(".navbar__menu");
const navBarList = navBarMenu.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");

console.log(navBarMenu);
console.log(navBarList);

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// const createLiEl = (textContent, anchor) => {
const createLiEl = (section) => {
  console.log(section);
  const li = document.createElement("li");
  li.className = "menu__link";
  // li.textContent = textContent;
  li.textContent = section.dataset.nav;
  // li.addEventListener("click", scrollToAnchor.bind(null, anchor));
  li.addEventListener("click", scrollToAnchor.bind(null, section));
  return li;
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const buildNav = () => {
  for (let section of sections) {
    // let newLi = createLiEl(section.dataset.nav, section.id);
    let newLi = createLiEl(section);
    // newLi.dataset.sectionId = section.id;
    navBarList.insertAdjacentElement("beforeend", newLi);
  }
};

// Add class 'active' to section when near top of viewport
const activateSection = () => {};

// Scroll to anchor ID using scrollTO event
// const scrollToAnchor = (target) => {
const scrollToAnchor = (section) => {
  console.log("click " + section.id);
  // const targetEl = document.getElementById(target);
  const pageHeaderHeight = pageHeader.offsetHeight;
  // const targetPosition = targetEl.offsetTop;
  const targetPosition = section.offsetTop;
  window.scrollTo({
    top: targetPosition - pageHeaderHeight,
    behavior: "smooth",
  });
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu

// Scroll to section on link click

// Set sections as active

const setActive = (sectionId) => {
  for (let section of sections) {
    if (section.id === sectionId) {
      section.classList.add("active-section");
    } else {
      section.classList.remove("active-section");
    }
  }
};

const detectActive = () => {
  window.addEventListener("scroll", () => {
    const pageHeaderHeight = pageHeader.offsetHeight;
    for (let section of sections) {
      rect = section.getBoundingClientRect();
      if (
        rect.top < window.innerHeight / 2 &&
        rect.bottom > window.innerHeight / 2 + pageHeaderHeight
      ) {
        if (section.classList.contains("active-section")) {
          return;
        }
        setActive(section.id);
        return;
      }
    }
  });
};

buildNav();
detectActive();
