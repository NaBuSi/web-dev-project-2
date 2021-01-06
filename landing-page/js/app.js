/** Global Variables */

const sections = document.querySelectorAll("section");
const navbar_links = document.querySelectorAll("#navbar__list a");
const navbar_menu = document.querySelector(".navbar__menu");

/** Build a unordered content list from provided sections */

function buildContentList() {
    let contentList = document.createElement("ul");
    contentList.className = "content-list";
    sections.forEach(element => {
        let item = document.createElement("li");
        item.appendChild(element);
        contentList.appendChild(item);
    });
    return document.querySelector("main").appendChild(contentList);
}

/** Build a navigation menu and link it to sections id's as href attrebutes */

function buildNavigation() {
    let navbar = document.getElementById("navbar__list");
    sections.forEach(element => {
        let item = document.createElement("li");
        let link = document.createElement("a");
        link.setAttribute("href", `#${element.getAttribute("id")}`);
        link.setAttribute("id", `link-to-${element.getAttribute("id")}`);
        link.textContent = element.getAttribute("data-nav");
        if (element.className === "active")
            link.classList.add("active");
        link.classList.add(`link-to-${element.getAttribute("id")}`, "menu__link");
        item.appendChild(link);
        navbar.appendChild(item);
    });
}
/** Function scroll smoothly to the target */
function smoothScroll(target) {
    target = document.querySelector(target);
    let scrollOptions = {
        left: target.offsetLeft,
        top: target.offsetTop,
        behavior: "smooth"
    }
    window.scrollTo(scrollOptions);
}

/** adding click event listener to the menu links */
function menuClickListener() {
    document.querySelector(".navbar__menu").addEventListener("click", function(e) {
        if (e.target.nodeName === "A") {
            e.preventDefault();
            let href = e.target.getAttribute("href");
            e.target.classList.add("active");
            smoothScroll(href);
        }
    });
}

/** function check if elements is in the viewport */
function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    const menu_height = document.querySelector(".navbar__menu").offsetHeight; // menu offset padding
    return (
        rect.top + menu_height >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
/** function add scroll listener to the sections and check if it's in the viewport, then add active class */
function activeSectionListener() {
    sections.forEach(element => {
        document.addEventListener("scroll", function() {
            setTimeout(function() { // shows menu on scrolling
                navbar_menu.hidden = false;
            }, 0);
            const active = isInViewport(element);
            let id = element.getAttribute("id");
            let link = document.querySelector(`#link-to-${id}`);
            if (active) {
                element.classList.add("active");
                link.classList.add("active");
            } else {
                element.classList.remove("active");
                link.classList.remove("active");
            }
            // hides menu in 5 sec after scrolling, in inactivity
            if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
                setTimeout(function() {
                    navbar_menu.hidden = true;
                }, 5000);
            } else {
                navbar_menu.hidden = false;
            }
        }, {
            passive: true
        });
    });
}

// function init

buildContentList();
buildNavigation();
activeSectionListener();
menuClickListener();