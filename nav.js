function modal(nav) {
    var div = document.createElement("div");
    nav.appendChild(div);
    //div.innerHTML = '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"><img id="iniSes" src="..\\img\\user.png">Iniciar sesión</button><div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Inicia sesión</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><input type="email" placeholder="Email" id="emailIniSes"><input type="password" placeholder="Contraseña" id="passIniSes"><button type="button" class="btn btn-primary" id="iniciarsesion">Iniciar sesion</button></div><div id="registrate"><p>¿Aún no te has registrado? <a href="..//registro//registro.html">Regístrate.</a></p></div></div></div></div>'

    //Boton que lanza el modal
    var launchButton = document.createElement("button");
    launchButton.setAttribute("type", "button");
    launchButton.setAttribute("class", "btn btn-primary");
    launchButton.setAttribute("data-toggle", "modal");
    launchButton.setAttribute("data-target", "#exampleModal");
    var imgUser = document.createElement("img");
    imgUser.setAttribute("id", "iniSes");
    imgUser.setAttribute("src", "..\\img\\user.png");
    launchButton.appendChild(imgUser);
    launchButton.innerText = "Iniciar sesion";
    div.appendChild(launchButton);

    //cuerpo modal
    var divModal = document.createElement("div");
    divModal.setAttribute("class", "modal fade");
    divModal.setAttribute("id", "exampleModal");
    divModal.setAttribute("tabindex", "-1");
    divModal.setAttribute("role", "dialog");
    divModal.setAttribute("aria-labelledby", "exampleModalLabel");
    divModal.setAttribute("aria-hidden", "true");
    div.appendChild(divModal);

    var divCont = document.createElement("div");
    divCont.setAttribute("class", "modal-dialog");
    divCont.setAttribute("role", "document");
    divModal.appendChild(divCont);

    var divCont2 = document.createElement("div");
    divCont2.setAttribute("class", "modal-content");
    divCont.appendChild(divCont2);

    var divHeader = document.createElement("div");
    divHeader.setAttribute("class", "modal-header");
    divCont2.appendChild(divHeader);

    var h5 = document.createElement("h5");
    h5.setAttribute("class", "modal-title");
    divHeader.setAttribute("id", "exampleModalLabel");
    h5.innerText = "Inicia sesión";
    divHeader.appendChild(h5);

    var closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("class", "close");
    closeButton.setAttribute("data-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");
    divHeader.appendChild(closeButton);

    var span = document.createElement("span");
    span.innerHTML = "&times;";
    span.setAttribute("aria-hidden", "true");
    closeButton.appendChild(span);

    var divInputs = document.createElement("div");
    divCont2.appendChild(divInputs);
    divInputs.setAttribute("class", "modal-body");

    var email = document.createElement("input");
    divInputs.appendChild(email);
    email.setAttribute("type", "email");
    email.setAttribute("placeholder", "Email");
    email.setAttribute("id", "emailIniSes");

    var password = document.createElement("input");
    divInputs.appendChild(password);
    password.setAttribute("type", "password");
    password.setAttribute("placeholder", "Contraseña");
    password.setAttribute("id", "passIniSes");

    var iniButton = document.createElement("button");
    divInputs.appendChild(iniButton);
    iniButton.setAttribute("type", "button");
    iniButton.setAttribute("class", "btn btn-primary");
    iniButton.setAttribute("id", "iniciarsesion");
    iniButton.innerText = "Iniciar sesión";
    iniButton.setAttribute("onclick", "iniciarSesion();");

    var divRegis = document.createElement("div");
    divCont2.appendChild(divRegis);
    divRegis.setAttribute("id", "registrate");

    var p = document.createElement("p");
    divRegis.appendChild(p);
    p.innerText = "¿Aún no te has registrado?";

    var enlaceRegis = document.createElement("a");
    p.appendChild(enlaceRegis);
    enlaceRegis.setAttribute("href", "#");
    enlaceRegis.innerText = "Regístrate.";
    enlaceRegis.setAttribute("data-toggle", "modal");
    enlaceRegis.setAttribute("data-target", "#exampleModal2");
    enlaceRegis.setAttribute("data-dismiss", "modal");
    enlaceRegis.setAttribute("aria-label", "Close");
    modal2(div, enlaceRegis);
}

function modal2(div) {
    //cuerpo modal
    var divModal = document.createElement("div");
    divModal.setAttribute("class", "modal fade");
    divModal.setAttribute("id", "exampleModal2");
    divModal.setAttribute("tabindex", "-1");
    divModal.setAttribute("role", "dialog");
    divModal.setAttribute("aria-labelledby", "exampleModalLabel");
    divModal.setAttribute("aria-hidden", "true");
    div.appendChild(divModal);

    var divCont = document.createElement("div");
    divCont.setAttribute("class", "modal-dialog");
    divCont.setAttribute("role", "document");
    divModal.appendChild(divCont);

    var divCont2 = document.createElement("div");
    divCont2.setAttribute("class", "modal-content");
    divCont.appendChild(divCont2);

    var divHeader = document.createElement("div");
    divHeader.setAttribute("class", "modal-header");
    divCont2.appendChild(divHeader);

    var h5 = document.createElement("h5");
    h5.setAttribute("class", "modal-title");
    divHeader.setAttribute("id", "exampleModal2Label");
    h5.innerText = "Registro";
    divHeader.appendChild(h5);

    var closeButton = document.createElement("button");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("class", "close");
    closeButton.setAttribute("data-dismiss", "modal");
    closeButton.setAttribute("aria-label", "Close");
    divHeader.appendChild(closeButton);

    var span = document.createElement("span");
    span.innerHTML = "&times;";
    span.setAttribute("aria-hidden", "true");
    closeButton.appendChild(span);

    var divInputs = document.createElement("div");
    divCont2.appendChild(divInputs);
    divInputs.setAttribute("class", "modal-body");

    var nombre = document.createElement("input");
    divInputs.appendChild(nombre);
    nombre.setAttribute("type", "text");
    nombre.setAttribute("placeholder", "Nombre");
    nombre.setAttribute("id", "nombreRegis");

    var apellidos = document.createElement("input");
    divInputs.appendChild(apellidos);
    apellidos.setAttribute("type", "text");
    apellidos.setAttribute("placeholder", "Apellidos");
    apellidos.setAttribute("id", "apellidosRegis");

    var fechaNacimiento = document.createElement("input");
    divInputs.appendChild(fechaNacimiento);
    fechaNacimiento.setAttribute("type", "date");
    fechaNacimiento.setAttribute("placeholder", "fecha de nacimiento");
    fechaNacimiento.setAttribute("id", "fechaRegis");
    var hoy = new Date(Date.now());
    fechaNacimiento.setAttribute("max", `${hoy.getFullYear()}-${hoy.getMonth() + 1}-${hoy.getDate()}`);


    var tfn = document.createElement("input");
    divInputs.appendChild(tfn);
    tfn.setAttribute("type", "text");
    tfn.setAttribute("placeholder", "Teléfono");
    tfn.setAttribute("id", "tfnRegis");

    var dni = document.createElement("input");
    divInputs.appendChild(dni);
    dni.setAttribute("type", "text");
    dni.setAttribute("placeholder", "DNI");
    dni.setAttribute("id", "dniRegis");

    var email = document.createElement("input");
    divInputs.appendChild(email);
    email.setAttribute("type", "email");
    email.setAttribute("placeholder", "Email");
    email.setAttribute("id", "emailRegis");

    var confirEmail = document.createElement("input");
    divInputs.appendChild(confirEmail);
    confirEmail.setAttribute("type", "email");
    confirEmail.setAttribute("placeholder", "Confirmar email");
    confirEmail.setAttribute("id", "confirEmailRegis");

    var password = document.createElement("input");
    divInputs.appendChild(password);
    password.setAttribute("type", "password");
    password.setAttribute("placeholder", "Contraseña");
    password.setAttribute("id", "passRegis");

    var confirPassword = document.createElement("input");
    divInputs.appendChild(confirPassword);
    confirPassword.setAttribute("type", "password");
    confirPassword.setAttribute("placeholder", "Confirmar contraseña");
    confirPassword.setAttribute("id", "confirPassRegis");

    var regisButton = document.createElement("button");
    divInputs.appendChild(regisButton);
    regisButton.setAttribute("type", "button");
    regisButton.setAttribute("class", "btn btn-primary");
    //iniButton.setAttribute("id", "registrarse");
    regisButton.innerText = "Regístrate";
    regisButton.setAttribute("onclick", "registrarse();");
}

window.onload = () => {
    var nav = document.getElementsByTagName('nav')[0];
    nav.style.width = '100%';
    nav.style.height = '60px';
    nav.style.backgroundColor = 'white';
    nav.style.display = 'flex';
    nav.style.justifyContent = 'space-between';
    nav.style.alignItems = 'center';

    //logo
    var enlaceHome = document.createElement('a');
    enlaceHome.setAttribute('href', '../home/home.html');
    nav.appendChild(enlaceHome);
    var logo = document.createElement('img');
    logo.setAttribute('src', '../img/image.png');
    enlaceHome.appendChild(logo);
    logo.style.width = '275px';

    var sesion = JSON.parse(localStorage.getItem("sesion"));
    if (sesion.estado == 'open') {
        dropDownMenu(nav, sesion);
    } else {
        modal(nav);
    }

}

function dropDownMenu(nav, sesion) {
    //div dropdown
    var dropDownDiv = document.createElement("div");
    dropDownDiv.setAttribute("class", "dropdown")
    dropDownDiv.setAttribute("style", "width: 200px;")
    //button
    var dropDownButton = document.createElement("button");
    dropDownButton.setAttribute("class", "btn btn-secondary dropdown-toggle nav-button")
    dropDownButton.setAttribute("type", "button");
    dropDownButton.setAttribute("id", "iniciarSesion");
    dropDownButton.setAttribute("data-toggle", "dropdown");
    dropDownButton.setAttribute("aria-haspopup", "true");
    dropDownButton.setAttribute("aria-expanded", "false");
    dropDownButton.setAttribute("style", "width: fit-content;");
    dropDownButton.innerHTML = `Hola, ${sesion.usuario.nombre}`;
    dropDownButton.style.backgroundColor = "#2e2e5c";
    dropDownButton.style.borderColor = "white";

    //div dropdown menu
    var dropDownMenu = document.createElement("div");
    dropDownMenu.setAttribute("class", "dropdown-menu");

    var perfil = document.createElement('a');
    perfil.setAttribute("href", "#");
    perfil.setAttribute("class", "dropdown-item");
    perfil.innerHTML = "Perfil";
    dropDownMenu.appendChild(perfil);
    perfil.setAttribute("onclick", "toPerfil()");

    var checkin = document.createElement('a');
    checkin.setAttribute("href", "#");
    checkin.setAttribute("class", "dropdown-item");
    checkin.innerHTML = "Check-In";
    dropDownMenu.appendChild(checkin);
    checkin.setAttribute("onclick", "toCheckin()");

    var cerrarSesion = document.createElement('a');
    cerrarSesion.setAttribute("href", "#");
    cerrarSesion.setAttribute("class", "dropdown-item");
    cerrarSesion.innerHTML = "Cerrar sesion";
    dropDownMenu.appendChild(cerrarSesion);
    cerrarSesion.setAttribute("onclick", "cerrarSesion()");

    dropDownDiv.appendChild(dropDownButton);
    dropDownDiv.appendChild(dropDownMenu);
    nav.appendChild(dropDownDiv);
}

/*-------------------------FUNCIONALIDADES---------------------*/

function toPerfil() {
    localStorage.setItem("pos", "0");
    window.location = "../perfil/perfil.html";
}

function toCheckin() {
    localStorage.setItem("pos", "1");
    window.location = "../perfil/perfil.html";
}

function iniciarSesion() {
    var email = document.getElementById("emailIniSes").value;
    var password = document.getElementById("passIniSes").value;
    var usuarios = new Usuarios();
    usuarios.usuariosFromLocalStorage();
    var usuario = usuarios.datos[email];
    if (usuario && usuario.contrasenia == password) {
        var sesion = new Sesion("open", usuario);
        sesion.guardarSesion();
        location.reload();
    } else {
        alert("Usuario o contraseña incorrectos.")
    }
}

function registrarse() {
    var usuarios = new Usuarios();
    usuarios.usuariosFromLocalStorage();
    var nombre = document.getElementById("nombreRegis").value;
    var apellidos = document.getElementById("apellidosRegis").value;
    var email = document.getElementById("emailRegis").value;
    var password = document.getElementById("passRegis").value;
    var confirEmail = document.getElementById("confirEmailRegis").value;
    var confirPassword = document.getElementById("confirPassRegis").value;
    var dni = document.getElementById("dniRegis").value;
    var fechaNacimiento = document.getElementById("fechaRegis").value;
    var telefono = document.getElementById("tfnRegis").value;

    var respConfir = comprobar(nombre, apellidos, email, confirEmail, password, confirPassword, dni, telefono);
    var usuario = new Usuario(nombre, apellidos, email, password, fechaNacimiento, dni, telefono, fechaNacimiento);
    if (respConfir[0]) {
        if (usuarios.addUsuario(usuario)) {
            usuarios.guardarEnLocalStorage();
            var sesion = new Sesion("open", usuario);
            sesion.guardarSesion();
            window.location = "../home/home.html"
        } else {
            alert("Ya hay una cuenta asociada a este email o DNI");
        }
    } else {
        //respConfir[1].modal('show');
        alert(respConfir[1]);
        //muestraMensaje("hola");
    }
}

function comprobar(nombre, apellidos, email, confirEmail, password, confirPassword, dni, telefono, fechaNacimiento) {
    var correcto = true;
    var mensaje;
    var re = {
        nombre: new RegExp(/^[A-Z\u00C0-\u017F]?[a-z\u00C0-\u017F]+\s?[A-Z\u00C0-\u017F]?[a-z\u00C0-\u017F]*$/),
        apellidos: new RegExp(/^[A-Z\u00C0-\u017F]?[a-z\u00C0-\u017F]+ \s?[A-Z\u00C0-\u017F]?[a-z\u00C0-\u017F]* \s?[A-Z\u00C0-\u017F]?[a-z\u00C0-\u017F]* \s?[A-Z\u00C0-\u017F]?[a-z\u00C0-\u017F]*$/),
        dni: new RegExp(/^[0-9]{8}[A-Z]$/i),
        telefono: new RegExp(/^[0-9]{9}$/),
        email: new RegExp(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/),
        password: new RegExp(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/)
    }
    var campos = Object.keys(re);
    var inputs = [nombre, apellidos, dni, telefono, email, password]
    var i = 0;
    while(correcto && i < campos.length) {
        var correcto = re[campos[i]].test(inputs[i]);
        if(!correcto) {
            mensaje = "El campo " + campos[i] + " no es correcto."
            if(campos[i] == "password") {
                mensaje += "\n La contraseña debe tener al entre 8 y 16 caracteres, \n al menos un dígito, al menos una minúscula \n y al menos una mayúscula. \n NO puede tener otros símbolos"
            }
        }
        i++;
    }

    if(correcto && fechaNacimiento == '') {
        mensaje = "El campo fecha es obligatorio";
        correcto = false;
    }

    if(correcto && email != confirEmail) {
        mensaje = "La confirmacion del email no es correcta";
        correcto = false;
    }

    if(correcto && password != confirPassword) {
        mensaje = "La confirmacion de la contraseña no es correcta";
        correcto = false;
    }

    return[correcto, mensaje];
}

function cerrarSesion() {
    var sesion1 = new Sesion();
    sesion1 = sesion1.getSesion();
    sesion1.cerrarSesion();
    localStorage.setItem("sesion", JSON.stringify(sesion1));
    window.location = "../home/home.html";
}
