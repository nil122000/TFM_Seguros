// Función para cargar datos desde un archivo CSV
async function cargarDatosCSV(url) {
    const response = await fetch(url);
    const data = await response.text();
    const rows = data.split('\n').map(row => row.split(',').map(column => column.trim())); // Separar por comas

    const encabezados = rows[0]; // Primer fila como encabezados
    const clientes = rows.slice(1).map((row, index) => {
        // Crear objeto cliente para cada fila
        if (row.length === encabezados.length && row.every(col => col)) {
            const cliente = {};
            encabezados.forEach((header, i) => {
                cliente[header] = isNaN(row[i]) ? row[i] : parseFloat(row[i]); // Convertir a número si es necesario
            });
            cliente.id = index; // Asignar ID único
            return cliente;
        }
        return null; // Retornar null para filas inválidas
    }).filter(cliente => cliente !== null); // Filtrar filas inválidas

    return { encabezados, clientes }; // Retornar encabezados y clientes
}

// Variable para almacenar el estado de ordenación
let ordenAscendente = false;
let clientes = []; // Variable global para almacenar los clientes

// Función para cargar la tabla
function cargarTabla(data) {
    const tablaClientes = document.getElementById('tabla-clientes');
    tablaClientes.innerHTML = ''; // Limpiar tabla
    data.forEach(cliente => {
        const fila = document.createElement('tr');
        for (const key in cliente) {
            if (key !== 'id') { // No mostrar ID en la tabla
                const celda = document.createElement('td');
                celda.textContent = cliente[key];
                fila.appendChild(celda);
            }
        }
        fila.addEventListener('click', () => {
            localStorage.setItem('clienteSeleccionado', JSON.stringify(cliente));
            window.location.href = `detalle.html?id=${cliente.id}`; 
        });
        tablaClientes.appendChild(fila);
    });
}

// Función para crear el encabezado de la tabla
function crearEncabezado(encabezados) {
    const tablaEncabezado = document.getElementById('tabla-encabezado');
    tablaEncabezado.innerHTML = ''; // Limpiar encabezado
    encabezados.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        th.onclick = () => ordenar(header); // Agregar evento de ordenación
        tablaEncabezado.appendChild(th);
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
    document.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
    });
    const header = [...document.getElementById('tabla-encabezado').children].find(th => th.textContent === propiedad);
    header.classList.add(ordenAscendente ? 'sorted-asc' : 'sorted-desc');

    cargarTabla(clientes); // Recargar la tabla
}

// Función para filtrar
function filtrar() {
    const input = document.getElementById('filterInput').value.toLowerCase();
    const filtrados = clientes.filter(cliente => 
        Object.values(cliente).some(value => value.toString().toLowerCase().includes(input)) // Filtrar por todos los campos
    );
    cargarTabla(filtrados); // Cargar tabla con datos filtrados
}

// Agregar el evento de entrada para filtrar
document.getElementById('filterInput').addEventListener('input', filtrar);

// Cargar la tabla al cargar la página
window.onload = async () => {
    const { encabezados, clientes: data } = await cargarDatosCSV('clientes.csv'); // Ruta al archivo CSV
    clientes = data; // Guardar los clientes globalmente
    crearEncabezado(encabezados); // Crear encabezado
    cargarTabla(clientes); // Cargar la tabla
};
