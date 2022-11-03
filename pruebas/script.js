/* function comprobar(nombre) {
    var correcto = true;
    var mensaje;
    var re = {
        nombre: new RegExp(/^[A-Z]{1}[a-z]+$/),
        apellidos: new RegExp(/^[A-Z]{1}[a-z]+\s?[A-Z]?[a-z]*\s?[A-Z]?[a-z]*$/),
        dni: new RegExp(/^[0-9]{8}[A-Z]$/i),
        telefono: new RegExp(/^[0-9]{9}$/),
        email: new RegExp(/^[a-zA-Z]+@[a-zA-Z]+.[a-zA-Z]{3}$/)
    }
    var campos = Object.keys(re);
    var i = 0;
    while(correcto && i < 1) {
        correcto = re[campos[i]].test(nombre);
        if(!correcto) {
            mensaje = "El campo " + campos[i] + " no es correcto."
        }
        i++;
    }

    return[correcto, mensaje];
}

console.log(comprobar("Mari3a")); */

var hoy = new Date(Date.now());
var fecha = new Date(2022, 10, 1, 0, 0, 0);
var unDia = 3600 * 1000;
console.log((fecha.getTime() - Date.now())/unDia)
var fecha1 = moment('2022-10-31 20:30:00');
var fecha2 = moment('2022-11-01 00:00:01');

console.log(fecha2.diff(fecha1, 'h'), ' horas de diferencia');
console.log(moment('2022-11-01 00:00:01').startOf('hour').fromNow())


function calcularDiferenciaHoras(fecha1, fecha2) {
    let diferencia = (fecha2.getTime() - fecha1.getTime()) / 1000;
    diferencia /= (60 * 60);
    return Math.abs(diferencia);
}
console.log(calcularDiferenciaHoras(hoy, fecha))
