// Variable global para almacenar clientes
let clientes = [];

// Función para cargar datos desde un archivo CSV
async function cargarDatosCSV(url) {
    const response = await fetch(url);
    const data = await response.text();
    const rows = data.split('\n').slice(1); // Ignorar la primera fila (encabezados)

    const clientesData = rows.map((row, index) => {
        const columns = row.split(',').map(column => column.trim()); // Eliminar espacios en blanco

        // Verificar que la fila no esté vacía y tenga el número adecuado de columnas
        if (columns.length === 4 && columns.every(col => col)) {
            return {
                id: index,  // Asignar un ID único aquí
                tipoPoliza: columns[0],
                precio: parseFloat(columns[1]),
                edad: parseInt(columns[2]),
                probabilidad: parseFloat(columns[3]),
            };
        }
        return null; // Retornar null para filas inválidas
    }).filter(cliente => cliente !== null); // Filtrar las filas inválidas

    return clientesData;
}

// Variable para almacenar el estado de ordenación
let ordenAscendente = false; // Cambiado a false porque inicialmente es descendente

// Función para cargar la tabla
function cargarTabla(data) {
    const tablaClientes = document.getElementById('tabla-clientes');
    tablaClientes.innerHTML = ''; // Limpiar tabla
    data.forEach(cliente => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cliente.tipoPoliza}</td>
            <td>${cliente.precio}</td>
            <td>${cliente.edad}</td>
            <td>${cliente.probabilidad}</td>
        `;
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
    document.querySelectorAll('th').forEach(th => {
        th.classList.remove('sorted-asc', 'sorted-desc');
    });
    const header = document.getElementById(`${propiedad}Header`);
    header.classList.add(ordenAscendente ? 'sorted-asc' : 'sorted-desc');

    cargarTabla(clientes); // Recargar la tabla
}

// Función para filtrar
function filtrar() {
    const input = document.getElementById('filterInput').value.toLowerCase();
    const filtrados = clientes.filter(cliente => 
        cliente.tipoPoliza.toLowerCase().includes(input)
    );
    cargarTabla(filtrados); // Cargar tabla con datos filtrados
}

// Agregar el evento de entrada para filtrar
document.getElementById('filterInput').addEventListener('input', filtrar);

// Cargar la tabla al cargar la página
window.onload = async () => {
    clientes = await cargarDatosCSV('clientes.csv'); // Ruta al archivo CSV
    clientes.sort((a, b) => b.probabilidad - a.probabilidad); // Ordenar de mayor a menor
    cargarTabla(clientes); // Cargar la tabla
    // Establecer la clase de ordenación en la cabecera correspondiente
    document.getElementById('probabilidadHeader').classList.add('sorted-desc');
};
