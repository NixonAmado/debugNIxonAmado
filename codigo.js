let idUsuario = document.getElementById('ipt-id-register');
let nombresUsuario = document.getElementById('ipt-nombres-register');
let apellidosUsuario = document.getElementById('ipt-apellidos-register');
let emailUsuario = document.getElementById('ipt-email-register');
let numeroUsuario = document.getElementById('ipt-numero-register');
let paisUsuario = document.getElementById('ipt-pais-register');
let nacimientoUsuario = document.getElementById('ipt-nacimiento-register');
let trContenedor = document.getElementById('table-body');


let formRegistro = document.getElementById('form-register'); 
formRegistro.addEventListener('click', function (e) {
    e.preventDefault();
})
 let formSearch = document.getElementById('form-search'); 
 formSearch.addEventListener('click', function (e) {
     e.preventDefault();
  })

let formVideoJuegos = document.getElementById('form-videoJuego'); 
formVideoJuegos.addEventListener('click', function (e) {
     e.preventDefault();
 })
 let formCompras = document.getElementById('form-compras'); 
 formCompras.addEventListener('click', function (e) {
     e.preventDefault();
 })




// creacion del array de objetos ("base de datos");
let usuarios = [];



// eventos
let btnRegistro = document.getElementById('btn-register');
btnRegistro.addEventListener('click', function () {
    validarForm(agregarUsuario, formRegistro);
  })

let btnVideoJuegos = document.getElementById('form-videoJuego-btn');
btnVideoJuegos.addEventListener('click', function () {
    validarForm(agregarVideoJuego, formVideoJuegos);
  })

let btnSearch = document.getElementById('form-btn-search');
btnSearch.addEventListener('click', buscar);




function validarForm(funcion, formulario){
  // devuelve false si por lo menos un campo esta vacio | devuelve true si todos los campos estan LLENOS 
  const inputAñadir = formulario.querySelectorAll('input');
  let CamposVacios = [...inputAñadir].some((elemento) => elemento.value.trim() === "");
    CamposVacios ? alert("Debes llenar todo el formulario") : funcion();
  }


    function agregarUsuario() {
        let usuario = {
            idU : idUsuario.value,
            nombresU : nombresUsuario.value,
            apellidosU : apellidosUsuario.value,
            emailU : emailUsuario.value,
            numeroU : numeroUsuario.value,
            paisU : paisUsuario.value,
            nacimientoU : nacimientoUsuario.value,
            fidelizacion : "",
        }
        // añade el objeto a un arreglo de objetos
        usuarios.push(usuario);

        
        trContenedor.innerHTML+= 
        `
        <tr class="fila-contenedora text-center">
            <th scope="row" id="td-id">${usuario.idU}</th>
            <td>${usuario.nombresU}</td>
            <td>${usuario.apellidosU}</td>
            <td>${usuario.emailU}</td>
            <td>${usuario.numeroU}</td>
            <td>${usuario.nacimientoU}</td>
            <td>${usuario.paisU}</td>

            <td id="td-botones" class="text-center">
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" onclick="eliminarFila(this)" class="btn btn-danger">Borrar</button>
                    <button type="button" onclick="editarFila(this)" class="btn btn-success">Editar</button>
                </div>
            </td>
        </tr>
        `   
        formRegistro.reset();
    }

    function buscar() {
        const buscado = document.getElementById('search-input').value.toLowerCase();
        const rows = trContenedor.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; i++) {
            const columns = rows[i].children;
            let found = false;
            for (let j = 0; j < columns.length; j++) {
                const columnValue = columns[j].textContent.toLowerCase();
                if (columnValue.indexOf(buscado) == 0) {
                    found = true;
                    break;
                }
            }
            if (found) {
                rows[i].style.display = '';
            } else {
                rows[i].style.display = 'none';
            }
        }
    }
    

    function eliminarFila(btnEliminar) {
        let fila = btnEliminar.closest('.fila-contenedora');
        let idFila =fila.querySelector('#td-id').textContent
        // eliminar del array de objetos
        usuarios = usuarios.filter(usuario => usuario.idU != idFila)
        fila.remove();
    }

// array que contiene los valores antes de editar 
let valoresAntesEditar = [];

    function editarFila(btnEditar) {
        // reseteo el array a cada entrada
        valoresAntesEditar = [];
        let filaAEditar = btnEditar.closest('.fila-contenedora');
        [...filaAEditar.children].forEach((columna) =>{

            if(columna.id != 'td-botones'){
                valoresAntesEditar.push(columna.textContent);
                columna.innerHTML = `<input type="text" value="${columna.textContent}">`
            }
            else{
                let btnsContenedor =columna.firstElementChild
                btnsContenedor.innerHTML = `<button type="button" onclick="GuardarCambios(this)" class="btn btn-warning">Guardar</button>`
            }
        })
    }

// array que contiene los valores despues de editar 
let valoresDespuesEditar = [];


    function GuardarCambios(btnGurdar){
        // reseteo el array a cada entrada
        valoresDespuesEditar = [];
        let filaAGuardar = btnGurdar.closest('.fila-contenedora');
        [...filaAGuardar.children].forEach((columna) =>{
            if(columna.id != 'td-botones'){
                valoresDespuesEditar.push(columna.firstElementChild.value);
                columna.textContent = columna.firstElementChild.value
            }
            else{
                let btnsContenedor =columna.firstElementChild
                btnsContenedor.innerHTML = ` <button type="button" onclick="eliminarFila(this)" class="btn btn-danger">Borrar</button>
                <button type="button" onclick="editarFila(this)" class="btn btn-success">Editar</button>`
            }
        })

        
    let usuarioEditado ={
        idU : valoresDespuesEditar[0],
        nombresU : valoresDespuesEditar[1],
        apellidosU : valoresDespuesEditar[2],
        emailU : valoresDespuesEditar[3],
        numeroU : valoresDespuesEditar[4],
        paisU : valoresDespuesEditar[5],
        nacimientoU : valoresDespuesEditar[6],
        }

        usuarios.forEach((usuario,index) => usuario.idU == valoresAntesEditar[0] ? usuarios[index] = usuarioEditado : "" ) ;

    }

    



    // seccion gestion de videoJuegos

const urlImagenVideoJuego= document.getElementById('url-videoJuego')
const idVideoJuego = document.getElementById('ipt-id-videoJuego');
const nombreVideoJuego = document.getElementById('ipt-nombre-videoJuego');
const tematicaVideoJuego = document.getElementById('ipt-tematica-videoJuego');
const valorVideoJuego = document.getElementById('ipt-valor-videoJuego');
const fidelizacionVideoJuego = document.getElementById('ipt-fidelizacion-videoJuego');


//videoJUego por definicion


let videoJuegos = [{
    imagenVJ :"https://i.blogs.es/c97ab3/trucos-san-andreas-1/1366_2000.jpg",
    idVJ : "1",
    nombreVJ :"GTA San Andres",
    tematicaVJ : "rolePlay",
    valorVJ : "70000",
    fidelizacionVJ : "100"
}]



   function agregarVideoJuego() {
    let videoJuego =
        {
           imagenVJ : urlImagenVideoJuego.value,
           idVJ : idVideoJuego.value,
           nombreVJ : nombreVideoJuego.value,
           tematicaVJ : tematicaVideoJuego.value,
           valorVJ : valorVideoJuego.value,
           fidelizacionVJ : fidelizacionVideoJuego.value
       }
   
    videoJuegos.push(videoJuego);

    let contenedorCards = document.getElementById('contenedor-cards');
    contenedorCards.innerHTML+=
    `
    <div class="col  contenedor-card card-shadow">
        <div class="card h-100 ">
          <img src="${videoJuego.imagenVJ}" class="card-img-top " height="250px" alt="imagen del VideoJuego"/>
          <div class="card-body bg-gray border-3 p-2">
            <h5 class="card-title text-center ">${videoJuego.nombreVJ}</h5>
            
            <table class="table">
              <tbody class="text-center ">
                <tr>
                  <th scope="row" class="rounded-start gradiente-rojo"><i class=" fa-sharp fa-solid fa-hashtag fa-beat"></i></th>
                  <td colspan="1" class="table-active rounded-end text-white gradiente-negro"  id="contenedor-id">${videoJuego.idVJ}</td>
                </tr>
                <tr>
                    <th scope="row" class="rounded-start gradiente-rojo"><i class="fa-solid fa-gamepad fa-beat-fade fa-sm" style="color: #000000;"></i></th>
                    <td colspan="1" class="table-active rounded-end gradiente-negro text-white">${videoJuego.tematicaVJ} </td>
                </tr>
                <tr>
                  <th scope="row" class="rounded-start gradiente-rojo"><i class=" fa-duotone fa-dollar-sign fa-beat" style="--fa-primary-color: #000000; --fa-primary-opacity: 1; --fa-secondary-color: #000000; --fa-secondary-opacity: 0.4;"></i> 
                  </th>
                  <td colspan="1" class="table-active rounded-end gradiente-negro text-white">${videoJuego.valorVJ}</td>
                </tr>
                <tr>
                  <th scope="row" class="rounded-start gradiente-rojo"><i class=" fa-solid fa-crown fa-beat" style="color: #000000;"></i></th>
                  <td colspan="1" class="table-active rounded-end gradiente-negro text-white">${videoJuego.fidelizacionVJ}</td>
                </tr>
              </tbody>
            </table>
            <button class="btn btn-primary d-block" onclick="eliminarCard(this)" type="button">Eliminar</button>
          </div>  
        </div>
    </div>

    `
    formVideoJuegos.reset();
}


function eliminarCard(btnCardEliminar){
    //se supone que id es unico para cada card, el nombre puede que no 
    idCard = btnCardEliminar.closest('.card-body').querySelector('#contenedor-id').textContent;
    // borrar del array de objetos
    videoJuegos = videoJuegos.filter((VideoJuego) => VideoJuego.idVJ != idCard.trim());
    // borrar card
    btnCardEliminar.closest('.contenedor-card').remove();

}



// seccion de compras 

const formBtnCompras = document.getElementById('form-compras-btn').addEventListener('click', añadirTicket); 
const selectNomCompras = document.getElementById('select-nombre-compras');
const selectJuegoCompras = document.getElementById('select-videoJuego-compras');


function añadirOpciones() {
    let btnTabCompra = document.getElementById('compras-tab');
    let btnTabResumen = document.getElementById('resumen-tab');

    if(btnTabCompra.hasAttribute('disabled')){
        btnTabCompra.removeAttribute('disabled');
        btnTabResumen.setAttribute('disabled', '');
    }
    selectNomCompras.innerHTML = "";
    selectJuegoCompras.innerHTML = "";
    usuarios.forEach(usuario => {
        let option = document.createElement('option'); 
        option.value = usuario.nombresU
        option.textContent = usuario.nombresU
        selectNomCompras.appendChild(option);
            }
        )
    videoJuegos.forEach((videoJuego) => {
        let option = document.createElement('option'); 
        option.value = videoJuego.nombreVJ;
        option.textContent = videoJuego.nombreVJ;
        selectJuegoCompras.appendChild(option); 
        }
    )   
}



function añadirTicket(){    

    let datosUsuario = usuarios.filter((e) => e.nombresU == selectNomCompras.value);
    let datosJuego = videoJuegos.filter((e) => e.nombreVJ == selectJuegoCompras.value);
     // calculo de impuestos
    let valorNeto = (Number(datosJuego[0]['valorVJ']) * 1.04 )* 1.16; 
    let contenedorTicket = document.getElementById('contenedor-ticket');
    contenedorTicket.innerHTML =`
    <div class="col-md-12">
                    <form id="form-ficha" >
                          <h3 class="text-center bg-dark text-white" >FICHA DE PAGO</h3>
                        </div>
                        <div class="col-md-4">
                          <label for="ipt-idU-ticket" class="form-label">cc</label>
                          <input type="text" class="form-control" id="ipt-idU-ticket" value="${datosUsuario[0]['idU']}" disabled>
                        </div>
                        <div class="col-md-4">
                          <label for="ipt-nombreU-ticket" class="form-label">Nombres</label>
                          <input type="text" class="form-control" id="ipt-nombreU-ticket" value="${datosUsuario[0]['nombresU']}" disabled>
                        </div>
                        <div class="col-md-4">
                          <label for="ipt-nombreU-ticket" class="form-label">Apellidos</label>
                          <input type="text" class="form-control" id="ipt-nombreU-ticket" value="${datosUsuario[0]['apellidosU']}" disabled>
                        </div>
                        <div class="col-md-4">
                          <label for="ipt-emailU-ticket" class="form-label">Email</label>
                          <div class="input-group">
                            <span class="input-group-text" id="inputGroupPrepend2">@</span>
                            <input type="text" class="form-control" id="Email"  aria-describedby="inputGroupPrepend2" value="${datosUsuario[0]['emailU']} "disabled>
                          </div>
                        </div>
                        <div class="col-md-4">
                          <label for="ipt-numeroU-ticket" class="form-label">numero</label>
                          <input type="text" class="form-control" id="ipt-numero-ticket" value="${datosUsuario[0]['numeroU']} " disabled>
                        </div>

                        <div class="col-md-4">
                          <label for="ipt-pais-ticket" class="form-label">pais</label>
                          <input type="text" class="form-control" id="ipt-pais-ticket" value="${datosUsuario[0]['paisU']}" disabled>
                        </div>
                        <div class="col-md-4">
                          <label for="ipt-pais-ticket" class="form-label">fecha de nacimiento</label>
                          <input type="text" class="form-control" id="ipt-pais-ticket" value="${datosUsuario[0]['nacimientoU']}" disabled>
                        </div>
                        <!-- informacion videojuego -->
                        <div class="col-md-12">
                          <h5 class="bg-gray text-dark text-center"> informacion del videoJuego </h5>
                        </div>
                        <div class="col-md-2">
                          <label for="ipt-idU-ticket" class="form-label"> id</label>
                           <input type="text" class="form-control bg-white" value="${datosJuego[0]['idVJ']}" id="ipt-idU-ticket" value="Mark" disabled>
                        </div>
                        <div class="col-md-5">
                          <label for="ipt-nombreU-ticket" class="form-label"> nombre </label>
                          <input type="text" class="form-control" id="ipt-nombreU-ticket" value="${datosJuego[0]['nombreVJ']}" disabled>
                        </div>
                        <div class="col-md-5">
                          <label for="ipt-nombreU-ticket" class="form-label">tematica</label>
                          <input type="text" class="form-control" id="ipt-nombreU-ticket" value="${datosJuego[0]['tematicaVJ']}" disabled>
                        </div>
                        <div class="col-md-6">
                          <label for="ipt-emailU-ticket" class="form-label">valor con impuestos</label>
                          <div class="input-group">
                            <input type="text" class="form-control" id="Email"  aria-describedby="inputGroupPrepend2" value="${valorNeto}" disabled>
                          </div>
                        </div>

                        <div class="col-md-6">
                          <label for="ipt-pais-ticket" class="form-label">fidelizacion</label>
                          <input type="text" class="form-control" id="ipt-pais-ticket" value="${datosJuego[0]['fidelizacionVJ']}" disabled>
                        </div>
                        <div class="col-md-12">
                            <button type="button" class="btn btn-success text-center w-100 mb-5" onclick="mostrarTab('resumen')">Comprar</button>
                        </div>
    `
}

function mostrarTab(tabId) {
    let formFichaDePago = document.getElementById("form-ficha")
    formFichaDePago.reset()
    let tab = document.getElementById(tabId);
    let tabLink = document.getElementById(tabId + '-tab');
    let btnTabCompra = document.getElementById('compras-tab');
    let btnTabResumen = document.getElementById('resumen-tab');
    
    if(btnTabResumen.hasAttribute('disabled')){
        btnTabResumen.removeAttribute('disabled');
        btnTabCompra.setAttribute('disabled', '');
    }

    if (tab && tabLink) {
      let tabs = new bootstrap.Tab(tabLink);
      tabs.show();
    }
    resumen()

}


function resumen(){
    
    let datosUsuario = usuarios.filter((e) => e.nombresU == selectNomCompras.value);
    let datosJuego = videoJuegos.filter((e) => e.nombreVJ == selectJuegoCompras.value);
    usuarios.forEach((e) => e.nombresU == selectNomCompras.value ? e.fidelizacion = datosJuego[0]['fidelizacionVJ'] : "")
    
     // calculo de impuestos
    let valorNeto = (Number(datosJuego[0]['valorVJ']) * 1.04 )* 1.16; 
    let factura = document.getElementById('factura');
    factura.innerHTML =`
    
              <div class="card mb-3 w-75 m-auto">
            <div class="row g-0">
              <div class="col-lg-4 d-flex">
              <div class="img-container">
                <img src="${datosJuego[0]['imagenVJ']} " class="img-fluid rounded-start" alt="...">
              </div>
                </div>
              <div class="col-md-8">
                <div class="card-body">
                <div class="col-md-12">
                <form id="form-ficha" >
                      <h3 class="text-center bg-dark text-white" >Detalles de la compra</h3>
                    </div>
                    <div class="col-md-12">
                      <label for="ipt-idU-ticket" class="form-label">cc</label>
                      <input type="text" class="form-control" id="ipt-idU-ticket" value="${datosUsuario[0]['idU']}" disabled>
                    </div>
                    <div class="col-md-12">
                      <label for="ipt-nombreU-ticket" class="form-label">Nombres</label>
                      <input type="text" class="form-control" id="ipt-nombreU-ticket" value="${datosUsuario[0]['nombresU']}" disabled>
                    </div>
                    <div class="col-md-12">
                      <label for="ipt-nombreU-ticket" class="form-label">Apellidos</label>
                      <input type="text" class="form-control" id="ipt-nombreU-ticket" value="${datosUsuario[0]['apellidosU']}" disabled>
                    </div>
                    <div class="col-md-12">
                      <label for="ipt-emailU-ticket" class="form-label">Email</label>
                      <div class="input-group">
                        <span class="input-group-text" id="inputGroupPrepend2">@</span>
                        <input type="text" class="form-control" id="Email"  aria-describedby="inputGroupPrepend2" value="${datosUsuario[0]['emailU']} "disabled>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <label for="ipt-numeroU-ticket" class="form-label">numero</label>
                      <input type="text" class="form-control" id="ipt-numero-ticket" value="${datosUsuario[0]['numeroU']} " disabled>
                    </div>
                   
                    
                    <!-- informacion videojuego -->
                    <div class="col-md-12">
                      <h3 class="bg-gray text-dark text-center"> informacion del videoJuego </h3>
                    </div>
                    <div class="col-md-12">
                      <label for="ipt-nombreU-ticket" class="form-label"> nombre </label>
                      <input type="text" class="form-control" id="ipt-nombreU-ticket" value="${datosJuego[0]['nombreVJ']}" disabled>
                    </div>
                    <div class="col-md-12">
                      <label for="ipt-nombreU-ticket" class="form-label">tematica</label>
                      <input type="text" class="form-control" id="ipt-nombreU-ticket" value="${datosJuego[0]['tematicaVJ']}" disabled>
                    </div>
                    <div class="col-md-12">
                      <label for="ipt-emailU-ticket" class="form-label">valor con impuestos</label>
                      <div class="input-group">
                        <input type="text" class="form-control" id="Email"  aria-describedby="inputGroupPrepend2" value="${valorNeto}" disabled>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <label for="ipt-pais-ticket" class="form-label">fidelizacion</label>
                      <input type="text" class="form-control" id="ipt-pais-ticket" value="${datosJuego[0]['fidelizacionVJ']}" disabled>
                    </div>
                        
      </div>
    </div>
  </div>
</div>
`
    puntuacion();
}



function puntuacion() {
    console.log(usuarios)
    let datosUsuario = usuarios.filter((e) => e.nombresU == selectNomCompras.value);
    tBody = document.getElementById('table-body-fidelizacion');
    tBody.innerHTML+=`
    <tr>
        <th scope="col">${datosUsuario[0]['nombresU']} </th>
        <th scope="col">${datosUsuario[0]['apellidosU']}</th>
        <th scope="col">${datosUsuario[0]['fidelizacion']}</th>
    </tr>

    `    
}