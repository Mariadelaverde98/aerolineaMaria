function confirmarPago() {
    var nombre = document.getElementById('cardholder').value;
    var numTarjeta = document.getElementById('cardnumber').value;
    var fechaEx = document.getElementById('date').value;
    var cvv = document.getElementById('cvv').value;
    //Y que lleve a una pagina donde se muestran los datos de la compra
    if (nombre != '' && numTarjeta != '' && fechaEx != '' && cvv != '') {
        var reserva = new Reserva();
        var reservaJson = JSON.parse(localStorage.getItem('reservaActual'));
        reserva = Object.assign(reserva, reservaJson);
        reserva.metodoPago = {
            'nombre': nombre,
            'numeroTarjeta': numTarjeta,
            'fechaExpedicion': fechaEx,
            'cvv': cvv
        };
        localStorage.setItem('reservaActual', JSON.stringify(reserva));
        actualizaHistorialYpoints(reserva);
        window.location = '../resumen/resumen.html';
    } else {
        alert('Todos los campos son obligatorios');
    }
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
