/*
Los usuarios se guardaran en el local storage de en una variable
usurarios como la siguiente:
usuarios = {
    datos: {
        emailUsuario1: objetoUsuario1,
        emailUsuario2: objetoUsuario2
    }
}*/

class Usuario {
    constructor(nombre, apellidos, email, contrasenia, fechaNacimiento, dni, telefono) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.email = email;
        this.contrasenia = contrasenia;
        this.fechaNacimiento = fechaNacimiento;
        this.dni = dni;
        this.telefono = telefono;
        this.points = 0;
        this.historialReservas = [];
    }

    cambiaContrasenia(contrasenia, nuevaContrasenia) {
        var cambiada = false;
        if (contrasenia == this.contrasenia) {
            this.contrasenia = nuevaContrasenia;
        }
        return cambiada;
    }
    fromJsonToUsuario(json) {
        return Object.assign(this, json);
    }
}

class Usuarios {
    constructor() {
        this.datos = {};
    }

    /*aniade un usuario al json de usuarios en caso de que no exista ningun
    usuario con ese email y ese dni*/
    addUsuario(usuario) {
        var aniadido = false
        if(!this.datos[usuario.email] && !this.existeDni(usuario.dni)) {
            this.datos[usuario.email] = usuario;
            aniadido = true;
        }
        return aniadido;
    }

    /*Elimina un usuario de nuestra "base de datos"*/
    darDeBajaUsuraio(usuario) {

    }

    /* comprueba si existe un usuario con el dni pasado como parametro */
    existeDni(dni) {
        var existe = false;
        var emails = Object.keys(this.datos);
        var i = 0;
        while(!existe && i < emails.length) {
            if(this.datos[emails[0]].dni == dni) {
                existe = true;
            }
            i++;
        }
        return existe;
    }

    guardarEnLocalStorage() {
        localStorage.setItem("usuarios", JSON.stringify(this));
    }

    usuariosFromLocalStorage() {
        return Object.assign(this, JSON.parse(localStorage.getItem("usuarios")));
    }
}


