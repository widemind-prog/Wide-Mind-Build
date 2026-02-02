document.addEventListener("DOMContentLoaded", () => {
    // -----------------------------
    // LOGIN FORM SUBMISSION
    // -----------------------------
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",   // 🔥 ensures cookies/session are sent
                body: JSON.stringify({
                    email: loginForm.email.value,
                    password: loginForm.password.value
                })
            });

            const data = await res.json();

            if (res.ok && data.redirect) {
                window.location.href = data.redirect;
            } else {
                document.getElementById("login-msg").textContent =
                    data.error || "Login failed";
            }
        });
    }

document.addEventListener("DOMContentLoaded", () => {
    const pwdInput = document.getElementById("password");
    const toggleIcon = document.querySelector(".toggle-password-icon");

    toggleIcon.addEventListener("click", () => {
        if (pwdInput.type === "password") {
            pwdInput.type = "text";
            toggleIcon.classList.remove("fa-eye");
            toggleIcon.classList.add("fa-eye-slash");
        } else {
            pwdInput.type = "password";
            toggleIcon.classList.remove("fa-eye-slash");
            toggleIcon.classList.add("fa-eye");
        }
    });
});