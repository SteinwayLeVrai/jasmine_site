let scrollPosition = 0;

const popup = document.getElementById("popup");
const button = document.getElementById("menuBtn");
const header = document.querySelector(".container");

function openMenu() {
    scrollPosition = window.scrollY;

    popup.classList.add("show");
    button.classList.add("active");
    header.classList.add("menu-open");

    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";

    button.setAttribute("aria-expanded", "true");
}

function closeMenu() {
    popup.classList.remove("show");
    button.classList.remove("active");
    header.classList.remove("menu-open");

    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";

    window.scrollTo(0, scrollPosition);

    button.setAttribute("aria-expanded", "false");
}

function togglePopup() {
    const isOpen = popup.classList.contains("show");

    if (isOpen) {
        closeMenu();
    } else {
        openMenu();
    }
}

/* Fermer le menu si resize écran */
window.addEventListener("resize", () => {
    if (popup.classList.contains("show")) {
        closeMenu();
    }
});


/* CONTACT FORM (Formspree AJAX) */

const form = document.getElementById("contact-form");
const submitBtn = document.getElementById("submit-btn");

if (form && submitBtn) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                submitBtn.textContent = "Message sent ✓";
                form.reset();

                setTimeout(() => {
                    submitBtn.textContent = "Send Message";
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                submitBtn.textContent = "Error, try again";

                setTimeout(() => {
                    submitBtn.textContent = "Send Message";
                    submitBtn.disabled = false;
                }, 2000);
            }

        } catch (error) {
            submitBtn.textContent = "Error, try again";

            setTimeout(() => {
                submitBtn.textContent = "Send Message";
                submitBtn.disabled = false;
            }, 2000);
        }
    });
}


/* IMAGE PROTECTION (basic) */

document.addEventListener("dragstart", (e) => {
    if (e.target.tagName === "IMG") {
        e.preventDefault();
    }
});

document.addEventListener("contextmenu", (e) => {
    if (e.target.tagName === "IMG") {
        e.preventDefault();
    }
});