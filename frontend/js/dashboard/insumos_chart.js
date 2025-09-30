document.addEventListener('DOMContentLoaded', function () {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawInsumosChart);

    function drawInsumosChart() {
        fetch('http://localhost:5500/integrador/api/insumos')
            .then(response => response.json())
            .then(dataFromDb => {
                const data = new google.visualization.DataTable();
                data.addColumn('string', 'Semilla');
                data.addColumn('number', 'Cantidad');

                dataFromDb.forEach(row => {
                    data.addRow([row.name_consumables, parseInt(row.quantity_consumables) || 0]);
                });

                const options = {
                    title: "LISTADO GENERAL DE INSUMOS",
                    titleTextStyle: { color: "white" },
                    backgroundColor: "transparent",
                    hAxis: { textStyle: { color: "white" } },
                    vAxis: { textStyle: { color: "white" } },
                    legend: { position: "none" },
                    chartArea: { left: 50, top: 20, width: "100%", height: "80%" },
                };

                const chart = new google.visualization.BarChart(
                    document.getElementById("chart_lista_insumos")
                );
                chart.draw(data, options);
            })
            .catch(error => {
                console.error('Error:', error);
                const data = google.visualization.arrayToDataTable([
                    ["Semilla", "Cantidad"],
                    ["Error al cargar datos", 1]
                ]);
                const chart = new google.visualization.BarChart(
                    document.getElementById("chart_lista_insumos")
                );
                chart.draw(data, {
                    title: "LISTADO GENERAL DE INSUMOS",
                    backgroundColor: "transparent",
                    titleTextStyle: { color: "white" },
                    legend: { position: "none" },
                    hAxis: { textStyle: { color: "white" } },
                    vAxis: { textStyle: { color: "white" } },
                    chartArea: { left: 50, top: 20, width: "100%", height: "80%" },
                });
            });
    }
});