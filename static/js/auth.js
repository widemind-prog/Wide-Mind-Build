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

    // -----------------------------
    // SHOW / HIDE PASSWORD
    // -----------------------------
    const togglePasswordIcons = document.querySelectorAll(".toggle-password");

    togglePasswordIcons.forEach(icon => {
        const input = icon.previousElementSibling; // assumes <img> comes right after input

        icon.addEventListener("click", () => {
            if (input.type === "password") {
                input.type = "text";
            } else {
                input.type = "password";
            }
        });

        // Optional: swap PNG for "open/closed" eye variant
        // Example:
        // icon.addEventListener("click", () => {
        //     input.type = input.type === "password" ? "text" : "password";
        //     icon.src = input.type === "password" ? "/static/images/eye-skeleton.png" : "/static/images/eye-open.png";
        // });
    });
});