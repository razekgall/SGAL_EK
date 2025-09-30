document.addEventListener('DOMContentLoaded', () => {
    const cantidad = 900;
    const columnas = Math.ceil(Math.sqrt(cantidad));
    const filas = Math.ceil(cantidad / columnas);
    const contenedor = document.getElementById('contenedor');

    for (let i = 0; i < cantidad; i++) {
        const fila = Math.floor(i / columnas);
        const columna = i % columnas;

        const checkboxId = `checkbox-${i}`;
        const top = (fila / filas) * 100;
        const left = (columna / columnas) * 100;
        const ancho = 100 / columnas;
        const alto = 100 / filas;

        const input = document.createElement('input');
        input.type = 'checkbox';
        input.className = 'checkbox';
        input.id = checkboxId;

        const label = document.createElement('label');
        label.className = 'celda';
        label.setAttribute('for', checkboxId);
        label.style.top = `${top}%`;
        label.style.left = `${left}%`;
        label.style.width = `${ancho}%`;
        label.style.height = `${alto}%`;

        // Bloqueos de prueba
        if ( i === 221 || i === 222 || i === 240 || i === 241 || i === 242) {
            input.disabled = true;
            label.classList.add('bloqueado');
        }
        if ( i === 401 || i === 402 || i === 430 || i === 431 || i === 432) {
            input.disabled = true;
            label.classList.add('bloqueado-especial');
        }

        contenedor.appendChild(input);
        contenedor.appendChild(label);
    }

    // Guardar
    document.getElementById('guardar').addEventListener('click', () => {
        const seleccionados = Array.from(document.querySelectorAll('.checkbox:checked'))
            .map(checkbox => parseInt(checkbox.id.replace('checkbox-', '')));

        fetch('http://localhost:5500/cuadros_seleccionados', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ seleccionados })
        })
            .then(res => res.json())
            .then(data => {
                alert("Cuadros guardados correctamente");
                console.log(data);
            });
    });

    // Cargar seleccionados
    fetch('http://localhost:5500/cuadros_seleccionados')
        .then(res => res.json())
        .then(ids => {
            ids.forEach(id => {
                const checkbox = document.getElementById(`checkbox-${id}`);
                const label = document.querySelector(`label[for="checkbox-${id}"]`);

                if (checkbox && label) {
                    checkbox.checked = true;
                    checkbox.disabled = true; // Bloquear para que no se pueda desmarcar
                    label.classList.add('celda'); // Azul + pointer-events: none
                    label.style.display = 'flex';
                    label.style.backgroundColor = 'blue';
                }
            });
        });
});