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
        
        // Añadir un evento de clic
        fila.addEventListener('click', () => {
            alert(`Información del Cliente: ${JSON.stringify(cliente)}`);
        });

        tablaClientes.appendChild(fila);
    });
}

// Llamar a la función para mostrar los datos
mostrarDatos();
