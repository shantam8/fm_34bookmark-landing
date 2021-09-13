let body = document.querySelector("body");
let backdrop = document.querySelector("#backdrop");

let headerLogo = document.querySelector("#headerLogo");
let btnToggleMobileMenu = document.querySelector("#btnToggleMobileMenu");
let headerNavBar = document.querySelector("#headerNavBar");

let tabMenuH3List = document.querySelector("#tabMenu").querySelectorAll("h3");
let tabContentList = document
  .querySelector("#tabContent")
  .querySelectorAll(".tab");

  let questionItems = document.querySelectorAll(".questionItem");

let isMobileMenuOpen = false;
let mobileAnimationTimer;
let tabAnimationTimer;
let selectedTab = 0;

function toggleMobileMenu() {
  if (mobileAnimationTimer) {
    clearTimeout(mobileAnimationTimer);
    setMobileNavBarClosed();
  }

  if (isMobileMenuOpen) {
    // schliessen
    body.classList.remove("overflowHidden");
    headerLogo.classList.remove("white");
    btnToggleMobileMenu.style.backgroundImage =
      'url("../images/icon-hamburger.svg")';
    fadeOutMobileNavBar();
  } else {
    // aufmachen

    body.classList.add("overflowHidden");
    headerLogo.classList.add("white");
    btnToggleMobileMenu.style.backgroundImage =
      'url("../images/icon-close.svg")';
    fadeInMobileNavBar();
  }

  isMobileMenuOpen = !isMobileMenuOpen;
}

function fadeInMobileNavBar() {
  backdrop.classList.remove("displayNone");
  backdrop.classList.add("fadeIn");
  headerNavBar.classList.remove("displayNone");
  headerNavBar.classList.add("fadeIn");
}

function fadeOutMobileNavBar() {
  backdrop.classList.remove("fadeIn");
  backdrop.classList.add("fadeOut");
  headerNavBar.classList.remove("fadeIn");
  headerNavBar.classList.add("fadeOut");

  mobileAnimationTimer = setTimeout(() => {
    setMobileNavBarClosed();
    mobileAnimationTimer = "";
  }, 1000);
}

function setMobileNavBarClosed() {
  backdrop.classList.remove("fadeOut");
  backdrop.classList.add("displayNone");
  headerNavBar.classList.remove("fadeOut");
  headerNavBar.classList.add("displayNone");
}

function openSelectedTab(event) {
  tabMenuH3List.forEach((element) => {
    element.classList.remove("active");
  });
  event.target.classList.add("active");

  tabContentList[selectedTab].classList.remove("fadeIn");
  tabContentList[selectedTab].classList.add("fadeOut");

  setTimeout(() => {
    tabContentList[selectedTab].classList.remove("fadeOut");
    tabContentList[selectedTab].classList.add("displayNone");

    switch (event.target.textContent) {
      case "Simple Bookmarking":
        selectedTab = 0;
        break;
      case "Speedy Searching":
        selectedTab = 1;
        break;
      case "Easy Sharing":
        selectedTab = 2;
        break;
    }

    tabContentList[selectedTab].classList.remove("displayNone");
    tabContentList[selectedTab].classList.add("fadeIn");
  }, 1000);
}

function toggleFaqQuestion(event){
  console.log(event.target);
  event.target.classList.toggle("open");
}

function init() {

  btnToggleMobileMenu.addEventListener("click", toggleMobileMenu);

  tabMenuH3List.forEach((element) => {
    element.addEventListener("click", openSelectedTab);
  });

  questionItems.forEach((element)=>{
    element.addEventListener("click", toggleFaqQuestion);
    
  });
}

window.onload = init;
