document.addEventListener('DOMContentLoaded', function () {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawCultivosChart);

    function drawCultivosChart() {
        fetch('http://localhost:5500/integrador/api/cultivos')
            .then(response => response.json())
            .then(dataFromDb => {
                const data = new google.visualization.DataTable();
                data.addColumn('string', 'name_crop');
                data.addColumn('number', 'Area en m²');

                dataFromDb.forEach(row => {
                    data.addRow([row.name_crop, parseFloat(row.size_m2) || 0]);
                });

                const options = {
                    title: "LISTADO GENERAL DE CULTIVOS POR ÁREA (m²)",
                    titleTextStyle: { color: "white" },
                    backgroundColor: "transparent",
                    hAxis: {
                        title: "Área (m²)",
                        textStyle: { color: "white" },
                        minValue: 0
                    },
                    vAxis: {
                        textStyle: { color: "white" }
                    },
                    legend: { position: "none" },
                    chartArea: { left: 50, top: 20, width: "100%", height: "100%" },
                };

                const chart = new google.visualization.BarChart(
                    document.getElementById("chart_lista_cultivos")
                );
                chart.draw(data, options);
            })
            .catch(error => {
                console.error('Error:', error);
                const data = google.visualization.arrayToDataTable([
                    ["Cultivo", "Metros cuadrados"],
                    ["Error al cargar datos", 1]
                ]);
                const chart = new google.visualization.BarChart(
                    document.getElementById("chart_lista_cultivos")
                );
                chart.draw(data, {
                    title: "LISTADO GENERAL DE CULTIVOS POR ÁREA (m²)",
                    backgroundColor: "transparent",
                    titleTextStyle: { color: "white" },
                    legend: { position: "none" },
                    hAxis: { textStyle: { color: "white" } },
                    vAxis: { textStyle: { color: "white" } },
                    chartArea: { left: 50, top: 20, width: "100%", height: "100%" },
                });
            });
    }
});