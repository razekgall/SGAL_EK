console.log('dasasddas');
document.addEventListener('DOMContentLoaded', () => { // ⬅️ Esperamos a que cargue el DOM
  const tbody = document.querySelector('.cardright__dinamic-table'); // ⬅️ Seleccionamos la tabla y el tbody
  const paginacion = document.querySelector('.cardright__pagination');// ⬅️ Esto es para la paginacion
  let paginaActual = 1;// ⬅️ Empezamos en la pagina 1

  async function obtenerciclos(pagina = 1, buscar = '') {
    try {
      const res = await fetch(`http://localhost:3000/api/cycle/list?page=${pagina}&buscar=${encodeURIComponent(buscar)}`); // ⬅️ hacemos un fetch con la pagina en la que deseamos mostrar y lo que estamos buscando
      const data = await res.json();
  
      mostrarciclos(data.ciclos); // ⬅️ Llenamos, por medio de esta funcion, la tabla
      mostrarPaginacion(data.total, pagina, buscar); // ⬅️ Mostramos la pagina actual(por defecto la 1), los datos correspondientes a esta pagina. Si se esta buscando los datos cambian a los que coincidan con la busqueda
    } catch (err) {
      console.error('Error al obtener ciclos:', err.message); // ⬅️ Mensaje de error
    }
  }
  


  function mostrarciclos(ciclos) { // ⬅️ Esta es la funcion para mostrar en una tabla los ciclos
    tbody.innerHTML = ''; // ⬅️ para que no se pasen de 20  filas

    ciclos.forEach(ciclo => { // ⬅️ for Each para recorrer cada fila
      const row = document.createElement('tr'); // ⬅️ Por fila se crea un tr
      // ⬇️ Estamos ingresando una td con clase usuario__table-data-cell y un svg por diseño,luego creamos dinamicamente los datos de la fila segun su propiedad⬇️
      row.className = 'cardright__row'; // Añade la clase BEM
      const formatDate = (isoDate) => {
        return new Date(isoDate).toISOString().split('T')[0];
      };
      row.innerHTML = `

        <td class="cardright__cell ">${ciclo.cycleId}</td> 
        <td class="cardright__cell">${ciclo.name_cycle}</td>
        <td class="cardright__cell">${ciclo.description_cycle}</td>
        <td class="cardright__cell">${formatDate(ciclo.cycle_start)}</td>
        <td class="cardright__cell">${formatDate(ciclo.cycle_end)}</td>
        <td class="cardright__cell">${ciclo.news_cycle}</td>
        
      `;
      tbody.appendChild(row);
    });
  }
    
  function mostrarPaginacion(totalciclos, paginaActual, buscar = '') { // ⬅️ Funcion para las paginas
    const totalPaginas = Math.ceil(totalciclos / 10);
    paginacion.innerHTML = '';// ⬅️ para que no sedupliquen los botones al presionar otro
  
    const crearBoton = (num, texto = null, isActive = false) => {
      const btn = document.createElement('button');
      btn.textContent = texto || num;
      if (isActive) btn.classList.add('activo');
      btn.addEventListener('click', () => obtenerciclos(num, buscar)); // 👈 importante
      paginacion.appendChild(btn);
    };
  
    // Botón « anterior
    if (paginaActual > 1) { // ⬅️ Si estamos en una pagina que no sea la 1 se crea « para volver
      crearBoton(paginaActual - 1, '«');
    }
  
    if (totalPaginas <= 7) {// ⬅️ Se restringe la cantidad de botones que puede haber (7)
      for (let i = 1; i <= totalPaginas; i++) {
        crearBoton(i, null, i === paginaActual);
      }
    } else {
      crearBoton(1, null, paginaActual === 1); // ⬅️ Si no los hay se crea
  
      if (paginaActual > 4) { // ⬅️ Si hay mas de 4 botones se crea ...
        const dots = document.createElement('span');
        dots.textContent = '...';
        paginacion.appendChild(dots);
      }
  
      const start = Math.max(2, paginaActual - 2); // ⬅️ Como la ultima pagina es fija, se muestra los siguiente 2 a la que estamos parados, ejemplom si estos en el 1, se muestra 1 2 3 ... (ultima pagina)
      const end = Math.min(totalPaginas - 1, paginaActual + 2); // ⬅️ Para el ultimo se le muestran los penultimos dos al lado de este, por ejemplom si estoy en la nueve se muestra 1 ...7 8 9
  
      for (let i = start; i <= end; i++) { // para mostrar los siguientes dos botones 
        crearBoton(i, null, i === paginaActual);
      }
  
      if (paginaActual < totalPaginas - 3) { // Oara mostrar los ... despues de dos botones (sin contar en el que se esta parado)
        const dots = document.createElement('span');
        dots.textContent = '...';
        paginacion.appendChild(dots);
      }
  
      crearBoton(totalPaginas, null, paginaActual === totalPaginas);
    }
  
    // Botón » siguiente
    if (paginaActual < totalPaginas) { // ⬅️ si se esta en cualquier pagina que no sea la ultima se muestra el »
      crearBoton(paginaActual + 1, '»');
    }
  }
  
// ⬇️ Estoy llamando a la funcion obtenerciclos, de esta parte todo el codigo
    obtenerciclos();
// ⬇️Aqui empieza el bloqeu de codigo para buscar⬇️

  const button = document.querySelector(".cardright__container-buscar");  // ⬅️ Botón de búsqueda
  const input = document.querySelector(".cardright__container-search");  // ⬅️ Input de búsqueda


  // Explicacion con manitos
  if (button && input) { // ⬅️ Si estamos interarctuando con el boton y el input
    button.addEventListener("click", function () {
      const filtro = input.value.trim(); // 👈 Tomamos el valor del input y con el metodo trim() quitamos los espacios en blanco
      obtenerciclos(1, filtro); // 👈 Llamamos a la funcion, y le damos el parametro filtro
    });
  
    input.addEventListener("keydown", function (event) { // 👈 Si damos enter tambien funciona
      if (event.key === "Enter") {
        const filtro = input.value.trim();
        obtenerciclos(1, filtro);
      }
    });
  
    input.addEventListener("click", function () { // 👈 Si damos click en el input y este tiene algun valor, se vacia
      if (input.value) {
        input.value = "";
        obtenerciclos(1); // 👈 Al borrar, recarga todo
      }
    });
  } else {
    console.log("No se encontraron los elementos de búsqueda."); 
  }
});

