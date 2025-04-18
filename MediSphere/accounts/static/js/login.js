document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("loginModal");
    const openBtn = document.getElementById("openLoginBtn");
    const closeBtn = document.querySelector(".close");

    // Modal Handling
    const toggleModal = (show) => {
        modal.style.display = show ? "block" : "none";
        document.body.style.overflow = show ? "hidden" : "auto";
    };

    openBtn.addEventListener("click", () => toggleModal(true));
    closeBtn.addEventListener("click", () => toggleModal(false));
    window.addEventListener("click", (e) => e.target === modal && toggleModal(false));

    // Real-time Validation
    const emailField = document.getElementById("email");
    const passwordField = document.getElementById("password");

    [emailField, passwordField].forEach(field => {
        field.addEventListener("input", () => validateField(field));
    });

    // Form Submission
    document.getElementById("loginForm").addEventListener("submit", e => {
        e.preventDefault();
        if (validateForm()) {
            showSuccess();
            toggleModal(false);
        }
    });
});

function validateField(field) {
    const errorElement = field.parentElement.nextElementSibling;
    errorElement.style.display = "none";

    if (field.id === "email") {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
        if (!isValid) errorElement.textContent = "Invalid email format";
        return isValid;
    }

    if (field.id === "password") {
        const isValid = field.value.length >= 6;
        if (!isValid) errorElement.textContent = "Password must be at least 6 characters";
        return isValid;
    }

    return true;
}

function validateForm() {
    let isValid = true;
    [email, password].forEach(field => {
        if (!validateField(field)) isValid = false;
    });
    return isValid;
}

function showSuccess() {
    const successToast = document.createElement("div");
    successToast.className = "success-toast";
    successToast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <p>Login Successful!</p>
    `;
    document.body.appendChild(successToast);
    
    setTimeout(() => {
        successToast.remove();
        document.getElementById("loginForm").reset();
    }, 2000);
}

// Password Visibility Toggle (Bonus Feature)
function togglePassword() {
    const passwordField = document.getElementById("password");
    const eyeIcon = document.querySelector(".password-toggle i");
    
    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        passwordField.type = "password";
        eyeIcon.classList.replace("fa-eye-slash", "fa-eye");
    }
}