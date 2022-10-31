
document.body.innerHTML = '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Launch demo modal</button><div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Inicia sesión</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><input type="email" placeholder="Email" id="emailIniSes"><input type="password" placeholder="Contraseña" id="passIniSes"><button type="button" class="btn btn-primary">Iniciar sesion</button></div><div id="registrate"><p>¿Aún no te has registrado? <a href="#">Regístrate.</a></p></div></div></div></div>'

div.innerHTML = '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal"><img id="iniSes" src="..\\img\\user.png">Iniciar sesión</button><div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="exampleModalLabel">Inicia sesión</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><input type="email" placeholder="Email" id="emailIniSes"><input type="password" placeholder="Contraseña" id="passIniSes"><button type="button" class="btn btn-primary" id="iniciarsesion">Iniciar sesion</button></div><div id="registrate"><p>¿Aún no te has registrado? <a href="..//registro//registro.html">Regístrate.</a></p></div></div></div></div>'
/*
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    Launch demo modal
  </button>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Inicia sesión</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <input type="email" placeholder="Email" id="emailIniSes">
          <input type="password" placeholder="Contraseña" id="passIniSes">
          <button type="button" class="btn btn-primary">Iniciar sesion</button>
        </div>
        <div id="registrate">
          <p>¿Aún no te has registrado? <a href="#">Regístrate.</a></p>
        </div>
      </div>
    </div>
  </div>
*/


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

//cuerpo modal
var divModal = document.createElement("div");
divModal.setAttribute("class", "modal fade");
divModal.setAttribute("id", "exampleModal");
divModal.setAttribute("tabindex", "-1");
divModal.setAttribute("role", "dialog");
divModal.setAttribute("aria-labelledby", "exampleModalLabel");
divModal.setAttribute("aria-hidden", "true");

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
closeButton.setAttribute("data-dismiss", "Close");
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

var divRegis = document.createElement("div");
divCont2.appendChild(divRegis);
divRegis.setAttribute("id", "registrate");

var p = document.createElement("p");
divRegis.appendChild(p);
p.innerText = "¿Aún no te has registrado?";

var enlaceRegis = document.createElement("a");
p.appendChild(enlaceRegis);
enlaceRegis.setAttribute("href", "..//registro//registro.html");
enlaceRegis.innerText = "Regístrate.";



