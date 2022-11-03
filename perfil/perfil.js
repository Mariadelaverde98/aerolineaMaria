
if (localStorage.getItem("pos") == '0') {
    document.getElementById("defaultOpen").click();
} else {
    document.getElementById("checkinOp").click();
}

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

function guardarDatosEnLocalStorage(usuarios, usuario, sesion, tipoDato) {
    //actualiza el usuario de la sesion
    sesion.usuario = usuario;
    sesion.guardarSesion();
    //actualizar el array de usuarios --> puedo buscar el usuario y luego modificarlo con las funciones que ya tengo pensadas arriba
    console.log(usuarios.buscarUsuario(usuario));
    tipoDato == "personales" ? usuarios.modificarDatosPersonales(usuario, usuarios.buscarUsuario(usuario)) : usuarios.modificarPassword(usuario, usuarios.buscarUsuario(usuario));

    usuarios.guardarUsuarios();
}

function guardarDatos() {
    var sesion = sesionFromLocalStorage();
    //CAMBIAR LA CLASE PARA QUE COJA EL SELECT TB!!!!!
    var datos = document.querySelectorAll(".info-personal-input");
    var usuario = usuarioFromSesion(sesion);
    var usuarios = usuariosFromLocalStorage();
    datos.forEach(input => {
        if (input.value != "" && input.value != usuario.devolverAtributo(input.id)) {
            //guardar los cambios del usuarios atributo por atributo
            usuario.guardarAtributo(input.id, input.value);
        }
    });

    guardarDatosEnLocalStorage(usuarios, usuario, sesion, "personales");
}

function guardarContraseña() {
    var sesion = sesionFromLocalStorage();
    var usuario = usuarioFromSesion(sesion);
    var usuarios = usuariosFromLocalStorage();
    var contraseñaNueva = document.querySelector("#nuevaPassword.pass-input").value;
    var contraseñaActual = document.querySelector("#password.pass-input").value;
    if (usuario.comprobarPassword(contraseñaActual)) {
        if (usuario.comprobarPassword(contraseñaNueva)) {
            var mensaje = "La contraseña nueva no puede ser igual a la anterior";
            mostrarMensaje(mensaje);
        } else {
            usuario.pass = contraseñaNueva;
            guardarDatosEnLocalStorage(usuarios, usuario, sesion, "password");
        }
    } else {
        mostrarMensaje("La contraseña actual no coincide");
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
    reservas = reservas.filter(reserva => {
        fechaVuelo = reserva.vuelo.fecha;
        anioVuelo = parseInt(fechaVuelo.substring(0, 4));
        mesVuelo = parseInt(fechaVuelo.substring(5, 7));
        diaVuelo = Math.abs(parseInt(fechaVuelo.substring(fechaVuelo.length - 2)));
        fechaVuelo = new Date(anioVuelo, mesVuelo - 1, diaVuelo);
        return calcularDiferenciaHoras(hoy, fechaVuelo) < 48 && !reserva.checkin;
    });
    pintaReservas(reservas, div);
})();

function pintaReservas(reservas, div) {
    reservas.forEach(reserva => {
        var divR = document.createElement("div");
        div.appendChild(divR);
        divR.setAttribute("class", "vuelosCheckin");
        var vuelo = reserva.vuelo;
        var divDatos = document.createElement("div");
        var p = document.createElement("p");
        divDatos.appendChild(p);
        p.appendChild(document.createTextNode(`Madrid → ${vuelo.destino} | ${vuelo.hora} -  ${vuelo.horallegada}`));
        var p2 = document.createElement("p");
        divDatos.appendChild(p2);
        p2.appendChild(document.createTextNode(`${vuelo.fecha}`));
        divR.appendChild(divDatos);
        p.style.fontFamily = 'system-ui';
        p.style.fontWeight = '500';
        p.style.color = '#2E2E5C';
        p2.style.fontFamily = 'system-ui';
        p2.style.fontWeight = '500';
        p2.style.color = '#2E2E5C';

        var botonCheckin = document.createElement("button");
        divR.appendChild(botonCheckin);
        botonCheckin.innerHTML = "Check-in";
        botonCheckin.style.paddingTop = "3%";
        botonCheckin.style.paddingBottom = "3%";
        botonCheckin.style.borderRadius = "5px";
        //botonCheckin.setAttribute("onclick", `comprar(${vuelo.id})`);
    })
}

function calcularDiferenciaHoras(fecha1, fecha2) {
    let diferencia = (fecha2.getTime() - fecha1.getTime()) / 1000;
    diferencia /= (60 * 60);
    return Math.abs(diferencia);
}






/*----------METODO DE PAGO---------*/

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

function muestraMetodoPago(usuario) {
    var div = document.createElement("div");
    div.setAttribute("id", "metodoPago")
    document.querySelector("div#pago").appendChild(div);
    var tarjeta =  usuario.metodoPago.numeroTarjeta;
    tarjeta = "************" + tarjeta.substring(tarjeta.length - 4);
    var divTitular = document.createElement("div");
    divTitular.appendChild(document.createTextNode("Nombre del titular: " + usuario.metodoPago.titular));
    div.appendChild(divTitular);
    var divNum = document.createElement("div");
    div.appendChild(document.createTextNode("Número de tarjeta: " + tarjeta));
    div.appendChild(divNum);
}
