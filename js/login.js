
function enviarFormulario(event){
    event.preventDefault();
    sessionStorage.setItem("logueado", "true");
    window.location.href = "index.html";
    
    let usuarioLog = {
       nombre: document.getElementById("Usuario").value,
       password: document.getElementById("Contraseña").value
    }; 
    let usuarioString = JSON.stringify(usuarioLog);
    localStorage.setItem("usuarioAndPass", usuarioString);
    
    return true;

}



document.getElementById("formulario-login").addEventListener("submit", enviarFormulario);

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
});
