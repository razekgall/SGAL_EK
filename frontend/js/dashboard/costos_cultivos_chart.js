document.addEventListener('DOMContentLoaded', function () {
    fetch("http://localhost:5500/integrador/api/costos-cultivos")
      .then((res) => res.json())
      .then((dataFromDb) => {
        const labels = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
        
        const cultivosSet = new Set();
        const dataPorCultivo = {};

        // Agrupar datos
        dataFromDb.forEach((item) => {
          const mes = parseInt(item.mes) - 1;
          const cultivo = item.cultivo;
          const valor = item.costo_total;

          cultivosSet.add(cultivo);

          if (!dataPorCultivo[cultivo]) {
            dataPorCultivo[cultivo] = Array(12).fill(0);
          }
          dataPorCultivo[cultivo][mes] += valor;
        });

        const colores = [
          "rgba(0, 51, 102, 1)", "rgba(25, 25, 112, 1)",
          "rgba(0, 100, 0, 1)", "rgba(100, 0, 0, 1)",
          "rgba(255, 165, 0, 1)", "rgba(128, 0, 128, 1)"
        ];

        const datasets = Array.from(cultivosSet).map((cultivo, index) => ({
          label: cultivo,
          data: dataPorCultivo[cultivo],
          borderColor: colores[index % colores.length],
          backgroundColor: colores[index % colores.length],
          borderDash: [5, 2],
          tension: 0.3
        }));

        // TOTAL por mes
        const totalData = Array(12).fill(0);
        datasets.forEach(ds => {
          ds.data.forEach((val, idx) => totalData[idx] += val);
        });

        datasets.push({
          label: "TOTAL",
          data: totalData,
          borderColor: "rgba(0, 0, 0, 0.7)",
          backgroundColor: "rgba(0, 0, 0, 0.2)",
          borderWidth: 3,
          tension: 0.3,
        });

        // PRESUPUESTO (ejemplo)
        datasets.push({
          label: "PRESUPUESTO",
          data: Array(12).fill(600000),
          borderColor: "rgba(0, 0, 0, 0.7)",
          backgroundColor: "rgba(0, 0, 0, 1)",
          borderWidth: 3,
          borderDash: [5, 2],
          tension: 0.3,
        });

        new Chart(document.getElementById("Costo_General_Cultivos").getContext("2d"), {
          type: "line",
          data: {
            labels: labels,
            datasets: datasets
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: "Cultivos por Costo Mensual",
                color: 'white',
                font: { size: 16 }
              },
              legend: {
                labels: {
                  color: 'white',
                  font: { size: 14 }
                }
              }
            },
            scales: {
              x: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.7)' }
              },
              y: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255, 255, 255, 0.7)' },
                suggestedMin: 0
              }
            },
            elements: {
              line: {
                borderWidth: 2
              }
            }
          }
        });
      })
      .catch((err) => console.error("Error al cargar gráfico:", err));
});