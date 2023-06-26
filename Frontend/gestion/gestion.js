
const form = document.getElementById('fichaForm');

// Obtener el token de autenticación almacenado en el localStorage
const token = localStorage.getItem('token');

form.addEventListener('submit', async (event) => {

    event.preventDefault();

    console.log(event);
    setInterval(()=>{
        console.log("Hola");
    }, 10000);
    const fecha = document.getElementById('fechaInput').value;
    const paciente = document.getElementById('pacienteInput').value;
    const motivo = document.getElementById('motivoInput').value;
    const diagnostico = document.getElementById('diagnosticoInput').value;
    const tratamiento = document.getElementById('tratamientoInput').value;

    const fichaData = {
        fecha,
        paciente,
        detalles: [
            { motivo, diagnostico, tratamiento }
        ]
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
});

