//clase sesion que permite conocer si hay una sesion iniciada y que usuario esta en la sesion
class Sesion {
    constructor(estado, usuario) {
        this.estado = estado;
        this.usuario = usuario;
    }
    
    cerrarSesion() {
        this.estado = "close";
        this.usuario = null;
    }

    guardarSesion() {
        localStorage.setItem("sesion", JSON.stringify(this))
    }

    getSesion() {
        return Object.assign(this, JSON.parse(localStorage.getItem("sesion")));
    }
}
