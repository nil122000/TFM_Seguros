// Datos de ejemplo para la tabla de clientes
const clientes = [
    { tipoPoliza: 'A', precio: 100, edad: 30, probabilidad: 0.9 },
    { tipoPoliza: 'B', precio: 200, edad: 45, probabilidad: 0.8 },
    { tipoPoliza: 'C', precio: 150, edad: 25, probabilidad: 0.95 },
    { tipoPoliza: 'A', precio: 250, edad: 50, probabilidad: 0.7 },
    { tipoPoliza: 'B', precio: 300, edad: 35, probabilidad: 0.85 }
];

// Guardar los datos en localStorage
localStorage.setItem('clientes', JSON.stringify(clientes));

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

    // Llamar a la función para dibujar el gráfico
    dibujarGrafico();
}

// Función para ordenar la tabla
function ordenar(propiedad) {
    clientes.sort((a, b) => {
        if (a[propiedad] < b[propiedad]) return -1;
        if (a[propiedad] > b[propiedad]) return 1;
        return 0;
    });
    mostrarDatos(); // Volver a mostrar los datos ordenados
}

// Función para dibujar el gráfico de probabilidad
function dibujarGrafico() {
    const ctx = document.getElementById('graficoProbabilidad').getContext('2d');
    
    // Obtener los datos de probabilidad y los tipos de póliza
    const probabilidades = clientes.map(cliente => cliente.probabilidad);
    const tiposPoliza = clientes.map(cliente => cliente.tipoPoliza);

    // Verifica que haya datos para mostrar en el gráfico
    if (probabilidades.length === 0 || tiposPoliza.length === 0) {
        console.error('No hay datos para mostrar en el gráfico.');
        return; // Salir si no hay datos
    }

    // Crear el gráfico
    const graficoProbabilidad = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: tiposPoliza,
            datasets: [{
                label: 'Probabilidad de Retención',
                data: probabilidades,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Probabilidad'
                    }
                }
            }
        }
    });
}

// Mostrar los datos en la tabla al cargar la página
mostrarDatos();


