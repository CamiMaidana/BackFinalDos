const API_URL = 'http://localhost:3000/';

const tablaBody = document.getElementById("tabla-body");
const token = localStorage.getItem('token');


async function refrescarTabla() {

    const elementos = await obtenerElementos();

    tablaBody.innerHTML = "";

    let elementosNuevos = [];
    elementos.forEach((elemento) => {
        elementosNuevos.push({
            ID: elemento.id,
            fecha: elemento.fecha,
            medico: elemento.Medico.nombre +' '+ elemento.Medico.apellido,
            especialidad: elemento.Medico.especialidad,
            paciente: elemento.Paciente.nombre +' '+ elemento.Paciente.apellido,
            detalles: JSON.stringify(elemento.Detalles)
        }) 
    });

    elementosNuevos.forEach((elemento) => {
        const fila = this.crearFila(elemento);
        tablaBody.appendChild(fila);    
    });
}

function crearFila(elemento) {
    const fila = document.createElement("tr");

    Object.keys(elemento).forEach((key) => {
        if (elemento[key] !== null) {
            const td = document.createElement("td")
            const value = elemento[key]

            td.textContent = value

            fila.appendChild(td)
        }
    })

    return fila
}

async function obtenerElementos() {
    try {
        const response = await fetch(API_URL + 'Fichas/get', {
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

$(document).ready(async function () {
    await refrescarTabla()
    // Setup - add a text input to each footer cell
    $('#lista tfoot th').each(function () {
        var title = $(this).text();
        $(this).html('<input type="text" placeholder="Buscar ' + title + '" />');
    });
 
    // DataTable
    var table = $('#lista').DataTable({
        "pageLength": 25,
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json',
        },
        initComplete: function () {
            // Apply the search
            this.api()
                .columns()
                .every(function () {
                    var that = this;
 
                    $('input', this.footer()).on('keyup change clear', function () {
                        if (that.search() !== this.value) {
                            that.search(this.value).draw();
                        }
                    });
                });
        },
    });
});