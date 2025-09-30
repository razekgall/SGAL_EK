document.addEventListener('DOMContentLoaded', function () {
    new Chart("chart_finanzas_uno", {
        type: "line",
        data: {
            labels: [
                "Ene", "Feb", "Mar", "Abr", "May", "Jun",
                "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"
            ],
            datasets: [
                {
                    label: "Inventario x inversión",
                    data: [18, 12, 14, 11, 14, 15, 16, 17, 17, 17, 18, 22],
                    backgroundColor: ["red"],
                },
            ],
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "GANANCIAS X PRODUCCIÓN",
                },
            },
            scales: {
                x: { grid: { color: "lightblue", lineWidth: 2 } },
                y: { grid: { color: "lightgreen", lineWidth: 2 } },
            },
        },
    });
});