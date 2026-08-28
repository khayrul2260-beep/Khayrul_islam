/* =========================================================
   MD. KHAYRUL ISLAM
   PREMIUM PERSONAL PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

"use strict";


/* =========================================================
   01. PRELOADER
   IMPORTANT:
   This runs independently so the website
   never remains stuck on the loading screen.
========================================================= */

(function () {

    function hidePreloader() {

        const preloader =
            document.querySelector(".preloader");

        document.body.classList.add("loaded");

        if (!preloader) {
            return;
        }

        preloader.classList.add("loaded");

        /* Extra safety */
        setTimeout(function () {

            preloader.style.opacity = "0";
            preloader.style.visibility = "hidden";
            preloader.style.pointerEvents = "none";

        }, 700);

    }


    /* When everything is loaded */
    window.addEventListener(
        "load",
        function () {

            hidePreloader();

        }
    );


    /* Fail-safe:
       Never allow preloader to stay forever.
    */

    setTimeout(
        function () {

            hidePreloader();

        },
        2500
    );

})();


/* =========================================================
   02. DOM READY
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* =================================================
           ELEMENTS
        ================================================= */

        const body =
            document.body;

        const header =
            document.querySelector(
                ".site-header"
            );

        const menuToggle =
            document.querySelector(
                ".menu-toggle"
            );

        const navMenu =
            document.querySelector(
                ".nav-menu"
            );

        const navLinks =
            document.querySelectorAll(
                ".nav-link"
            );

        const sections =
            document.querySelectorAll(
                "section[id]"
            );

        const backToTop =
            document.querySelector(
                ".back-to-top"
            );

        const progressBar =
            document.querySelector(
                ".scroll-progress"
            );

        const currentYear =
            document.querySelector(
                "#current-year"
            );


        /* =================================================
           REDUCED MOTION
        ================================================= */

        const reducedMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;


        /* =================================================
           03. MOBILE MENU
        ================================================= */

        function openMenu() {

            if (!navMenu) {
                return;
            }

            navMenu.classList.add(
                "open"
            );

            if (menuToggle) {

                menuToggle.classList.add(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

            body.classList.add(
                "menu-open"
            );

        }


        function closeMenu() {

            if (!navMenu) {
                return;
            }

            navMenu.classList.remove(
                "open"
            );

            if (menuToggle) {

                menuToggle.classList.remove(
                    "active"
                );

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

            body.classList.remove(
                "menu-open"
            );

        }


        if (menuToggle) {

            menuToggle.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();

                    if (
                        navMenu &&
                        navMenu.classList.contains(
                            "open"
                        )
                    ) {

                        closeMenu();

                    } else {

                        openMenu();

                    }

                }
            );

        }


        /* Close after clicking navigation */

        navLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        closeMenu();

                    }
                );

            }
        );


        /* Close when clicking outside */

        document.addEventListener(
            "click",
            function (event) {

                if (
                    !navMenu ||
                    !menuToggle
                ) {
                    return;
                }

                const insideMenu =
                    navMenu.contains(
                        event.target
                    );

                const insideButton =
                    menuToggle.contains(
                        event.target
                    );

                if (
                    !insideMenu &&
                    !insideButton
                ) {

                    closeMenu();

                }

            }
        );


        /* ESC closes menu */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Escape"
                ) {

                    closeMenu();

                }

            }
        );


        /* =================================================
           04. NAVBAR SCROLL EFFECT
        ================================================= */

        function updateNavbar() {

            if (!header) {
                return;
            }

            if (
                window.scrollY > 40
            ) {

                header.classList.add(
                    "scrolled"
                );

            } else {

                header.classList.remove(
                    "scrolled"
                );

            }

        }


        /* =================================================
           05. SCROLL PROGRESS
        ================================================= */

        function updateProgress() {

            if (!progressBar) {
                return;
            }

            const scrollTop =
                window.scrollY;

            const pageHeight =
                document.documentElement
                    .scrollHeight -
                window.innerHeight;

            if (
                pageHeight <= 0
            ) {
                return;
            }

            const percentage =
                (
                    scrollTop /
                    pageHeight
                ) * 100;

            progressBar.style.width =
                percentage + "%";

        }


        /* =================================================
           06. BACK TO TOP
        ================================================= */

        function updateBackToTop() {

            if (!backToTop) {
                return;
            }

            if (
                window.scrollY > 500
            ) {

                backToTop.classList.add(
                    "show"
                );

            } else {

                backToTop.classList.remove(
                    "show"
                );

            }

        }


        if (backToTop) {

            backToTop.addEventListener(
                "click",
                function () {

                    window.scrollTo({

                        top: 0,

                        behavior:
                            reducedMotion
                                ? "auto"
                                : "smooth"

                    });

                }
            );

        }


        /* =================================================
           07. SMOOTH SCROLL
        ================================================= */

        const anchorLinks =
            document.querySelectorAll(
                'a[href^="#"]'
            );


        anchorLinks.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const targetID =
                            link.getAttribute(
                                "href"
                            );

                        if (
                            !targetID ||
                            targetID === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetID
                            );


                        if (!target) {
                            return;
                        }


                        event.preventDefault();


                        const headerHeight =
                            header
                                ? header.offsetHeight
                                : 0;


                        const position =
                            target.getBoundingClientRect()
                                .top +
                            window.scrollY -
                            headerHeight -
                            15;


                        window.scrollTo({

                            top: position,

                            behavior:
                                reducedMotion
                                    ? "auto"
                                    : "smooth"

                        });

                    }
                );

            }
        );


        /* =================================================
           08. ACTIVE NAVIGATION
        ================================================= */

        function updateActiveNav() {

            if (
                !sections.length ||
                !navLinks.length
            ) {

                return;

            }


            let current =
                "";


            const scrollPosition =
                window.scrollY +
                window.innerHeight * 0.35;


            sections.forEach(
                function (section) {

                    const top =
                        section.offsetTop;

                    const bottom =
                        top +
                        section.offsetHeight;


                    if (
                        scrollPosition >= top &&
                        scrollPosition < bottom
                    ) {

                        current =
                            section.id;

                    }

                }
            );


            navLinks.forEach(
                function (link) {

                    link.classList.remove(
                        "active"
                    );


                    const href =
                        link.getAttribute(
                            "href"
                        );


                    if (
                        href ===
                        "#" + current
                    ) {

                        link.classList.add(
                            "active"
                        );

                    }

                }
            );

        }


        /* =================================================
           09. SCROLL REVEAL
        ================================================= */

        const revealElements =
            document.querySelectorAll(
                ".reveal, " +
                ".fade-up, " +
                ".fade-in, " +
                ".slide-up, " +
                ".project-card, " +
                ".journey-item, " +
                ".timeline-item, " +
                ".tech-item"
            );


        if (
            revealElements.length
        ) {

            if (
                "IntersectionObserver"
                in window &&
                !reducedMotion
            ) {

                const revealObserver =
                    new IntersectionObserver(
                        function (
                            entries,
                            observer
                        ) {

                            entries.forEach(
                                function (
                                    entry
                                ) {

                                    if (
                                        entry.isIntersecting
                                    ) {

                                        entry.target
                                            .classList
                                            .add(
                                                "revealed"
                                            );


                                        observer.unobserve(
                                            entry.target
                                        );

                                    }

                                }
                            );

                        },
                        {
                            threshold: 0.12,

                            rootMargin:
                                "0px 0px -50px 0px"
                        }
                    );


                revealElements.forEach(
                    function (element) {

                        revealObserver.observe(
                            element
                        );

                    }
                );

            } else {

                revealElements.forEach(
                    function (element) {

                        element.classList.add(
                            "revealed"
                        );

                    }
                );

            }

        }


        /* =================================================
           10. STAGGERED ANIMATION
        ================================================= */

        const staggerContainers =
            document.querySelectorAll(
                ".tech-list, " +
                ".projects-grid, " +
                ".journey-flow, " +
                ".about-stats, " +
                ".business-features"
            );


        staggerContainers.forEach(
            function (container) {

                Array.from(
                    container.children
                ).forEach(
                    function (
                        child,
                        index
                    ) {

                        child.style.setProperty(
                            "--delay",
                            index * 80 + "ms"
                        );

                    }
                );

            }
        );


        /* =================================================
           11. COUNTERS
        ================================================= */

        const counters =
            document.querySelectorAll(
                "[data-counter]"
            );


        function animateCounter(
            element
        ) {

            const target =
                parseFloat(
                    element.dataset.counter
                );


            if (
                Number.isNaN(target)
            ) {

                return;

            }


            const duration =
                1500;


            const start =
                performance.now();


            const prefix =
                element.dataset.prefix ||
                "";


            const suffix =
                element.dataset.suffix ||
                "";


            function update(
                currentTime
            ) {

                const elapsed =
                    currentTime -
                    start;


                const progress =
                    Math.min(
                        elapsed /
                        duration,
                        1
                    );


                /* Smooth ease-out */

                const eased =
                    1 -
                    Math.pow(
                        1 - progress,
                        3
                    );


                const value =
                    target * eased;


                if (
                    Number.isInteger(
                        target
                    )
                ) {

                    element.textContent =
                        prefix +
                        Math.floor(
                            value
                        ) +
                        suffix;

                } else {

                    element.textContent =
                        prefix +
                        value.toFixed(1) +
                        suffix;

                }


                if (
                    progress < 1
                ) {

                    requestAnimationFrame(
                        update
                    );

                }

            }


            requestAnimationFrame(
                update
            );

        }


        if (
            counters.length
        ) {

            if (
                "IntersectionObserver"
                in window
            ) {

                const counterObserver =
                    new IntersectionObserver(
                        function (
                            entries,
                            observer
                        ) {

                            entries.forEach(
                                function (
                                    entry
                                ) {

                                    if (
                                        entry.isIntersecting
                                    ) {

                                        animateCounter(
                                            entry.target
                                        );


                                        observer.unobserve(
                                            entry.target
                                        );

                                    }

                                }
                            );

                        },
                        {
                            threshold: 0.5
                        }
                    );


                counters.forEach(
                    function (counter) {

                        counterObserver.observe(
                            counter
                        );

                    }
                );

            } else {

                counters.forEach(
                    function (counter) {

                        animateCounter(
                            counter
                        );

                    }
                );

            }

        }


        /* =================================================
           12. TYPING EFFECT
        ================================================= */

        const typingElements =
            document.querySelectorAll(
                "[data-typing]"
            );


        function startTyping(
            element
        ) {

            const text =
                element.dataset.typing;


            if (!text) {
                return;
            }


            if (
                reducedMotion
            ) {

                element.textContent =
                    text;

                return;

            }


            const speed =
                parseInt(
                    element.dataset.speed ||
                    "65",
                    10
                );


            element.textContent =
                "";


            let index =
                0;


            function type() {

                if (
                    index <
                    text.length
                ) {

                    element.textContent +=
                        text.charAt(
                            index
                        );


                    index++;


                    setTimeout(
                        type,
                        speed
                    );

                }

            }


            type();

        }


        if (
            typingElements.length
        ) {

            if (
                "IntersectionObserver"
                in window
            ) {

                const typingObserver =
                    new IntersectionObserver(
                        function (
                            entries,
                            observer
                        ) {

                            entries.forEach(
                                function (
                                    entry
                                ) {

                                    if (
                                        entry.isIntersecting
                                    ) {

                                        startTyping(
                                            entry.target
                                        );


                                        observer.unobserve(
                                            entry.target
                                        );

                                    }

                                }
                            );

                        },
                        {
                            threshold: 0.5
                        }
                    );


                typingElements.forEach(
                    function (element) {

                        typingObserver.observe(
                            element
                        );

                    }
                );

            } else {

                typingElements.forEach(
                    function (element) {

                        startTyping(
                            element
                        );

                    }
                );

            }

        }


        /* =================================================
           13. IMAGE LOADING
        ================================================= */

        const images =
            document.querySelectorAll(
                "img"
            );


        images.forEach(
            function (image) {

                image.addEventListener(
                    "load",
                    function () {

                        image.classList.add(
                            "loaded"
                        );

                    },
                    {
                        once: true
                    }
                );


                image.addEventListener(
                    "error",
                    function () {

                        image.classList.add(
                            "image-error"
                        );

                    },
                    {
                        once: true
                    }
                );

            }
        );


        /* =================================================
           14. PARALLAX
        ================================================= */

        const parallaxElements =
            document.querySelectorAll(
                "[data-parallax]"
            );


        if (
            parallaxElements.length &&
            !reducedMotion
        ) {

            let mouseX = 0;
            let mouseY = 0;

            let currentX = 0;
            let currentY = 0;


            window.addEventListener(
                "mousemove",
                function (event) {

                    mouseX =
                        (
                            event.clientX /
                            window.innerWidth -
                            0.5
                        ) * 2;


                    mouseY =
                        (
                            event.clientY /
                            window.innerHeight -
                            0.5
                        ) * 2;

                },
                {
                    passive: true
                }
            );


            function animateParallax() {

                currentX +=
                    (
                        mouseX -
                        currentX
                    ) * 0.05;


                currentY +=
                    (
                        mouseY -
                        currentY
                    ) * 0.05;


                parallaxElements.forEach(
                    function (element) {

                        const strength =
                            parseFloat(
                                element.dataset
                                    .parallax ||
                                "8"
                            );


                        const x =
                            currentX *
                            strength;


                        const y =
                            currentY *
                            strength;


                        element.style.transform =
                            `translate3d(
                                ${x}px,
                                ${y}px,
                                0
                            )`;

                    }
                );


                requestAnimationFrame(
                    animateParallax
                );

            }


            requestAnimationFrame(
                animateParallax
            );

        }


        /* =================================================
           15. CARD TILT
        ================================================= */

        const tiltCards =
            document.querySelectorAll(
                "[data-tilt]"
            );


        if (
            tiltCards.length &&
            !reducedMotion
        ) {

            tiltCards.forEach(
                function (card) {

                    card.addEventListener(
                        "mousemove",
                        function (event) {

                            const rect =
                                card.getBoundingClientRect();


                            const x =
                                event.clientX -
                                rect.left;


                            const y =
                                event.clientY -
                                rect.top;


                            const centerX =
                                rect.width / 2;


                            const centerY =
                                rect.height / 2;


                            const rotateX =
                                (
                                    y -
                                    centerY
                                ) /
                                centerY *
                                -3;


                            const rotateY =
                                (
                                    x -
                                    centerX
                                ) /
                                centerX *
                                3;


                            card.style.transform =
                                `perspective(900px)
                                 rotateX(${rotateX}deg)
                                 rotateY(${rotateY}deg)
                                 translateY(-3px)`;

                        }
                    );


                    card.addEventListener(
                        "mouseleave",
                        function () {

                            card.style.transform =
                                "";

                        }
                    );

                }
            );

        }


        /* =================================================
           16. MAGNETIC BUTTON
        ================================================= */

        const magneticButtons =
            document.querySelectorAll(
                "[data-magnetic]"
            );


        if (
            magneticButtons.length &&
            !reducedMotion
        ) {

            magneticButtons.forEach(
                function (button) {

                    button.addEventListener(
                        "mousemove",
                        function (event) {

                            const rect =
                                button.getBoundingClientRect();


                            const x =
                                event.clientX -
                                rect.left -
                                rect.width / 2;


                            const y =
                                event.clientY -
                                rect.top -
                                rect.height / 2;


                            button.style.transform =
                                `translate(
                                    ${x * 0.10}px,
                                    ${y * 0.10}px
                                )`;

                        }
                    );


                    button.addEventListener(
                        "mouseleave",
                        function () {

                            button.style.transform =
                                "";

                        }
                    );

                }
            );

        }


        /* =================================================
           17. CURRENT YEAR
        ================================================= */

        if (
            currentYear
        ) {

            currentYear.textContent =
                new Date()
                    .getFullYear();

        }


        /* =================================================
           18. SCROLL HANDLER
        ================================================= */

        let scrollTicking =
            false;


        function handleScroll() {

            if (
                scrollTicking
            ) {

                return;

            }


            window.requestAnimationFrame(
                function () {

                    updateNavbar();

                    updateProgress();

                    updateBackToTop();

                    updateActiveNav();


                    scrollTicking =
                        false;

                }
            );


            scrollTicking =
                true;

        }


        window.addEventListener(
            "scroll",
            handleScroll,
            {
                passive: true
            }
        );


        /* =================================================
           19. INITIAL STATE
        ================================================= */

        updateNavbar();

        updateProgress();

        updateBackToTop();

        updateActiveNav();


        /* =================================================
           20. RESIZE
        ================================================= */

        let resizeTimer;


        window.addEventListener(
            "resize",
            function () {

                clearTimeout(
                    resizeTimer
                );


                resizeTimer =
                    setTimeout(
                        function () {

                            if (
                                window.innerWidth >
                                800
                            ) {

                                closeMenu();

                            }


                            updateActiveNav();

                        },
                        150
                    );

            }
        );


        /* =================================================
           21. PAGE LOADED
        ================================================= */

        window.addEventListener(
            "load",
            function () {

                body.classList.add(
                    "page-ready"
                );

                document.documentElement
                    .classList.add(
                        "page-ready"
                    );

            }
        );


        /* =================================================
           22. DISABLE EMPTY HASH LINKS
        ================================================= */

        document
            .querySelectorAll(
                'a[href="#"]'
            )
            .forEach(
                function (link) {

                    link.addEventListener(
                        "click",
                        function (event) {

                            event.preventDefault();

                        }
                    );

                }
            );


        /* =================================================
           23. KEYBOARD ACCESSIBILITY
        ================================================= */

        if (menuToggle) {

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

        }


        /* =================================================
           24. DEBUG
        ================================================= */

        console.log(
            "MD. KHAYRUL ISLAM — Portfolio Loaded"
        );


    }
);