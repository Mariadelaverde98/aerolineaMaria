
var seleccionAsientos = [];

/*Nada mas abrirse la pagina se pinta un boton por cada asiento del avion.
Se pintan en verde los asientos disponibles y en rojo los ocupados*/
(function pintaAvion() {
    var avion = document.getElementById("avion");
    var reserva = JSON.parse(localStorage.getItem("checkinActual"));
    var vuelo = reserva.vuelo;
    var asiento;
    document.getElementById("pAsientos").innerText = "Debes seleccionar " + reserva.numBilletes + " asientos.";
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 9; j++) {
            var boton = document.createElement("button");
            avion.appendChild(boton);
            boton.style.margin = "1px";
            boton.style.display = "flex";
            boton.style.justifyContent = "center";
            boton.style.borderRadius = "5px"
            switch (i) {
                case (0):
                    asiento = "A";
                    break;
                case (1):
                    asiento = "B";
                    boton.style.marginBottom = "20px";
                    break;
                case (2):
                    asiento = "C";
                    break;
                case (3):
                    asiento = "D";
                    break;
            }
            boton.setAttribute("id", j + asiento);
            boton.innerText = j + asiento;
            if (vuelo.asientos[i][j - 1] == 1) {
                boton.style.backgroundColor = "#b3151585";
            } else {
                boton.style.backgroundColor = "#00800091";
            }
        }
    }
})();

/*Pinta en azul el asiento que se ha seleccionado y no te permite seleccionar
mas asientos de los billetes que se han reservado*/
(function seleccion() {
    var reserva = JSON.parse(localStorage.getItem("checkinActual"));
    //alert(document.querySelectorAll("div#avion button"));
    document.querySelectorAll("div#avion button").forEach(boton => {
        boton.onclick = () => {
            if (boton.style.backgroundColor == "#0000ff69" || boton.style.backgroundColor == "rgba(0, 0, 255, 0.41)") {
                desseleccionAsiento(boton.id);
            } else if (boton.style.backgroundColor == "rgba(179, 21, 21, 0.52)") {
                alert("Asiento ocupado. Selecciona otro asiento.");
            } else if (seleccionAsientos.length == reserva.numBilletes) {
                alert('Ya has seleccionado tus asientos');
            } else {
                seleccionaAsiento(boton.id);
            }
        }
    })
})()

/*pinta en azul el asiento seleccionado*/
function seleccionaAsiento(id) {
    document.getElementById(id).style.backgroundColor = "#0000ff69";
    seleccionAsientos.push(id);
}

/*al hacer click sobre un asiento ya seleccionado se elimina la seleccion*/
function desseleccionAsiento(id) {
    document.getElementById(id).style.backgroundColor = "#00800091";
    seleccionAsientos = seleccionAsientos.filter(asiento => asiento != id);
}

/*Una vez seleccionados los asientos se guarda la seleccion en la reserva, se marcan como ocupados
los asientos en el vuelo correspondiente y se finaliza el checkin*/
function guardarSeleccion() {

    var reserva = JSON.parse(localStorage.getItem("checkinActual"));
    if (seleccionAsientos.length < reserva.numBilletes) {
        alert("Debes seleccionar " + reserva.numBilletes + " asientos.")
    } else {
        reserva.asientos = seleccionAsientos;
        reserva.checkin = true;
        var sesion = new Sesion();
        sesion = sesion.getSesion();
        var usuario = sesion.usuario;

        var vuelo = reserva.vuelo;
        var columna;
        var fila;
        seleccionAsientos.forEach(asiento => {
            columna = parseInt(asiento[0]) - 1;
            fila = asiento[1];
            switch (fila) {
                case ("A"):
                    fila = 0;
                    break;
                case ("B"):
                    fila = 1;
                    break;
                case ("C"):
                    fila = 2;
                    break;
                case ("D"):
                    fila = 3;
                    break;
            }
            vuelo.asientos[fila][columna] = 1;
        });

        var vuelos = JSON.parse(localStorage.getItem("vuelos"));
        vuelos[vuelo.id - 1] = vuelo;
        localStorage.setItem("vuelos", JSON.stringify(vuelos));

        var encontrado = false;
        var i = 0;
        var indice;
        while (!encontrado && i < usuario.historialReservas.length) {
            encontrado = usuario.historialReservas[i].id == reserva.id;
            if (encontrado) {
                indice = i;
            }
            i++;
        }
        usuario.historialReservas[indice] = reserva;
        sesion.guardarSesion();
        var usuarios = new Usuarios();
        usuarios = usuarios.usuariosFromLocalStorage();
        usuarios.datos[usuario.email] = usuario;
        usuarios.guardarEnLocalStorage();
        alert("Check-In completado. Se han enviado sus billetes al email " + usuario.email);
        window.location = "../perfil/perfil.html";
    }
}