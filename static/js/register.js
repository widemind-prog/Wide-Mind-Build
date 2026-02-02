document.addEventListener("DOMContentLoaded", () => {
    // -----------------------------
    // REGISTER FORM SUBMISSION
    // -----------------------------
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", async (e) => {  
            e.preventDefault();  

            const res = await fetch("/register", {  
                method: "POST",  
                headers: { "Content-Type": "application/json" },  
                credentials: "same-origin",  
                body: JSON.stringify({  
                    name: registerForm.name.value,  
                    email: registerForm.email.value,  
                    password: registerForm.password.value,  
                    department: registerForm.department.value,  
                    level: registerForm.level.value  
                })  
            });  

            const data = await res.json();  
            const msgEl = document.getElementById("register-msg");  

            if (res.ok) {  
                msgEl.style.color = "green";  
                msgEl.textContent = "Registration successful! Redirecting...";  
                setTimeout(() => window.location.href = data.redirect, 1500);  
            } else {  
                msgEl.style.color = "red";  
                msgEl.textContent = data.error;  
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