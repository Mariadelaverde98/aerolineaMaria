function vendeBilletes(reserva) {
    var vuelo = new Vuelo();
    vuelo = vuelo.fromJsonToVuelo(reserva.vuelo);
    vuelo.vendeBilletes(reserva.numBilletes);
    var vuelos = JSON.parse(localStorage.getItem("vuelos"));
    vuelos[vuelo.id - 1] = vuelo;
    localStorage.setItem('vuelos', JSON.stringify(vuelos)); 
}

function confirmarPago() {
    var nombre = document.getElementById('cardholder').value;
    var numTarjeta = document.getElementById('cardnumber').value;
    var fechaEx = document.getElementById('date').value;
    var cvv = document.getElementById('cvv').value;
    var correcto = compruebaDatos(nombre, numTarjeta, fechaEx, cvv);
    //Y que lleve a una pagina donde se muestran los datos de la compra
    if (nombre != '' && numTarjeta != '' && fechaEx != '' && cvv != '' && correcto[0]) {
        var reserva = new Reserva();
        var reservaJson = JSON.parse(localStorage.getItem('reservaActual'));
        reserva = Object.assign(reserva, reservaJson);
        vendeBilletes(reserva);
        reserva.metodoPago = {
            'nombre': nombre,
            'numeroTarjeta': numTarjeta,
            'fechaExpedicion': fechaEx,
            'cvv': cvv
        };
        vendeBilletes(reserva);
        localStorage.setItem('reservaActual', JSON.stringify(reserva));
        actualizaHistorialYpoints(reserva);
        window.location = '../resumen/resumen.html';
    } else if(!correcto[0]){
        alert(correcto[1]);
    } else {
        alert('Todos los campos son obligatorios');
    }
}

function compruebaDatos(nombre, numTarjeta, fechaEx, cvv) {
    var correcto = true;
    var mensaje;
    var re = {
        "nombre": new RegExp(/^[A-Z\u00C0-\u017F]?[a-z\u00C0-\u017F]+\s?[A-Z\u00C0-\u017F]?[a-z\u00C0-\u017F]*$/),
        "numero de tarjeta": new RegExp(/^[0-9]{16}$/),
        //"numero de tarjeta": new RegExp(/^(?:4\d([\- ])?\d{6}\1\d{5}|(?:4\d{3}|5[1-5]\d{2}|6011)([\- ])?\d{4}\2\d{4}\2\d{4})$/),
        "cvv": new RegExp(/^[0-9]{3}$/),
        "fecha expedicion": new RegExp(/^[0-1]{1}[0-9]{1}\/[0-9]{1}[0-9]{1}$/)
    }
    var campos = Object.keys(re);
    var inputs = [nombre, numTarjeta, cvv, fechaEx];
    var i = 0;
    while(correcto && i < campos.length) {
        var correcto = re[campos[i]].test(inputs[i]);
        if(!correcto) {
            mensaje = "El campo " + campos[i] + " no es correcto."
        }
        i++;
    }
    return [correcto, mensaje];
}

function actualizaHistorialYpoints(reserva) {
    var sesion = JSON.parse(localStorage.getItem("sesion"));
    var usuarioSesion = sesion.usuario;
    var usuarios = JSON.parse(localStorage.getItem("usuarios"));
    console.log(usuarioSesion);
    console.log(usuarioSesion.email);
    console.log(usuarios[usuarioSesion.email]);
    usuarios.datos[usuarioSesion.email].historialReservas.push(reserva);
    usuarios.datos[usuarioSesion.email].points += 100;
    sesion.usuario = usuarios.datos[usuarioSesion.email];
    localStorage.setItem("sesion", JSON.stringify(sesion));
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

(function pintaPrecioTotal() {
    var precioTotal = JSON.parse(localStorage.getItem('reservaActual')).precio;
    document.getElementById('precioTotal').appendChild(document.createTextNode('TOTAL: ' + precioTotal + '€'));
})();

(function rellenarPago() {
    var sesion = new Sesion();
    sesion = sesion.getSesion();
    if (sesion.usuario.metodoPago) {
        document.getElementById('cardholder').value = sesion.usuario.metodoPago.titular;
        document.getElementById('cardnumber').value = sesion.usuario.metodoPago.numeroTarjeta;
        document.getElementById('date').value = sesion.usuario.metodoPago.fechaExpedicion;
        document.getElementById('cvv').value = sesion.usuario.metodoPago.cvv;
    }
})();
