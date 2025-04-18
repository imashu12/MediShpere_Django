document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const inputs = document.querySelectorAll("input, textarea");

    form.addEventListener("submit", validateForm);
    
    // Add real-time validation
    inputs.forEach(input => {
        input.addEventListener("input", () => {
            validateField(input);
        });
    });
});

function validateForm(e) {
    e.preventDefault();
    let isValid = true;
    const fields = document.querySelectorAll("#contact-form [required]");

    fields.forEach(field => {
        if (!validateField(field)) isValid = false;
    });

    if (isValid) {
        showSuccessMessage();
    }
}

function validateField(field) {
    const errorElement = field.parentElement.querySelector(".error-message");
    errorElement.style.display = "none";

    if (field.id === "email" && !validateEmail(field.value)) {
        errorElement.textContent = "Please enter a valid email address";
        errorElement.style.display = "block";
        return false;
    }

    if (field.value.trim() === "") {
        errorElement.textContent = `This field is required`;
        errorElement.style.display = "block";
        return false;
    }

    return true;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function showSuccessMessage() {
    const form = document.getElementById("contact-form");
    const successModal = document.createElement("div");
    successModal.className = "success-modal";
    successModal.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent Successfully!</h3>
            <p>We'll get back to you within 24 hours</p>
        </div>
    `;
    
    document.body.appendChild(successModal);
    form.reset();

    setTimeout(() => {
        successModal.remove();
    }, 3000);
}