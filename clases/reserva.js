class Reserva {
    constructor(vuelo, numBilletes, precio) {
        this.vuelo = vuelo; //objeto de tipo Vuelo
        this.numBilletes = numBilletes;
        this.precio = precio;
        this.pasajeros; //Array de JSONs con los datos de los pasajeros
        this.metodoPago; //JSON con los datos de pago
    }
}
