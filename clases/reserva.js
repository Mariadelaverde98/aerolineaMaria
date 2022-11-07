//Clase reserva que permite almacenar todos los datos de las reservas que hace un usuario
class Reserva {
    constructor(id, vuelo, numBilletes, precio) {
        this.id = id;
        this.vuelo = vuelo; //objeto de tipo Vuelo
        this.numBilletes = numBilletes;
        this.precio = precio;
        this.pasajeros; //Array de JSONs con los datos de los pasajeros
        this.metodoPago; //JSON con los datos de pago
        this.checkin = false;
        this.asientos = [];
        this.facturaEquipaje = false;
    }
}

