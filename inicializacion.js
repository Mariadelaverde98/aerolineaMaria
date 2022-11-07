
/*Script que inicializa nuestra "base de datos" */

var arrayVuelo = [];
var idActual = 0;

function generaId() {
    idActual += 1;
    return idActual;
}

//Generamos 100 fechas disponibles.
function genera100fechas() {
    var hoy = new Date(Date.now());
    var fin = hoy * 1 + 100 * 24 * 3600 * 1000;
    var unDia = 24 * 3600 * 1000;
    var fecha;
    var fechas = [];
    for (let ms = hoy * 1; ms < fin * 1; ms += unDia) {
        fecha = new Date(ms);
        fechas.push(`${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`);
    }
    return fechas;
}

/*3 vuelos diarios a paris*/
function generaVuelosParis(fecha) {
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'París', fecha, '8:00', '10:00', 30, 70));
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'París', fecha, '13:00', '15:10', 30, 95));
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'París', fecha, '19:00', '21:05', 30, 120));
}

/*2 vuelos diarios a Edimburgo*/
function generaVuelosEdimburgo(fecha) {
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'Edimburgo', fecha, '9:00', '14:30', 30, 90));
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'Edimburgo', fecha, '14:00', '19:15', 30, 120));
}

/*1 vuelo diarios a Ciudad de Mexico*/
function generaVuelosMexico(fecha) {
    arrayVuelo.push(new Vuelo(generaId(), 'Madrid', 'Ciudad de Mexico', fecha, '13:00', '6:20', 30, 350));
}

function generaVuelos100dias() {
    var fechas = genera100fechas();
    for (let i = 0; i < fechas.length; i++) {
        generaVuelosParis(fechas[i]);
        generaVuelosMexico(fechas[i]);
        generaVuelosEdimburgo(fechas[i]);

    }
}

(function inicia() {
    var vuelosEnMemoria = localStorage.getItem("vuelos");
    var usuarios = localStorage.getItem("usuarios");
    var sesion = localStorage.getItem("sesion");
    var numReservas = localStorage.getItem("numReservas");
    if (vuelosEnMemoria) {
        arrayVuelo = JSON.parse(vuelosEnMemoria);
    } else {
        generaVuelos100dias();
        localStorage.setItem("vuelos", JSON.stringify(arrayVuelo));
    }
    if (!usuarios) {
        usuarios = new Usuarios();
        usuarios.guardarEnLocalStorage();
    }
    if (!sesion) {
        sesion = new Sesion();
        sesion.cerrarSesion();
        sesion.guardarSesion();
    }
    if (!numReservas) {
        localStorage.setItem("numReservas", JSON.stringify(0));
    }
})();

