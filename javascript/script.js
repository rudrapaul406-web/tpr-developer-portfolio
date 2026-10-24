
/* =========================================
   PROJECT 01 — PERSONAL PORTFOLIO
   SCRIPT.JS
========================================= */


/* =========================================
   1. SELECT ELEMENTS
========================================= */

const menuBtn = document.getElementById("menuBtn");
const navbar = document.getElementById("navbar");

const themeBtn = document.getElementById("themeBtn");

const typingText = document.getElementById("typingText");

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

const backToTop = document.getElementById("backToTop");

const currentYear = document.getElementById("currentYear");

const navLinks = document.querySelectorAll(".nav-link");

const sections = document.querySelectorAll("section");


/* =========================================
   2. MOBILE MENU
========================================= */

menuBtn.addEventListener("click", () => {

    navbar.classList.toggle("open");

    const icon = menuBtn.querySelector("i");

    if (navbar.classList.contains("open")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* =========================================
   3. CLOSE MOBILE MENU
========================================= */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navbar.classList.remove("open");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================================
   4. DARK / LIGHT MODE
========================================= */

themeBtn.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const icon = themeBtn.querySelector("i");

    if (document.body.classList.contains("light-mode")) {

        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");

        localStorage.setItem("theme", "light");

    } else {

        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        localStorage.setItem("theme", "dark");

    }

});


/* =========================================
   5. LOAD SAVED THEME
========================================= */

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light-mode");

    const icon = themeBtn.querySelector("i");

    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");

}


/* =========================================
   6. TYPING EFFECT
========================================= */

const words = [
    "Web Developer",
    "Full Stack Developer",
    "UI Designer",
    "Problem Solver"
];

let wordIndex = 0;
let characterIndex = 0;
let deleting = false;


function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex + 1
            );

        characterIndex++;

        if (characterIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(
                0,
                characterIndex - 1
            );

        characterIndex--;

        if (characterIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }

        }

    }

    const speed = deleting ? 60 : 100;

    setTimeout(typeEffect, speed);
}

typeEffect();


/* =========================================
   7. ACTIVE NAVIGATION
========================================= */

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;

        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.classList.add("active");

        }

    });

});


/* =========================================
   8. BACK TO TOP
========================================= */

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

});


backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


/* =========================================
   9. CONTACT FORM
========================================= */

contactForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const subject =
        document.getElementById("subject").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (
        name === "" ||
        email === "" ||
        subject === "" ||
        message === ""
    ) {

        formMessage.textContent =
            "Please fill in all fields.";

        formMessage.style.color = "#ff1744";

        return;

    }


    formMessage.textContent =
        `Thanks ${name}! Your message has been received.`;

    formMessage.style.color = "#4caf50";

    contactForm.reset();

});


/* =========================================
   10. ANIMATED STATISTICS
========================================= */

const counters =
    document.querySelectorAll(".stat-item h3");

let countersStarted = false;


function startCounters() {

    if (countersStarted) return;

    countersStarted = true;


    counters.forEach((counter) => {

        const target =
            Number(counter.getAttribute("data-target"));

        let count = 0;

        const increment =
            Math.ceil(target / 80);


        const updateCounter = () => {

            count += increment;

            if (count >= target) {

                counter.textContent =
                    target + "+";

                return;

            }

            counter.textContent = count;

            requestAnimationFrame(updateCounter);

        };


        updateCounter();

    });

}


/* =========================================
   11. DETECT COUNTER SECTION
========================================= */

window.addEventListener("scroll", () => {

    const statsSection =
        document.querySelector(".stats");

    if (!statsSection) return;

    const sectionTop =
        statsSection.getBoundingClientRect().top;

    const screenHeight =
        window.innerHeight;


    if (sectionTop < screenHeight - 100) {

        startCounters();

    }

});


/* =========================================
   12. CURRENT YEAR
========================================= */

currentYear.textContent =
    new Date().getFullYear();


/* =========================================
   13. SIMPLE PAGE LOAD EFFECT
========================================= */

window.addEventListener("load", () => {

    document.body.classList.add("page-loaded");

});


/* =========================================
   14. PREVENT EMPTY PROJECT LINKS
========================================= */

const emptyLinks =
    document.querySelectorAll('a[href="#"]');


emptyLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();

    });

});
