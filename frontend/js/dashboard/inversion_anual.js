document.addEventListener('DOMContentLoaded', async () => {
  const tbody = document.getElementById('tablaInversion');
  let totalGeneral = 0;

  try {
    const response = await fetch('http://localhost:5500/integrador/api/inversion-anual');
    const datos = await response.json();

    datos.forEach(fila => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="producto__cell" style="background-color: white; color: black;">${fila.nombre}</td>
        <td class="producto__cell-lg" style="background-color: white; color: black;">$${fila.total_inversion.toLocaleString()}</td>
      `;
      totalGeneral += parseFloat(fila.total_inversion);
      tbody.appendChild(tr);
    });

    const trTotal = document.createElement('tr');
    trTotal.innerHTML = `
      <td class="producto__cell" style="background-color: white; color: black;"><strong>Total General</strong></td>
      <td class="producto__cell-lg" style="background-color: white; color: black;"><strong>$${totalGeneral.toLocaleString()}</strong></td>
    `;
    tbody.appendChild(trTotal);
  } catch (error) {
    console.error('Error al cargar la inversión:', error);
  }
});