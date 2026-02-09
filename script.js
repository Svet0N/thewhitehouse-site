document.addEventListener("DOMContentLoaded", () => {
    // Mobile navigation
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.classList.toggle("no-scroll");
    });

    // Затваря менюто при избор на линк
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            document.body.classList.remove("no-scroll");
        });
    });

    // Floating chat widget
    const chatWidget = document.getElementById("chat-widget");
    const chatToggle = document.getElementById("chat-toggle");
    const chatClose = document.getElementById("chat-close");
    const chatPanel = document.getElementById("chat-panel");

    if (chatWidget && chatToggle && chatClose && chatPanel) {
        const setChatOpen = (isOpen) => {
            chatWidget.classList.toggle("open", isOpen);
            chatPanel.setAttribute("aria-hidden", (!isOpen).toString());
            chatToggle.setAttribute("aria-expanded", isOpen.toString());
        };

        chatToggle.addEventListener("click", () => {
            const isOpen = chatWidget.classList.contains("open");
            setChatOpen(!isOpen);
        });

        chatClose.addEventListener("click", () => setChatOpen(false));
    }

    // Gallery filters
    const filterButtons = document.querySelectorAll(".filter-btn");
    if (filterButtons.length) {
        filterButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                const category = button.getAttribute("data-category") || "all";
                window.filterGallery(category, event);
            });
        });
    }

    // Scroll reveal animations
    const revealTargets = document.querySelectorAll(
        ".amenity-card, .price-card, .booking-item, .gallery-card, .about-text, .about-image, .specs, .contact-info p, .dist-card, .location-lead, .map-container, .chat-panel"
    );

    if (revealTargets.length) {
        revealTargets.forEach((el, index) => {
            el.classList.add("reveal");
            el.style.transitionDelay = `${Math.min(index * 60, 360)}ms`;
        });

        const revealObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        revealTargets.forEach(el => revealObserver.observe(el));
    }

    // Scrollspy for same-page nav links
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const sectionIds = Array.from(navLinks)
        .map(link => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    if (navLinks.length && sectionIds.length) {
        const onScroll = () => {
            const offset = 140;
            const scrollPos = window.scrollY + offset;
            let activeSection = sectionIds[0];

            sectionIds.forEach(section => {
                if (section.offsetTop <= scrollPos) {
                    activeSection = section;
                }
            });

            navLinks.forEach(link => link.classList.remove("active-link"));
            const activeLink = document.querySelector(`.nav-links a[href="#${activeSection.id}"]`);
            if (activeLink) {
                activeLink.classList.add("active-link");
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
    }
});

// Gallery filtering helper
window.filterGallery = function (category, event) {
    const cards = document.querySelectorAll(".gallery-card");
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(btn => btn.classList.remove("active"));
    if (event && event.currentTarget) {
        event.currentTarget.classList.add("active");
    }

    cards.forEach(card => {
        if (category === "all" || card.classList.contains(category)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
};
