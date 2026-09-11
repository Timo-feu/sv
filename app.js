const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('second');
const msEl = document.getElementById('millisecond');

const targetTime = Date.parse("2026-09-12T12:00:00+02:00");

function updateTimer() {
    const now = Date.now();
    const diff = targetTime - now;

    if (diff <= 0) {
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    const ms = Math.floor((diff % (1000)));

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
    msEl.textContent = String(ms).padStart(3, '0');

    requestAnimationFrame(updateTimer);
};

requestAnimationFrame(updateTimer);


const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxTjFGzz03s-EavbeML4V_sKoTenSoC8Mvis1L7KYb9yaD3WisghqlpHfyxR7V4hWXR/exec";

document.getElementById("capsule-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const submitBtn = document.getElementById("submit-btn");
    submitBtn.disabled = true;
    submitBtn.innerText = "Запечатывание...";

    const formData = {
        name: document.getElementById("guest-name").value.trim(),
        wish: document.getElementById("guest-wish").value.trim()
    };

    fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
    })
    .then(() => {
        alert("Прекрасно! Ваше послание запечатано в облачную капсулу времени.");
        document.getElementById("capsule-form").reset();
    })
    .catch(error => {
        console.error("Ошибка:", error);
        alert("Ошибка сети. Попробуйте еще раз.");
    })
    .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerText = "Запечатать в будущее";
    });
});
