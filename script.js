let datosClientes = [
    { tipoPoliza: 'Auto', precio: 1200, edad: 30, probabilidad: 0.9 },
    { tipoPoliza: 'Hogar', precio: 800, edad: 45, probabilidad: 0.8 },
    { tipoPoliza: 'Vida', precio: 500, edad: 25, probabilidad: 0.95 },
    { tipoPoliza: 'Salud', precio: 1500, edad: 35, probabilidad: 0.85 },
    // Otras filas de datos...
];

let ordenActual = { columna: '', direccion: '' }; // Variable para almacenar la columna y dirección de ordenación

function cargarDatos() {
    const tabla = document.getElementById('tabla-clientes');
    tabla.innerHTML = '';
    datosClientes.forEach((cliente, index) => {
        tabla.innerHTML += `
            <tr onclick="mostrarDetalles(${index})">
                <td>${cliente.tipoPoliza}</td>
                <td>${cliente.precio}</td>
                <td>${cliente.edad}</td>
                <td>${cliente.probabilidad}</td>
            </tr>
        `;
    });

    // Actualiza el gráfico después de cargar los datos
    actualizarGrafico();
}

function ordenar(columna) {
    let direccion = 'asc';
    if (ordenActual.columna === columna && ordenActual.direccion === 'asc') {
        direccion = 'desc';
    }

    datosClientes.sort((a, b) => {
        if (a[columna] < b[columna]) return direccion === 'asc' ? -1 : 1;
        if (a[columna] > b[columna]) return direccion === 'asc' ? 1 : -1;
        return 0;
    });

    ordenActual = { columna, direccion };
    cargarDatos();
    resaltarColumnaOrdenada(columna, direccion);
}

function resaltarColumnaOrdenada(columna, direccion) {
    const headers = ['tipoPolizaHeader', 'precioHeader', 'edadHeader', 'probabilidadHeader'];
    headers.forEach(header => {
        const th = document.getElementById(header);
        th.classList.remove('sorted-asc', 'sorted-desc');
    });

    if (direccion === 'asc') {
        document.getElementById(`${columna}Header`).classList.add('sorted-asc');
    } else {
        document.getElementById(`${columna}Header`).classList.add('sorted-desc');
    }
}

function mostrarDetalles(index) {
    const cliente = datosClientes[index];
    alert(`Detalles del Cliente:\nTipo de Póliza: ${cliente.tipoPoliza}\nPrecio: ${cliente.precio}\nEdad: ${cliente.edad}\nProbabilidad de Retención: ${cliente.probabilidad}`);
}

function actualizarGrafico() {
    const ctx = document.getElementById('graficoProbabilidad').getContext('2d');
    const probabilidades = datosClientes.map(cliente => cliente.probabilidad);
    const etiquetas = datosClientes.map(cliente => cliente.tipoPoliza);

    if (window.miGrafico) {
        window.miGrafico.destroy(); // Destruye el gráfico anterior si existe
    }

    window.miGrafico = new Chart(ctx, {
        type: 'bar', // Tipo de gráfico
        data: {
            labels: etiquetas,
            datasets: [{
                label: 'Probabilidad de Retención',
                data: probabilidades,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
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

// Cargar datos al inicio
cargarDatos();

