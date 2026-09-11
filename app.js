// Инициализация элементов таймера - СТРОГО ПО ОДНОМУ РАЗУ
const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const msEl = document.getElementById('ms');

const weddingDate = new Date('September 12, 2026 15:00:00').getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        if(daysEl) daysEl.innerText = "00";
        if(hoursEl) hoursEl.innerText = "00";
        if(minutesEl) minutesEl.innerText = "00";
        if(secondsEl) secondsEl.innerText = "00";
        if(msEl) msEl.innerText = "00";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / (1000));
    const ms = Math.floor((distance % 1000) / 10);

    if(daysEl) daysEl.innerText = days < 10 ? '0' + days : days;
    if(hoursEl) hoursEl.innerText = hours < 10 ? '0' + hours : hours;
    if(minutesEl) minutesEl.innerText = minutes < 10 ? '0' + minutes : minutes;
    if(secondsEl) secondsEl.innerText = seconds < 10 ? '0' + seconds : seconds;
    if(msEl) msEl.innerText = ms < 10 ? '0' + ms : ms;
}

setInterval(updateCountdown, 10);

// Логика отправки формы Капсулы Времени
document.getElementById('capsule-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const name = document.getElementById('guest-name')?.value;
    const wish = document.getElementById('guest-wish')?.value;
    
    if(btn) {
        btn.innerText = "Запечатывается...";
        btn.disabled = true;
    }

    // Твой URL Google Скрипта (замени на реальный, если нужно)
    const scriptURL = 'YOUR_GOOGLE_SCRIPT_URL'; 

    fetch(scriptURL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, wish: wish, timestamp: new Date().toISOString() })
    })
    .then(() -> {
        if(btn) btn.innerText = "Успешно запечатано! ✨";
        document.getElementById('capsule-form').reset();
    })
    .catch(err => {
        console.error(err);
        if(btn) {
            btn.innerText = "Ошибка. Попробовать снова";
            btn.disabled = false;
        }
    });
});
