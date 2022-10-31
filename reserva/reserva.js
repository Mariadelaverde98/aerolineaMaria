(function divsPasajeros() {
    var reserva = JSON.parse(localStorage.getItem('reservaActual'));
    var numPasajeros = reserva.numBilletes;
    console.log(numPasajeros);
    for (let i = 0; i < numPasajeros; i++) {
        creaDiv(i);
    }
    autoRellenaDatos();
    pintaPrecioTotal();
})();

function autoRellenaDatos() {
    var usuario = JSON.parse(localStorage.getItem("sesion")).usuario;
    var divDatos = document.getElementById("pasajero0");
    var inputs = divDatos.getElementsByTagName("input");
    inputs[0].value = usuario.nombre;
    inputs[1].value = usuario.apellidos;
    inputs[2].value = usuario.dni;
}

function creaDiv(i) {
    var div1 = document.createElement('div');
    var div2 = document.createElement('div');
    var div3 = document.createElement('div');
    document.getElementsByClassName('pasajeros')[0].appendChild(div1);
    div1.appendChild(div2);
    div1.appendChild(div3);
    div1.setAttribute("class", "div1");
    div2.setAttribute("class", "div2");

    var pas = document.createElement('p');
    pas.appendChild(document.createTextNode(`PASAJERO ${i + 1}:`));
    pas.setAttribute("class", "numPas");
    div2.appendChild(pas);
    var p = document.createElement('p');
    p.appendChild(document.createTextNode('Los datos de los pasajeros deben coincidir con la documentación que presenten en el momento del vuelo.'));
    p.style.color = 'grey'
    div2.appendChild(p);

    div3.setAttribute('id', `pasajero${i}`);

    var nombre = document.createElement('input');
    nombre.setAttribute('placeholder', 'Nombre');
    nombre.setAttribute('required', 'required');
    div3.appendChild(nombre);

    var apellidos = document.createElement('input');
    apellidos.setAttribute('required', 'required');
    apellidos.setAttribute('placeholder', 'Apellidos');
    div3.appendChild(apellidos);

    var dni = document.createElement('input');
    dni.setAttribute('required', 'required');
    dni.setAttribute('placeholder', 'DNI');
    div3.appendChild(dni);

    var label = document.createElement('label');
    var necEspeciales = document.createElement('input');
    necEspeciales.setAttribute('required', 'required');
    necEspeciales.setAttribute('type', 'checkbox');
    label.appendChild(necEspeciales);
    label.appendChild(document.createTextNode('Pasajero con necesidades especiales'));
    div3.appendChild(label);
    div3.setAttribute('class', 'pasajero');
}


function pintaPrecioTotal() {
    var reserva = JSON.parse(localStorage.getItem('reservaActual'));
    document.getElementById('precioTotal').appendChild(document.createTextNode('TOTAL: ' + reserva.precio + '€'));
}

function continuarApago() {
    let datosPasajeros = document.getElementsByClassName('pasajero');
    let pasajeros = [];
    i = 0;
    var nombre = datosPasajeros[0].getElementsByTagName('input')[0].value;
    var apellidos = datosPasajeros[0].getElementsByTagName('input')[1].value;
    var dni = datosPasajeros[0].getElementsByTagName('input')[2].value;
    var nombre, apellidos, dni;
    do {
        nombre = datosPasajeros[i].getElementsByTagName('input')[0].value;
        apellidos = datosPasajeros[i].getElementsByTagName('input')[1].value;
        dni = datosPasajeros[i].getElementsByTagName('input')[2].value;
        pasajeros.push({
            nombre: nombre,
            apellidos: apellidos,
            dni: dni
        });
        i++;
    }while(nombre && apellidos && dni && i < datosPasajeros.length)

    if (nombre && apellidos && dni) {
        let reserva = new Reserva();
        reserva = Object.assign(reserva, JSON.parse(localStorage.getItem('reservaActual')));
        reserva.pasajeros = pasajeros;
        localStorage.setItem('reservaActual', JSON.stringify(reserva));
        window.location = '../pago/pago.html';
    } else {
        alert('todos los campos son obligatorios');
    }
}

function atras() {
    window.location = '../home/home.html';
}
