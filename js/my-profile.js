//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    let User = JSON.parse(localStorage.getItem("InformacionUser"));

    document.getElementById("nombre").value = User.nombre;
    document.getElementById("edad").value = User.edad;
    document.getElementById("correo").value = User.correo;
    document.getElementById("telefono").value = User.telefono ;
    
        document.getElementById("editarDatos").addEventListener("click", () =>{
        document.getElementById("nombre").removeAttribute("disabled");
        document.getElementById("edad").removeAttribute("disabled");
        document.getElementById("correo").removeAttribute("disabled");
        document.getElementById("telefono").removeAttribute("disabled");
    })
});

function validar(event){

let nombreInput = document.getElementById("nombre").value;
let nombreExpress = /^[a-zA-ZÀ-ÿ\ñ\Ñ]+(\s*[a-zA-ZÀ-ÿ\ñ\Ñ]*)*[a-zA-ZÀ-ÿ\ñ\Ñ]+$/
let celularInput = document.getElementById("telefono").value;
let celularExpress = /^\d{9,12}$/;


if (!nombreExpress.test(nombreInput)){
    alert("Acepta solo caracteres");
    event.preventDefault();
} 
if ((document.getElementById("edad").value) < 18) {
    alert("Debes ser mayor de 18");
    event.preventDefault();
} 
if (!celularExpress.test(celularInput)){
    alert("El número de celular debe ser entre 9 y 12 dígitos");
    event.preventDefault();
} 

guardarDatos()
}

function guardarDatos(){
    
    let usuarioInfo = {
        nombre : document.getElementById("nombre").value,
        edad : document.getElementById("edad").value,
        correo : document.getElementById("correo").value,
        telefono : document.getElementById("telefono").value
    };

    let usuarioInfoString = JSON.stringify(usuarioInfo);
    localStorage.setItem("InformacionUser", usuarioInfoString)

    document.getElementById("nombre").setAttribute("disabled", "");
    document.getElementById("edad").setAttribute("disabled", "");
    document.getElementById("correo").setAttribute("disabled", "");
    document.getElementById("telefono").setAttribute("disabled", "");



}