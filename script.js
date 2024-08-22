// Guardar los datos de clientes en localStorage (opcional)
localStorage.setItem('clientes', JSON.stringify(clientes));


// Datos de ejemplo sin usar localStorage
const clientes = [
    { tipoPoliza: 'A', precio: 100, edad: 30, probabilidad: 0.9 },
    { tipoPoliza: 'B', precio: 200, edad: 45, probabilidad: 0.8 },
    { tipoPoliza: 'C', precio: 150, edad: 25, probabilidad: 0.95 },
    { tipoPoliza: 'A', precio: 250, edad: 50, probabilidad: 0.7 },
    { tipoPoliza: 'B', precio: 300, edad: 35, probabilidad: 0.85 }
];

function mostrarDatos() {
    const tablaClientes = document.getElementById('tabla-clientes');
    tablaClientes.innerHTML = ''; // Limpiar la tabla

    clientes.forEach((cliente, index) => {
        const fila = document.createElement('tr');
        
        fila.innerHTML = `
            <td>${cliente.tipoPoliza}</td>
            <td>${cliente.precio}</td>
            <td>${cliente.edad}</td>
            <td>${cliente.probabilidad}</td>
        `;
        
        // Añadir un evento de clic para abrir una nueva página con detalles
        fila.addEventListener('click', () => {
            window.location.href = `detalle.html?cliente=${index}`;
        });

        tablaClientes.appendChild(fila);
    });
}

mostrarDatos();
