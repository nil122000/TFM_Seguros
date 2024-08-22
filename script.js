// Función para cargar datos desde un archivo CSV
async function cargarDatosCSV(url) {
    const response = await fetch(url);
    const data = await response.text();
    const rows = data.split('\n').map(row => row.split(',').map(column => column.trim())); // Separar filas y columnas

    const encabezados = rows[0]; // Obtener la primera fila como encabezados
    const clientes = rows.slice(1).map((row, index) => {
        // Verificar que la fila no esté vacía
        if (row.length === encabezados.length && row.every(col => col)) {
            let cliente = { id: index }; // Asignar un ID único
            encabezados.forEach((encabezado, i) => {
                // Asignar cada columna al objeto cliente
                cliente[encabezado] = isNaN(row[i]) ? row[i] : parseFloat(row[i]); // Convertir a número si es posible
            });
            return cliente;
        }
        return null; // Retornar null para filas inválidas
    }).filter(cliente => cliente !== null); // Filtrar las filas inválidas

    return { clientes, encabezados }; // Retornar tanto los clientes como los encabezados
}

// Variable para almacenar el estado de ordenación
let ordenAscendente = false; // Cambiado a false porque inicialmente es descendente
let clientes = [];
let encabezados = [];

// Función para cargar la tabla
function cargarTabla(data, encabezados) {
    const tablaClientes = document.getElementById('tabla-clientes');
    tablaClientes.innerHTML = ''; // Limpiar tabla

    // Crear encabezados de la tabla dinámicamente
    const thead = document.getElementById('tabla-encabezados');
    thead.innerHTML = ''; // Limpiar encabezados

    encabezados.forEach(encabezado => {
        const th = document.createElement('th');
        th.innerText = encabezado;
        th.onclick = () => ordenar(encabezado); // Asignar función de ordenación
        thead.appendChild(th);
    });

    // Crear filas de la tabla dinámicamente
    data.forEach(cliente => {
        const fila = document.createElement('tr');
        encabezados.forEach(encabezado => {
            const td = document.createElement('td');
            td.innerText = cliente[encabezado];
            fila.appendChild(td);
        });
        fila.addEventListener('click', () => {
            // Almacenar el cliente en localStorage antes de redirigir
            localStorage.setItem('clienteSeleccionado', JSON.stringify(cliente));
            window.location.href = `detalle.html?id=${cliente.id}`; // Redirecciona a detalle.html con ID
        });

        tablaClientes.appendChild(fila);
    });
}

// Función para ordenar
function ordenar(propiedad) {
    ordenAscendente = !ordenAscendente; // Cambiar el estado de ordenación
    const direction = ordenAscendente ? 1 : -1; // 1 para ascendente, -1 para descendente

    clientes.sort((a, b) => {
        if (a[propiedad] < b[propiedad]) return -1 * direction;
        if (a[propiedad] > b[propiedad]) return 1 * direction;
        return 0;
    });

    // Marcar el encabezado correspondiente
    const thead = document.getElementById('tabla-encabezados');
    thead.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc'); // Limpiar las clases de ordenación
    });
    const header = Array.from(thead.children).find(th => th.innerText === propiedad);
    header.classList.add(ordenAscendente ? 'sorted-asc' : 'sorted-desc');

    cargarTabla(clientes, encabezados); // Recargar la tabla
}

// Función para filtrar
function filtrar() {
    const input = document.getElementById('filterInput').value.toLowerCase();
    const filtrados = clientes.filter(cliente => 
        cliente.tipoPoliza.toLowerCase().includes(input)
    );
    cargarTabla(filtrados, encabezados); // Cargar tabla con datos filtrados
}

// Agregar el evento de entrada para filtrar
document.getElementById('filterInput').addEventListener('input', filtrar);

// Cargar la tabla al cargar la página
window.onload = async () => {
    const result = await cargarDatosCSV('clientes.csv'); // Ruta al archivo CSV
    clientes = result.clientes;
    encabezados = result.encabezados;
    cargarTabla(clientes, encabezados); // Cargar la tabla
};
