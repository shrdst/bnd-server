const sliders = document.querySelectorAll('.pixel-slider');
const scoreNum = document.getElementById('score-num');

// Simula l'ottenimento dell'AQI basato sulla posizione
function updateAQI() {
    navigator.geolocation.getCurrentPosition((pos) => {
        const mockAQI = Math.floor(Math.random() * (60 - 20) + 20);
        document.getElementById('aqi-num').innerText = mockAQI;
    }, () => {
        document.getElementById('aqi-num').innerText = "32";
    });
}

function updateScore() {
    const vals = {
        diet: parseInt(document.getElementById('diet').value),
        energy: parseInt(document.getElementById('energy').value),
        km: parseInt(document.getElementById('km').value),
        flights: parseInt(document.getElementById('flights').value),
        cons: parseInt(document.getElementById('consumption').value)
    };

    // Calcolo Punteggio (0-100)
    const d = (vals.diet - 1) * 50; 
    const e = 100 - vals.energy; 
    const k = (vals.km / 500) * 100;
    const f = (vals.flights / 10) * 100;
    const c = (vals.cons / 10) * 100;
    const total = Math.round((d + e + k + f + c) / 5);

    // Aggiornamento interfaccia della Popup
    if (scoreNum) {
        scoreNum.innerText = total;
        scoreNum.style.color = total > 80 ? "#ff0055" : (total > 40 ? "#ffcc00" : "#00ff66");
    }

    document.getElementById('km-display').innerText = `${vals.km} KMS`;
}

// Event Listeners
sliders.forEach(slider => slider.addEventListener('input', updateScore));

document.addEventListener('DOMContentLoaded', () => {
    updateAQI();
    updateScore();
});