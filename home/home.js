function encogerBusqueda() {
    var destino = document.getElementsByTagName('select')[0].value;
    var numPasajeros = document.getElementById('pasajeros').value;
    var fecha = document.getElementById('fecha').value;
    var divs = document.getElementsByClassName('busqueda');
    divs[0].style.display = 'none';
    if (divs.length == 1) {
        var div = document.createElement('div');
        div.setAttribute('class', 'busqueda busqueda2');
        var p = document.createElement('p');

        p.appendChild(document.createTextNode(`MAD → ${destino} |  Fecha: ${fecha} | Número de pasajeros: ${numPasajeros}`));
        div.appendChild(p);
        document.getElementsByClassName('contenedor')[0].appendChild(div);
        div.style.width = '90%';
        p.style.fontSize = 'xx-large';
        p.style.fontFamily = 'system-ui';
        p.style.fontWeight = '500';
        p.style.color = '#2e2e5c';
        div.style.marginTop = '1%';
        div.style.height = '48px';
        div.style.display = 'flex';
        div.style.justifyContent = 'space-around';

        var editarBusqueda = document.createElement('button');
        editarBusqueda.appendChild(document.createTextNode('EDITAR BÚSQUEDA'));

        div.appendChild(editarBusqueda);
        editarBusqueda.style.fontFamily = 'system-ui';
        editarBusqueda.style.fontSize = 'large'
        editarBusqueda.style.color = 'white';
        editarBusqueda.style.fontWeight = '500';
        editarBusqueda.style.backgroundColor = '#2e2e5c';
        editarBusqueda.style.border = '0.5px solid white';
        editarBusqueda.style.padding = '10px';
        div.setAttribute('onclick', 'editarBusqueda()');
    } else {
        divs[1].style.display = 'flex';
        divs[1].getElementsByTagName('p')[0].innerHTML = `MAD → ${destino} |  Fecha: ${fecha} | Número de pasajeros: ${numPasajeros}`;
    }

}

function editarBusqueda() {
    document.getElementsByClassName('busqueda')[0].style.display = 'flex';
    document.getElementsByClassName('busqueda')[1].style.display = 'none';
    var vuelos = document.getElementById('vuelos');
    vuelos.parentNode.removeChild(vuelos);
}

function buscarVuelos() {
    var vuelos = JSON.parse(localStorage.getItem("vuelos"));
    var destinoBusq = document.getElementsByTagName('select')[0].value;
    var numPasajerosBusq = document.getElementById('pasajeros').value;
    var fechaBusq = document.getElementById('fecha').value;
    if (fechaBusq[fechaBusq.length - 2] == '0') {
        fechaBusq = fechaBusq.substring(0, fechaBusq.length - 2) + fechaBusq[fechaBusq.length - 1];
    }
    var vuelosEncontrados = vuelos.filter(vuelo => vuelo.destino == destinoBusq && vuelo.fecha == fechaBusq && numPasajerosBusq <= vuelo.asientosLibres);
    pintarVuelos(vuelosEncontrados);
}

function pintarVuelos(vuelosEncontrados) {
    var divVuelos = document.createElement("div");
    divVuelos.setAttribute('id', 'vuelos');
    document.getElementsByClassName('contenedor')[0].appendChild(divVuelos);

    vuelosEncontrados.forEach(vuelo => {
        //pinta los vuelos en un div concreto
        var div1 = document.createElement("div");
        var p = document.createElement("p");

        p.appendChild(document.createTextNode(`Mad → ${vuelo.destino} | ${vuelo.hora} -  ${vuelo.horallegada} | ${vuelo.precio}€`));
        divVuelos.appendChild(div1);
        div1.appendChild(p);
        div1.setAttribute("id", "cajaVuelo");
        div1.setAttribute("class", "cajareserva");
        p.style.fontFamily = 'system-ui';
        p.style.fontWeight = '500';
        p.style.color = '#2E2E5C';

        var botonCompraVuelo = document.createElement("button");
        div1.appendChild(botonCompraVuelo);
        botonCompraVuelo.innerHTML = "Comprar";
        botonCompraVuelo.setAttribute("onclick", `comprar(${vuelo.id})`);
    });
}

/* function comprar(vuelo) {
    var numBilletes = parseInt(document.getElementById("pasajeros").value);
    var vuelos = JSON.parse(localStorage.getItem("vuelos"));
    localStorage.setItem('vueloSeleccionado', JSON.stringify(vuelo));
    localStorage.setItem('numPasajerosReservaActual', numBilletes);
    realizaReserva(vuelo);
    var sesion = JSON.parse(localStorage.getItem("sesion"));
    alert(sesion.estado);
    if (sesion.estado == "open") {
        vuelos.forEach(localVuelo => {
            if (idVuelo == localVuelo.id) {
                //restar asientos
                localVuelo.asientosLibres -= numBilletes;
                //Volvemos a actualizar base de datos con los plazas restantes
                localStorage.setItem("vuelos", JSON.stringify(vuelos));
            }
        });
        window.location = 'reserva.html';
    } else {
        alert('Tienes que iniciar sesion');
    }
} */

function comprar(id) {
    alert(id);
    var numBilletes = parseInt(document.getElementById("pasajeros").value);
    var vuelos = JSON.parse(localStorage.getItem("vuelos"));
    var sesion = JSON.parse(localStorage.getItem("sesion"));
    var vueloSeleccionado = vuelos[id - 1];
    if (sesion.estado == "open") {
        var vuelo = new Vuelo();
        vuelo = vuelo.fromJsonToVuelo(vueloSeleccionado);
        vuelo.vendeBilletes(numBilletes);
        vuelos[id - 1] = vuelo;
        localStorage.setItem('vuelos', JSON.stringify(vuelos));
        //creo una reserva con los datos 
        var reserva = new Reserva(vuelo, numBilletes, numBilletes * parseFloat(vuelo.precio));
        localStorage.setItem("reservaActual", JSON.stringify(reserva));
        window.location = '../reserva/reserva.html';
    } else {
        alert('Tienes que iniciar sesion');
    }
}

(function () {
    var hoy = new Date(Date.now());
    document.getElementById('fecha').setAttribute("min", `${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}`);
})();
