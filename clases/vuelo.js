//Clase vuelo para almacenar todos los datos de los vuelos
class Vuelo {
    constructor(id, origen, destino, fecha, hora, horallegada, asientosLibres, precio) {
        this.id = id;
        this.origen = origen;
        this.destino = destino;
        this.fecha = fecha;
        this.hora = hora;
        this.horallegada = horallegada;
        this.asientosLibres = asientosLibres;
        this.precio = precio;
        this.asientos = [[0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0]];
    }

    fromJsonToVuelo(json) {
        return Object.assign(this, json);
    }

    vendeBilletes(numBilletes) {
        this.asientosLibres -= numBilletes;
    }
}
