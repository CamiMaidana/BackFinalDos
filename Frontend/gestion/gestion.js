const form = document.getElementById('fichaForm');
const cantidadDetallesSelect = document.getElementById('cantidadDetalles');
const detallesContainer = document.getElementById('detallesContainer');
const token = localStorage.getItem('token');
const fecha = document.getElementById("fechaInput");
fecha.value = new Date().toISOString().split("T")[0];

cantidadDetallesSelect.addEventListener('change', () => {
    const cantidadDetalles = parseInt(cantidadDetallesSelect.value);
    generarCamposDetalles(cantidadDetalles);
});

function generarCamposDetalles(cantidadDetalles) {
    detallesContainer.innerHTML = '';

    for (let i = 0; i < cantidadDetalles; i++) {
        const detalleDiv = document.createElement('div');
        detalleDiv.classList.add('detalle');

        const titulo = document.createElement('h3');
        titulo.textContent = `Detalle ${i + 1}:`;
        detalleDiv.appendChild(titulo);

        const motivoLabel = document.createElement('label');
        motivoLabel.textContent = 'Motivo:';
        detalleDiv.appendChild(motivoLabel);

        const motivoInput = document.createElement('input');
        motivoInput.type = 'text';
        motivoInput.name = `motivo${i + 1}`;
        detalleDiv.appendChild(motivoInput);

        const diagnosticoLabel = document.createElement('label');
        diagnosticoLabel.textContent = 'Diagnóstico:';
        detalleDiv.appendChild(diagnosticoLabel);

        const diagnosticoInput = document.createElement('input');
        diagnosticoInput.type = 'text';
        diagnosticoInput.name = `diagnostico${i + 1}`;
        detalleDiv.appendChild(diagnosticoInput);

        const tratamientoLabel = document.createElement('label');
        tratamientoLabel.textContent = 'Tratamiento:';
        detalleDiv.appendChild(tratamientoLabel);

        const tratamientoInput = document.createElement('input');
        tratamientoInput.type = 'text';
        tratamientoInput.name = `tratamiento${i + 1}`;
        detalleDiv.appendChild(tratamientoInput);

        detallesContainer.appendChild(detalleDiv);
    }
}

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fecha = document.getElementById('fechaInput').value;
    const idpaciente = document.getElementById('idpaciente').value;
    const cantidadDetalles = parseInt(cantidadDetallesSelect.value);
    const detalles = [];

    for (let i = 0; i < cantidadDetalles; i++) {
        const motivoInput = document.getElementsByName(`motivo${i + 1}`)[0];
        const diagnosticoInput = document.getElementsByName(`diagnostico${i + 1}`)[0];
        const tratamientoInput = document.getElementsByName(`tratamiento${i + 1}`)[0];

        const motivo = motivoInput.value;
        const diagnostico = diagnosticoInput.value;
        const tratamiento = tratamientoInput.value;

        detalles.push({ motivo, diagnostico, tratamiento });
    }

    const fichaData = {
        idmedico: localStorage.getItem('id'),
        fecha,
        idpaciente,
        detalles
    };
    console.log(fichaData);

    try {
        const response = await fetch('http://localhost:3000/Fichas/crear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}` // Agregar el token en el header de la solicitud
            },
            body: JSON.stringify(fichaData)
        });

        if (response.ok) {
            console.log('Ficha clínica creada exitosamente');
            // Resto del código para manejar la respuesta exitosa
        } else {
            console.error('Error al crear la ficha clínica:', response.status);
            // Resto del código para manejar el error de la respuesta
        }
    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
    }

    // Resto del código para enviar la solicitud al backend
});

// ...

const buscarPacienteInput = document.getElementById('buscarPacienteInput');
const resultadosPacientes = document.getElementById('resultadosPacientes');

// ...

const buscarPacienteModal = new bootstrap.Modal(document.getElementById('buscarPacienteModal'), {});

buscarPacienteInput.addEventListener('input', async () => {
    const searchTerm = buscarPacienteInput.value.toLowerCase();
    const pacientes = await getPacientes(); // Obtén los datos de los pacientes desde alguna fuente (por ejemplo, una API)

    const resultados = pacientes.filter(paciente => {
        const nombreCompleto = `${paciente.nombre} ${paciente.apellido}`.toLowerCase();
        return nombreCompleto.includes(searchTerm);
    });

    mostrarResultadosPacientes(resultados);
});

async function getPacientes() {
    try {
        const response = await fetch('http://localhost:3000/Pacientes', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}` // Agregar el token en el header de la solicitud
            },
        }
        );
        const elementos = await response.json();
        console.log(elementos);
        return elementos;
    } catch (error) {
        console.error(error);
    }
}

function mostrarResultadosPacientes(resultados) {
    resultadosPacientes.innerHTML = '';

    if (resultados.length > 0) {
        resultados.forEach(paciente => {
            const pacienteDiv = document.createElement('div');
            pacienteDiv.classList.add('paciente');

            const nombreApellido = document.createElement('p');
            nombreApellido.textContent = `${paciente.nombre} ${paciente.apellido}`;
            pacienteDiv.appendChild(nombreApellido);

            pacienteDiv.addEventListener('click', () => {
                seleccionarPaciente(paciente);
            });

            resultadosPacientes.appendChild(pacienteDiv);
        });
    } else {
        const sinResultados = document.createElement('p');
        sinResultados.textContent = 'No se encontraron pacientes';
        resultadosPacientes.appendChild(sinResultados);
    }
}

function seleccionarPaciente(paciente) {
    document.getElementById('idpaciente').value = paciente.id;
    document.getElementById('pacienteInput').value = `${paciente.nombre} ${paciente.apellido}`;
    buscarPacienteModal.hide();
}