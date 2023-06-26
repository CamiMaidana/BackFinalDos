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
    const idpaciente = document.getElementById('pacienteInput').value;
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