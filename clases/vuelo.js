//creamos con el constructor una nueva clase vuelo con los siguientes datos:
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
/* 
class Vuelos {
    constructor(vuelos) {
        this.datos = this.datos; //debe ser un array con objetos de la clase Vuelo.
    }

    buscaVuelos(destino, fecha, numPasajeros) {
        return this.datos.filter(vuelo => vuelo.destino == destino && vuelo.fecha == fecha && numPasajeros <= vuelo.asientosLibres);
    }

    fromJsonToVuelos(json) {
        return Object.assign(this, json);
    }
} */