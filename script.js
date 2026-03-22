// Load nav.html and initialize hamburger + footer links
fetch("nav.html")
    .then((res) => res.text())
    .then((html) => {
        // Create temp DOM
        const temp = document.createElement("div");
        temp.innerHTML = html;

        // Inject into nav
        const navContainer = document.getElementById("nav-container");
        if (navContainer) {
            navContainer.innerHTML = html;
            initHamburger(); // fire after load
        }

        // Inject only the links into the footer
        const footerContainer = document.getElementById("footer-links-container");
        const footerLinks = temp.querySelector("ul");
        if (footerContainer && footerLinks) {
            footerContainer.innerHTML = footerLinks.outerHTML;
        }
    })
    .catch((err) => console.error("NAV LOAD FAIL:", err));

// Auto update change date 2025-04-11
const lastModified = new Date(document.lastModified);
document.getElementById("lastModified").textContent = lastModified.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
});

// Hamburger logic
function initHamburger() {
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const overlay = document.getElementById("menu-overlay");

    if (!hamburger || !mobileMenu || !overlay) {
        console.warn("Missing hamburger or menu elements.");
        return;
    }

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("open");
        mobileMenu.classList.toggle("open");
        overlay.classList.toggle("open");
    });

    overlay.addEventListener("click", () => {
        hamburger.classList.remove("open");
        mobileMenu.classList.remove("open");
        overlay.classList.remove("open");
    });

    mobileMenu.querySelectorAll("a").forEach((link) =>
        link.addEventListener("click", () => {
            hamburger.classList.remove("open");
            mobileMenu.classList.remove("open");
            overlay.classList.remove("open");
        })
    );
}

// The rest of your scripts
document.addEventListener("DOMContentLoaded", function () {
    // FAQ Accordion
    function initAccordion() {
        document.querySelectorAll(".accordion").forEach((accordion) => {
            const panelId = accordion.getAttribute("aria-controls");
            const panel = document.getElementById(panelId);

            if (!panel) return;

            accordion.addEventListener("click", function () {
                const isOpen = this.getAttribute("aria-expanded") === "true";
                this.setAttribute("aria-expanded", !isOpen);
                this.classList.toggle("active");

                if (!isOpen) {
                    panel.style.transition = "none";
                    panel.style.maxHeight = "none";
                    panel.style.padding = "20px";
                    void panel.offsetHeight; // force reflow
                    panel.style.transition = "max-height 0.4s ease, padding 0.4s ease";
                    panel.style.maxHeight = panel.scrollHeight + "px";
                    panel.setAttribute("aria-hidden", "false");
                } else {
                    panel.style.maxHeight = null;
                    panel.style.padding = "0 20px";
                    panel.setAttribute("aria-hidden", "true");
                }
            });
        });
    }

    // Optional content toggle
    function initOptionalContent() {
        const optionalSection = document.getElementById("optional-content");
        if (optionalSection && optionalSection.innerHTML.trim() !== "") {
            optionalSection.style.display = "block";
        } else if (optionalSection) {
            optionalSection.style.display = "none";
        }
    }

    // Link tracking (non-CTA)
    function initLinkTracking() {
        document.querySelectorAll("a:not(.cta)").forEach(function (link) {
            link.addEventListener("click", function () {
                if (typeof gtag === "function") {
                    gtag("event", "click", {
                        event_category: "Link Click",
                        event_label: link.href,
                        transport_type: "beacon"
                    });
                }
            });
        });
    }

    // Fire it all up
    initAccordion();
    initOptionalContent();
    initLinkTracking();
});
