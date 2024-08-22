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

// Función para ordenar la tabla
function ordenar(propiedad) {
    clientes.sort((a, b) => {
        if (a[propiedad] < b[propiedad]) return -1;
        if (a[propiedad] > b[propiedad]) return 1;
        return 0;
    });
    mostrarDatos();
}

// Función para mostrar el gráfico
function mostrarGrafico() {
    const ctx = document.getElementById('graficoProbabilidad').getContext('2d');
    const probabilidadDatos = clientes.map(cliente => cliente.probabilidad);
    const tiposPoliza = clientes.map(cliente => cliente.tipoPoliza);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: tiposPoliza,
            datasets: [{
                label: 'Probabilidad de Retención',
                data: probabilidadDatos,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Llamar a las funciones para mostrar los datos y el gráfico
mostrarDatos();
mostrarGrafico();

