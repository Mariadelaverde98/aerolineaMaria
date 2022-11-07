
/*Funcion que al realizar una busqueda muetsra un resumen en la parte superior de la pantalla
con los datos de la busqueda realizada y que incluye un boton para editar la busqueda*/
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
        editarBusqueda.style.borderRadius = "5px"
        editarBusqueda.setAttribute('onclick', 'editarBusqueda()');
    } else {
        divs[1].style.display = 'flex';
        divs[1].getElementsByTagName('p')[0].innerHTML = `MAD → ${destino} |  Fecha: ${fecha} | Número de pasajeros: ${numPasajeros}`;
    }

}

/*Esconde el resumen de la busqueda y vuelve a mostrar el panel de busqueda inicial */
function editarBusqueda() {
    document.getElementsByClassName('busqueda')[0].style.display = 'flex';
    document.getElementsByClassName('busqueda')[1].style.display = 'none';
    var vuelos = document.getElementById('vuelos');
    vuelos.parentNode.removeChild(vuelos);
}

/*Funcion que busca los vuelos existentes en el localStorage en base a los campos
fecha destino y numero de pasajeros */
function buscarVuelos() {
    var vuelos = JSON.parse(localStorage.getItem("vuelos"));
    var destinoBusq = document.getElementsByTagName('select')[0].value;
    var numPasajerosBusq = document.getElementById('pasajeros').value;
    var fechaBusq = document.getElementById('fecha').value;
    if (fechaBusq[fechaBusq.length - 2] == '0') {
        fechaBusq = fechaBusq.substring(0, fechaBusq.length - 2) + fechaBusq[fechaBusq.length - 1];
    }
    if (fechaBusq[5] == '0') {
        fechaBusq = fechaBusq.substring(0, 5) + fechaBusq.substring(6);
    }
    var vuelosEncontrados = vuelos.filter(vuelo => vuelo.destino == destinoBusq && vuelo.fecha == fechaBusq && numPasajerosBusq <= vuelo.asientosLibres);
    pintarVuelos(vuelosEncontrados);
}

/*Mueestra todos los vuelos que concuerden con la busqueda realizada */
function pintarVuelos(vuelosEncontrados) {
    var divVuelos = document.createElement("div");
    divVuelos.setAttribute('id', 'vuelos');
    document.getElementsByClassName('contenedor')[0].appendChild(divVuelos);

    if(vuelosEncontrados.length == 0) {
        divVuelos.appendChild(document.createTextNode("No se han encontrado vuelos para esta búsqueda.\n Por favor revise que todos los campos de búsqueda se hayan completado correctamente."))
    }

    vuelosEncontrados.forEach(vuelo => {
        //pinta los vuelos en un div concreto
        var div1 = document.createElement("div");
        divVuelos.appendChild(div1);
        var datosVuelo = document.createElement("div");
        div1.appendChild(datosVuelo);
        datosVuelo.style.display = "flex";
        var datosOrigen = document.createElement("div");
        var datosDestino = document.createElement("div");
        datosOrigen.setAttribute("class", "datosOrgineDestino");
        datosDestino.setAttribute("class", "datosOrgineDestino");


        datosVuelo.appendChild(datosOrigen);
        var p1 = document.createElement('p');
        var p2 = document.createElement('p');
        p1.setAttribute("class", "datos_vuelos");
        p2.setAttribute("class", "datos_vuelos");
        p1.innerText = `${vuelo.hora}`;
        p2.innerText = "MAD";
        p2.style.fontSize = "inherit";
        datosOrigen.appendChild(p1);
        datosOrigen.appendChild(p2);

        var separador = document.createElement("div");
        separador.setAttribute("class", "separador");
        datosVuelo.appendChild(separador);
        var avion = document.createElement("img");
        avion.setAttribute("src", "../img/icono_avion2 .png");
        avion.setAttribute("class", "icon_avion");
        datosVuelo.appendChild(avion);
        var separador2 = document.createElement("div");
        separador2.setAttribute("class", "separador");
        datosVuelo.appendChild(separador2);

        datosVuelo.appendChild(datosDestino);
        var p3 = document.createElement('p');
        var p4 = document.createElement('p');
        p3.setAttribute("class", "datos_vuelos");
        p4.setAttribute("class", "datos_vuelos");
        p3.innerText = `${vuelo.horallegada}`;
        p4.innerText = `${vuelo.destino}`;
        p4.style.fontSize = "inherit";
        datosDestino.appendChild(p3);
        datosDestino.appendChild(p4);
        div1.setAttribute("id", "cajaVuelo");
        div1.setAttribute("class", "cajareserva");

        var botonCompraVuelo = document.createElement("button");
        div1.appendChild(botonCompraVuelo);
        botonCompraVuelo.innerHTML = "Comprar por " + parseInt(document.getElementById('pasajeros').value)*vuelo.precio + "€";
        botonCompraVuelo.setAttribute("onclick", `comprar(${vuelo.id})`);
    });
}

/*Al pulsar en el boton comprar de una tarjeta de un vuelo dado se inicia el proceso de reserva del vuelo.
Para ello se crea un objeto reserva que almacena todos los datos relevantes y se guarda en el localStorage */
function comprar(id) {
    var numBilletes = parseInt(document.getElementById("pasajeros").value);
    var vuelos = JSON.parse(localStorage.getItem("vuelos"));
    var sesion = JSON.parse(localStorage.getItem("sesion"));
    var vueloSeleccionado = vuelos[id - 1];
    var puedeComprar;
    if (sesion.estado == "open") {
        puedeComprar = puedeComprarVuelosUser(sesion.usuario, numBilletes, id);
        if (puedeComprar[0]) {
            var idReserva = JSON.parse(localStorage.getItem("numReservas"));
            localStorage.setItem("numReservas", JSON.stringify(idReserva + 1));
            var reserva = new Reserva(idReserva + 1, vueloSeleccionado, numBilletes, numBilletes * parseFloat(vueloSeleccionado.precio));
            localStorage.setItem("reservaActual", JSON.stringify(reserva));
            window.location = '../reserva/reserva.html';
        } else {
            alert('Ya has comprado ' + puedeComprar[1] + ' billetes para este vuelo y no esta permitido \n comprar más de 10 billetes para un mismo vuelo.');
        }
    } else {
        alert('Tienes que iniciar sesion');
    }
}

/*Funcion que comprueba que el usuario que ha iniciado sesion no compre mas de 10 billetes de un mismo vuelo*/
function puedeComprarVuelosUser(usuario, numBilletes, idVuelo) {
    var reservasVuelo = usuario.historialReservas.filter(reserva => reserva.vuelo.id == idVuelo);
    var numBilletesComprados = 0;
    for (let i = 0; i < reservasVuelo.length; i++) {
        numBilletesComprados += reservasVuelo[i].numBilletes;
    }

    return [numBilletesComprados + numBilletes <= 10, numBilletesComprados];
}

/*Funcion que establece la fecha minima a partir de la cual se puede buscar un vuelo.*/
(function () {
    var hoy = new Date(Date.now());
    document.getElementById('fecha').setAttribute("min", `${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}`);
})();
