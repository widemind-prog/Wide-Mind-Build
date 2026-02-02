document.addEventListener("DOMContentLoaded", () => {

    const toast = document.getElementById("admin-toast");

    function showToast(message, isError = false) {
        if (!toast) return;

        toast.textContent = message;
        toast.style.background = isError ? "#a00000" : "#333";
        toast.classList.add("show");

        setTimeout(() => {
            toast.classList.remove("show");
        }, 3000);
    }

    document.querySelectorAll(".mark-read-btn").forEach(btn => {
        btn.addEventListener("click", async () => {

            const msgId = btn.dataset.id;

            try {
                const res = await fetch(`/admin/messages/read/${msgId}`, {
                    method: "POST",
                    credentials: "same-origin"
                });

                if (!res.ok) {
                    const text = await res.text();
                    showToast(text || "Failed to mark message as read", true);
                    return;
                }

                showToast("Message marked as read");

                // ✅ Update UI
                const box = btn.closest(".message-box");
                if (box) {
                    box.classList.remove("unread");
                    box.classList.add("read");
                    btn.remove();
                }

                // Optional: decrement unread badge
                const badge = document.querySelector("#messages-badge");
                if (badge) {
                    let count = parseInt(badge.textContent) || 0;
                    count = Math.max(count - 1, 0);
                    badge.textContent = count;
                    if (count === 0) badge.style.display = "none";
                }

            } catch (err) {
                console.error(err);
                showToast("Server error", true);
            }
        });
    });

});