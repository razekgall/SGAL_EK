async function cargarDatosSensores() {
    const res = await fetch('http://localhost:5500/api/sensor-readings/dashboard');
    const { humedad = [], radiacion = [], temperatura = [], lluvia = [] } = await res.json();

    const labels = humedad.length ? humedad.map(d => d.hora) : ["00","02","04","06","08","10","12","14","16","18","20","22"];

    const datasets = [];

    if (humedad.length) {
        datasets.push({
            label: "HUMEDAD",
            data: humedad.map(d => d.valor),
            fill: false,
            borderColor: "rgba(0, 51, 102, 1)",
            borderDash: [10, 5, 3, 5],
            tension: 0.3,
        });
    }
    if (temperatura.length) {
        datasets.push({
            label: "TEMPERATURA",
            data: temperatura.map(d => d.valor),
            fill: false,
            borderColor: "rgb(255, 255, 255)",
            borderWidth: 2.5,
            borderDash: [10, 5, 3, 5],
            tension: 0.3,
        });
    }
    if (radiacion.length) {
        datasets.push({
            label: "RADIACION",
            data: radiacion.map(d => d.valor),
            fill: false,
            borderColor: "rgba(0, 100, 0, 1)",
            borderDash: [10, 5, 3, 5],
            tension: 0.3,
        });
    }
    if (lluvia.length) {
        datasets.push({
            label: "LLUVIA",
            data: lluvia.map(d => d.valor),
            fill: false,
            borderColor: "#051367",
            borderWidth: 2.5,
            borderDash: [10, 5, 3, 5],
            tension: 0.3,
        });
    }

    const ctx = document.getElementById("Sensors_24/7").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: { labels, datasets },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                    labels: {
                        color: 'white',
                        font: { size: 12, weight: 'bold' },
                        usePointStyle: true,
                        pointStyle: 'line'
                    }
                },
            },
            scales: {
                x: { ticks: { color: 'white' }, grid: { color: 'rgba(255, 255, 255, 0.6)' } },
                y: { ticks: { color: 'white' }, grid: { color: 'rgba(255, 255, 255, 0.6)' }, suggestedMin: 0, suggestedMax: 100 }
            },
            elements: { point: { radius: 0 } }
        },
    });
}

document.addEventListener('DOMContentLoaded', cargarDatosSensores);