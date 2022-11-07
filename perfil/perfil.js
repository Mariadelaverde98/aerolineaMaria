/*Dependiendo de si entras al perfil desde el boton perfil o el boton
checkin te abre la pagina en una seccion u otra*/
if (localStorage.getItem("pos") == '0') {
    document.getElementById("defaultOpen").click();
} else {
    document.getElementById("checkinOp").click();
}

/*Muestra los datos del usuario que tiene la sesion iniciada*/
(function mostrarDatos() {
    var sesion = new Sesion();
    sesion = sesion.getSesion();
    var usuario = sesion.usuario;
    datos = ['nombre', 'apellidos', 'email', 'dni', 'fechaNacimiento', 'telefono'];
    datos.forEach(dato => {
        document.getElementById(dato).value = usuario[dato];
    })
    deshabilitarEdicion();
})();

/*Guarda los datos personales que se hayan editado*/
function guardarDatos() {
    var sesion = new Sesion();
    sesion = sesion.getSesion();
    var datos = document.querySelectorAll(".info-personal-input");
    var usuario = sesion.usuario;
    var usuarios = new Usuarios();
    usuarios = usuarios.usuariosFromLocalStorage();
    var campos = ["nombre", "apellidos", "dni", "fechaNacimiento", "email", "telefono"];
    var i = 0;
    datos.forEach(input => {
        if (input.value != "" && input.value != usuario[campos[i]]) {
            usuario[campos[i]] = input.value;
        }
        i++;
    });
    sesion.guardarSesion();
    usuarios.datos[usuario.email] = usuario;
    usuarios.guardarEnLocalStorage();
    deshabilitarEdicion();
}

/*Cambia la contraseña*/
function guardarContrasenia() {
    var sesion = new Sesion();
    sesion = sesion.getSesion();
    var usuario = new Usuario();
    usuario.fromJsonToUsuario(sesion.usuario);
    var usuarios = new Usuarios();
    usuarios = usuarios.usuariosFromLocalStorage();
    var contraseniaNueva = document.querySelector("#nuevaPassword.pass-input").value;
    var contraseniaActual = document.querySelector("#password.pass-input").value;
    var cambiada = usuario.cambiaContrasenia(contraseniaActual, contraseniaNueva)
    if (cambiada) {
        sesion.usuario = usuario;
        sesion.guardarSesion();
        usuarios.datos[usuario.email] = usuario;
        usuarios.guardarEnLocalStorage();
    } else {
        alert("La contraseña actual no coincide");
    }
}

//habilita la escritura en los inputs
function habilitarEdicion() {
    var inputs = document.querySelectorAll(".info-personal-input");
    inputs.forEach(input => {
        input.readOnly = false;
    });
}

//deshabilita la escritura en los inputs
function deshabilitarEdicion() {
    var inputs = document.querySelectorAll(".info-personal-input");
    inputs.forEach(input => {
        input.readOnly = true;
    });
}

//pinta la gráfica de los davinity points
(function pintarGrafica() {
    var sesion = new Sesion();
    sesion = sesion.getSesion();
    var usuario = sesion.usuario
    var points = usuario.points;
    var noPoints = 1000 - usuario.points;

    const labels = [
        'Davinity points por conseguir', 'Davinity points'
    ];

    const data = {
        labels: labels,
        datasets: [{
            label: 'My First dataset',
            backgroundColor: ["#fff", '#2e2e5c'],
            data: [noPoints, points,],
        }]
    };

    const config = {
        type: 'doughnut',
        data: data,
        options: {}
    };

    var myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
    document.getElementById("mostrarPoints").innerHTML = `<p>Tienes ${points} Davinity points</p>`
})();


//Cambia el contenido que se muestra
function openContent(evt, id) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(id).style.display = "block";
    evt.currentTarget.className += " active";
}

/*Muestra los vuelos que estan pendientes de checkin*/
(function muestraVuelosCheckin() {
    var div = document.getElementById("checkin");
    var sesion = new Sesion();
    sesion = sesion.getSesion();
    var usuario = sesion.usuario;
    var reservas = usuario.historialReservas;
    var hoy = new Date(Date.now());
    var fechaVuelo;
    var diaVuelo;
    var mesVuelo;
    var anioVuelo;
    var horas;
    var mins;
    reservas = reservas.filter(reserva => {
        fechaVuelo = reserva.vuelo.fecha;
        anioVuelo = parseInt(fechaVuelo.substring(0, 4));
        mesVuelo = Math.abs(parseInt(fechaVuelo.substring(5, 7)));
        diaVuelo = Math.abs(parseInt(fechaVuelo.substring(fechaVuelo.length - 2)));
        horas = parseInt(reserva.vuelo.hora.substring(0,2));
        mins = parseInt(reserva.vuelo.hora.substring(3));
        fechaVuelo = new Date(anioVuelo, mesVuelo - 1, diaVuelo, horas, mins, 0);
        return calcularDiferenciaHoras(hoy, fechaVuelo) < 48 && !reserva.checkin;
    });
    pintaReservas(reservas, div, true);
})();

/*muestra todas las reservas hechas por el usuario*/
(function muestraHistorialReservas() {
    var div = document.getElementById("historial");
    var sesion = new Sesion();
    sesion = sesion.getSesion();
    var usuario = sesion.usuario;
    pintaReservas(usuario.historialReservas, div, false);
})()

/*pinta las tarjetas de las reservas*/
function pintaReservas(reservas, div, checkin) {
    reservas.forEach(reserva => {
        var divR = document.createElement("div");
        div.appendChild(divR);
        divR.setAttribute("class", "vuelosCheckin");
        var vuelo = reserva.vuelo;
        var divDatos = document.createElement("div");
        divDatos.style.display = "contents";
        var p = document.createElement("p");
        divDatos.appendChild(p);
        p.appendChild(document.createTextNode(`Madrid → ${vuelo.destino} | ${vuelo.hora} -  ${vuelo.horallegada}`));
        var p2 = document.createElement("p");
        divDatos.appendChild(p2);
        p2.appendChild(document.createTextNode(`${vuelo.fecha}`));
        divR.appendChild(divDatos);
        p.style.fontFamily = 'system-ui';
        p.style.fontWeight = '400';
        p.style.color = '#2E2E5C';
        p2.style.fontFamily = 'system-ui';
        p2.style.fontWeight = '400';
        p2.style.color = '#2E2E5C';
        if (reserva.checkin) {
            var p3 = document.createElement("p");
            p3.innerHTML = "Asientos: " + reserva.asientos;
            divDatos.appendChild(p3);
        }

        if (checkin) {
            var botonCheckin = document.createElement("button");
            divR.appendChild(botonCheckin);
            botonCheckin.innerHTML = "Check-in";
            botonCheckin.style.paddingTop = "3%";
            botonCheckin.style.paddingBottom = "3%";
            botonCheckin.style.borderRadius = "5px";
            botonCheckin.onclick = () => {
                localStorage.setItem("checkinActual", JSON.stringify(reserva));
                window.location = "../checkin/checkin.html";
            }
        }
    })
}

/*calcula la diferencia en horas entre dos fechas dadas*/
function calcularDiferenciaHoras(fecha1, fecha2) {
    let diferencia = (fecha2.getTime() - fecha1.getTime()) / 1000;
    diferencia /= (60 * 60);
    return Math.abs(diferencia);
}






/*----------METODO DE PAGO---------*/

/*Si existe un metodo de pago lo muestra y si no existe te da la opcion de añadir uno */
function metodoPago() {
    var sesion = new Sesion();
    sesion = sesion.getSesion();
    var usuario = sesion.usuario;
    //document.querySelector("div#pago button#aniadePago").onclick = addpago(usuario);
    if (usuario.metodoPago) {
        document.querySelector("div#pago button#aniadePago").style.display = "none";
        document.querySelector("div#pago div#addPago").style.display = "none";
        muestraMetodoPago(usuario);
    } else {
        document.querySelector("div#pago button#aniadePago").style.display = "flex";
        document.querySelector("div#pago div#addPago").style.display = "none";
        document.querySelector("div#pago button#aniadePago").onclick = () => {
            document.querySelector("div#pago button#aniadePago").style.display = "none";
            document.querySelector("div#pago div#addPago").style.display = "flex";
        }

        document.querySelector("div#addPago button#cancelar").onclick = () => {
            document.querySelector("div#pago button#aniadePago").style.display = "flex";
            document.querySelector("div#pago div#addPago").style.display = "none";
        }
    }
};
metodoPago();

/*Se guarda el metodo de pago en el usuario*/
function guardarPago() {
    var sesion = new Sesion();
    sesion = sesion.getSesion();
    var usuario = sesion.usuario;
    usuario.metodoPago = {
        titular: document.getElementById("cardholder").value,
        numeroTarjeta: document.getElementById("cardnumber").value,
        fechaExpedicion: document.getElementById("date").value,
        cvv: document.getElementById("cvv").value
    }
    sesion.guardarSesion();
    var usuarios = new Usuarios();
    usuarios = usuarios.usuariosFromLocalStorage();
    usuarios.datos[usuario.email] = usuario;
    usuarios.guardarEnLocalStorage();
    metodoPago();
}

/*Pinta la tarjeta con los datos del metodo de pago*/
function muestraMetodoPago(usuario) {
    var div = document.createElement("div");
    div.setAttribute("id", "metodoPago")
    document.querySelector("div#pago").appendChild(div);
    var tarjeta = usuario.metodoPago.numeroTarjeta;
    tarjeta = "************" + tarjeta.substring(tarjeta.length - 4);
    var divTitular = document.createElement("div");
    divTitular.appendChild(document.createTextNode("Nombre del titular: " + usuario.metodoPago.titular));
    div.appendChild(divTitular);
    var divNum = document.createElement("div");
    div.appendChild(document.createTextNode("Número de tarjeta: " + tarjeta));
    div.appendChild(divNum);
    var divButton = document.createElement("div");
    divButton.setAttribute("id", "boton_eliminar_pago_contenedor");
    document.querySelector("div#pago").appendChild(divButton);
    var boton = document.createElement("button");
    boton.setAttribute("id", "boton_eliminar_pago");
    boton.innerText = "Borrar método de pago";
    divButton.appendChild(boton);
    boton.setAttribute("onclick", `borrarMetodoPago()`)
}

/*Borra el metodo de pago existente*/
function borrarMetodoPago() {
    var sesion = new Sesion();
    sesion = sesion.getSesion();
    sesion.usuario.metodoPago = undefined;
    sesion.guardarSesion();
    
    var usuarios = new Usuarios();
    usuarios = usuarios.usuariosFromLocalStorage();
    usuarios.datos[sesion.usuario.email] = sesion.usuario;
    usuarios.guardarEnLocalStorage();
    var div = document.querySelector("div#metodoPago");
    div.parentNode.removeChild(div);
    var boton = document.querySelector("button#boton_eliminar_pago");
    boton.parentNode.removeChild(boton);
    metodoPago();
}
