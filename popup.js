const sliders = document.querySelectorAll('.pixel-slider');
const scoreNum = document.getElementById('score-num');

// Funzione AQI corretta per il Web
function updateAQI() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((pos) => {
            const mockAQI = Math.floor(Math.random() * (60 - 20) + 20);
            const aqiEl = document.getElementById('aqi-num');
            if(aqiEl) aqiEl.innerText = mockAQI;
        }, () => {
            console.warn("Accesso posizione negato.");
        });
    }
}

function updateScore() {
    // Verifichiamo che gli elementi esistano prima di leggere i valori
    const getVal = (id) => {
        const el = document.getElementById(id);
        return el ? parseInt(el.value) : 0;
    };

    const vals = {
        diet: getVal('diet'),
        energy: getVal('energy'),
        km: getVal('km'),
        flights: getVal('flights'),
        cons: getVal('consumption')
    };

    // Logica di calcolo
    const d = (vals.diet - 1) * 50; 
    const e = 100 - vals.energy; 
    const k = (vals.km / 500) * 100;
    const f = (vals.flights / 10) * 100;
    const c = (vals.cons / 10) * 100;
    const total = Math.round((d + e + k + f + c) / 5);

    // Aggiornamento interfaccia
    if (scoreNum) {
        scoreNum.innerText = total;
        scoreNum.style.color = total > 80 ? "#ff0055" : (total > 40 ? "#ffcc00" : "#00ff66");
    }

    // Aggiorna Km e Miglia (per coerenza con l'HTML)
    const kmDisplay = document.getElementById('km-display');
    const miDisplay = document.getElementById('mi-display');
    if (kmDisplay) kmDisplay.innerText = `${vals.km} KMS`;
    if (miDisplay) miDisplay.innerText = `${Math.round(vals.km * 0.621)} MIGLIA`;
}

// Inizializzazione
sliders.forEach(slider => slider.addEventListener('input', updateScore));

document.addEventListener('DOMContentLoaded', () => {
    updateAQI();
    updateScore();
});
