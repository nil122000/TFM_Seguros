// Datos de ejemplo (esto debería ser reemplazado con los datos reales)
const clientes = [
    { tipoPoliza: 'Vida', precio: 100, edad: 30, probabilidad: 0.9 },
    { tipoPoliza: 'Salud', precio: 200, edad: 45, probabilidad: 0.85 },
    { tipoPoliza: 'Automóvil', precio: 150, edad: 50, probabilidad: 0.7 },
    { tipoPoliza: 'Hogar', precio: 120, edad: 35, probabilidad: 0.75 },
    { tipoPoliza: 'Vida', precio: 90, edad: 25, probabilidad: 0.95 },
    { tipoPoliza: 'Salud', precio: 180, edad: 60, probabilidad: 0.8 },
];

// Variable para almacenar el estado de ordenación
let ordenAscendente = true;

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
            // Redirigir a la página de detalle (aquí podrías implementar el redireccionamiento)
            alert(`Detalles de: ${cliente.tipoPoliza}`);
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

// Ordenar por probabilidad de fuga más alta al cargar la página
window.onload = () => {
    clientes.sort((a, b) => b.probabilidad - a.probabilidad); // Ordenar de mayor a menor
    cargarTabla(clientes); // Cargar la tabla
};
