let body = document.querySelector("body");
let backdrop = document.querySelector("#backdrop");

let headerLogo = document.querySelector("#headerLogo");
let btnToggleMobileMenu = document.querySelector("#btnToggleMobileMenu");
let topBarContainer = document.querySelector("#topBarContainer");

let tabMenuH3List = document.querySelector("#tabMenu").querySelectorAll("h3");
let tabContentList = document
  .querySelector("#tabContent")
  .querySelectorAll(".tab");
let questionItems = document.querySelectorAll(".questionItem");

let inputFieldEmail = document.querySelector("#inputFieldEmail");
let btnContact = document.querySelector("#btnContact");

let isMobileMenuOpen = false;
let mobileAnimationTimer;
let tabAnimationTimer;
let inputFieldTimer;
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
    btnToggleMobileMenu.setAttribute("aria-Label", "open   menu");
    btnToggleMobileMenu.style.backgroundImage =
      'url("../images/icon-hamburger.svg")';
    fadeOutMobileNavBar();
    document.querySelector(".socialMedia").classList.remove("mobileMenu");
  } else {
    // aufmachen
    body.classList.add("overflowHidden");
    headerLogo.classList.add("white");
    btnToggleMobileMenu.setAttribute("aria-Label", "close menu");
    btnToggleMobileMenu.style.backgroundImage =
      'url("../images/icon-close.svg")';
    fadeInMobileNavBar();
    document.querySelector(".socialMedia").classList.add("mobileMenu");
  }

  isMobileMenuOpen = !isMobileMenuOpen;
}

function fadeInMobileNavBar() {
  backdrop.classList.remove("displayNone");
  backdrop.classList.add("fadeIn");
  topBarContainer.classList.remove("displayNone");
  topBarContainer.classList.add("fadeIn");
}

function fadeOutMobileNavBar() {
  backdrop.classList.remove("fadeIn");
  backdrop.classList.add("fadeOut");
  topBarContainer.classList.remove("fadeIn");
  topBarContainer.classList.add("fadeOut");

  mobileAnimationTimer = setTimeout(() => {
    setMobileNavBarClosed();
    mobileAnimationTimer = "";
  }, 1000);
}

function setMobileNavBarClosed() {
  backdrop.classList.remove("fadeOut");
  backdrop.classList.add("displayNone");
  topBarContainer.classList.remove("fadeOut");
  topBarContainer.classList.add("displayNone");
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

function toggleFaqQuestion(event) {
  let traversing = true;
  let mySelectedNode = event.target;
  let mySelectedParagraph;
  while (traversing) {
    if (mySelectedNode.classList.contains("questionItem")) {
      traversing = false;
      break;
    } else {
      mySelectedNode = mySelectedNode.parentNode;
    }
  }

  mySelectedNode.classList.toggle("open");
  mySelectedParagraph = mySelectedNode.querySelector("p");

  if (mySelectedParagraph.style.display === "block") {
    mySelectedParagraph.style.maxHeight = null;
    setTimeout(() => {
      mySelectedParagraph.style.display = "none";
    }, 200);
  } else {
    mySelectedParagraph.style.display = "block";
    mySelectedParagraph.style.maxHeight =
      mySelectedParagraph.scrollHeight + "px";
  }
}

function checkAndSubmitMail(event) {
  event.preventDefault();
  if (
    inputFieldEmail.value &&
    !inputFieldEmail.parentNode.classList.contains("error")
  ) {
    alert(
      "Thank you. " +
        inputFieldEmail.value +
        "has been registered. We will contact you soon."
    );
  }
}

function checkInput() {
  let regex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  if (inputFieldTimer) {
    clearTimeout(inputFieldTimer);
    console.log("cleartimeout");
  }

  inputFieldTimer = setTimeout(() => {
    console.log("checking");
    if (!inputFieldEmail.value.match(regex)) {
      inputFieldEmail.parentNode.classList.add("error");
    } else {
      inputFieldEmail.parentNode.classList.remove("error");
    }
  }, 1000);
}

function closeMobileMenuOnResize() {
  if (isMobileMenuOpen && window.innerWidth > 800) {
    toggleMobileMenu();
  }
}

function init() {
  btnToggleMobileMenu.addEventListener("click", toggleMobileMenu);
  btnContact.addEventListener("click", checkAndSubmitMail);
  inputFieldEmail.addEventListener("keydown", checkInput);
  window.addEventListener("resize", closeMobileMenuOnResize);

  tabMenuH3List.forEach((element) => {
    element.addEventListener("click", openSelectedTab);
    element.addEventListener("keydown", (event) => {
      if (event.key == " ") {
        openSelectedTab(event);
      }
    });
  });

  questionItems.forEach((element) => {
    element.addEventListener("click", toggleFaqQuestion);
    element.addEventListener("keydown", (event) => {
      if (event.key == " ") {
        toggleFaqQuestion(event);
      }
    });
  });
}

window.onload = init;
