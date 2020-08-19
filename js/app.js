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
const main = document.querySelector("main");
const backToTop = main.querySelector(".back-to-top");
// For keeping track of auto hiding the navbar.
let timerId = null;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * @description Creates the list item element based off a section
 * @param {HTMLElement} section - The section to create corresponding li element
 * @returns {HTMLElement} The newly created li element
 */
const createLiEl = (section) => {
  const li = document.createElement("li");
  li.className = "menu__link";
  li.textContent = section.dataset.nav;
  // Add the section id as a dataset attribute so we can easier
  // reference the correct section to scroll to on click events.
  li.dataset.sectionId = section.id;
  return li;
};

/**
 * @description Handles visibility of navigation elements.
 * Slides the navbar into view, and starts a timer to dismiss/hide
 * the navbar depending on where the page is scrolled to.
 * Show/hide back to top button.
 */
const scrollNavHandler = () => {
  showNavBar();
  if (window.scrollY > pageHeader.offsetHeight) {
    hideNavBarTimer();
    showBackToTop();
  } else {
    hideBackToTop();
    if (timerId) {
      clearTimeout(timerId);
    }
  }
};

const showNavBar = () => {
  pageHeader.style.marginTop = "0px";
};

const hideNavBar = () => {
  pageHeader.style.marginTop = -pageHeader.offsetHeight + "px";
};

/**
 * @description Starts or reset idle timer to hide the navbar
 */
const hideNavBarTimer = () => {
  if (timerId) {
    clearTimeout(timerId);
  }
  timerId = setTimeout(hideNavBar, 2000);
};

const showBackToTop = () => {
  backToTop.style.bottom = "0";
};

const hideBackToTop = () => {
  backToTop.style.bottom = -backToTop.offsetHeight + "px";
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const buildNav = () => {
  for (let section of sections) {
    const newLi = createLiEl(section);
    navBarList.insertAdjacentElement("beforeend", newLi);
    // Initially display full contents (not collapsed)
    const content = section.querySelector(".collapsible-content");
    content.style.maxHeight = content.scrollHeight + "px";
  }
};

/**
 * @description Scroll to anchor ID using scrollTO event
 * @param {HTMLElement} section - The target section to scroll to.
 */
const scrollToAnchor = (section) => {
  // Take into account height of navbar/page header
  const pageHeaderHeight = pageHeader.offsetHeight;
  const targetPosition = section.offsetTop;
  window.scrollTo({
    top: targetPosition - pageHeaderHeight,
    behavior: "smooth",
  });
};

/**
 * @description Listens to menu (ul) item clicks and scroll to corresponding section
 */
const addNavBarListener = () => {
  navBarList.addEventListener("click", (e) => {
    // Delegate click event to the target's closest li element.
    const li = e.target.closest("li");
    console.log(li);
    const section = document.getElementById(li.dataset.sectionId);
    console.log(section);
    scrollToAnchor(section);
  });
};

/**
 * @description Collapses/expands the section when its h2 element is clicked
 */
const addSectionCollapseListener = () => {
  main.addEventListener("click", (e) => {
    if (e.target.classList.contains("collapsible")) {
      const section = e.target.closest("section");
      // Adds a nice accordian style folding
      if (section) {
        const content = section.querySelector(".collapsible-content");
        section.classList.toggle("collapsed");
        if (content.style.maxHeight) {
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      }
    }
  });
};

const addBackToTopListener = () => {
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
};

/**
 * @description Sets a target section active and deactivate all others
 * @param {string} sectionId - The id of the section to set active
 */
const setActive = (sectionId) => {
  for (let section of sections) {
    if (section.id === sectionId) {
      section.classList.add("active-section");
    } else {
      section.classList.remove("active-section");
    }
  }
};

/**
 * @description Detect which section is most visible in viewport and sets that as active
 */
const detectActive = () => {
  window.addEventListener("scroll", () => {
    scrollNavHandler();
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

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNav();
// Scroll to section on link click
// Attach listener to scroll to sections on click events.
addNavBarListener();
// Attach listener to scroll back to top of page.
addBackToTopListener();
// Set sections as active
detectActive();
// Navigation items
addSectionCollapseListener();
showNavBar();
hideBackToTop();
