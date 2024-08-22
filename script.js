// Datos de ejemplo
const clientes = [
    { tipoPoliza: 'A', precio: 100, edad: 30, probabilidad: 0.9 },
    { tipoPoliza: 'B', precio: 200, edad: 45, probabilidad: 0.8 },
    { tipoPoliza: 'C', precio: 150, edad: 25, probabilidad: 0.95 },
    { tipoPoliza: 'A', precio: 250, edad: 50, probabilidad: 0.7 },
    { tipoPoliza: 'B', precio: 300, edad: 35, probabilidad: 0.85 }
];

// Función para mostrar datos en la tabla
function mostrarDatos() {
    const tablaClientes = document.getElementById('tabla-clientes');
    tablaClientes.innerHTML = ''; // Limpiar la tabla

    clientes.forEach(cliente => {
        const fila = document.createElement('tr');
        
        fila.innerHTML = `
            <td>${cliente.tipoPoliza}</td>
            <td>${cliente.precio}</td>
            <td>${cliente.edad}</td>
            <td>${cliente.probabilidad}</td>
        `;
        
        // Añadir un evento de clic para abrir un modal
        fila.addEventListener('click', () => {
            mostrarModal(cliente);
        });

        tablaClientes.appendChild(fila);
    });
}

// Función para mostrar un modal
function mostrarModal(cliente) {
    alert(`Información del Cliente:\nTipo de Póliza: ${cliente.tipoPoliza}\nPrecio: ${cliente.precio}\nEdad: ${cliente.edad}\nProbabilidad: ${cliente.probabilidad}`);
}

// Función para ordenar la tabla
function ordenar(propiedad) {
    clientes.sort((a, b) => {
        if (a[propiedad] < b[propiedad]) return -1;
        if (a[propiedad] > b[propiedad]) return 1;
        return 0;
    });
    mostrarDatos();
}

// Llamar a la función para mostrar los datos
mostrarDatos();
