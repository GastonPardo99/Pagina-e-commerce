//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var productInfoArray = [];
var productComentary = [];
let parametros = new URLSearchParams(window.location.search);
let name = parametros.get('producto');


function showProductInfo(array){

    let htmlContentToAppend = "";
        
        htmlContentToAppend += `
        <div class="product_info_principal">
            <div class="row">
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="nombre_auto" id="nombre_producto_info"> ` + name + ` </h4>
                    </div>    
                    <div>
                        <img src="` + array.images[3] + `" id="imagen_principal">
                    </div>
                    <div class="precio">` + array.cost +` `+ array.currency +`</div>
                    <div id="descripcion" class="descripcion_product_info">`+ array.description +`</div>
                    <h2 id="galeria_imagenes"> Galería de imagenes </h2>

                </div>
            </div>
        </div>
        `
    let htmlContentToAppendImages = ""   
    
    for(let i = 0; i < array.images.length; i++){
        let productImage = array.images[i];
    

        htmlContentToAppendImages += `
        
        <div>
            <div class="row">
                <div class="col-3">
                    <img src="` + productImage + `"  class="imagenesgaleria" >
                </div>
            </div>
        </div>
  
        ` 

        document.getElementById("car-list-container").innerHTML = htmlContentToAppend + htmlContentToAppendImages;

}
}

document.addEventListener("DOMContentLoaded", function(e){
    showSpinner();
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productInfoArray = resultObj.data;
            showProductInfo(productInfoArray);
        }
    hideSpinner();
    });
});


function showComentary(array){

    let htmlContentToAppendComentaryTitle = "";
       
        htmlContentToAppendComentaryTitle = `
        <h1 id="titulo_Comentario"> Comentarios </h1>
        `

    let htmlContentToAppendComentary = "";
    for(let i = 0; i < array.length; i++)    

        htmlContentToAppendComentary += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col">
                    <div>
                    <span class="fa fa-star checked">` + array[i].score + `</span>
                    </div>
                    <p >` + array[i].description + `</p>
                    <div>` + "User:" + " " +`` + array[i].user +`</div>
                    <div>`+ array[i].dateTime +`</div>
                </div>
            </div>
        </div>
        `
        
        document.getElementById("car2-list-container").innerHTML = htmlContentToAppendComentaryTitle + htmlContentToAppendComentary;
}




document.addEventListener("DOMContentLoaded", function(e){
    showSpinner();
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productComentary = resultObj.data;
            showComentary(productComentary);
        }
    hideSpinner();
    });
});

let user = JSON.parse(localStorage.getItem("usuarioAndPass"))

function dejarComentario(){
    let htmlContentToAppendNewComentary = `
    <div class="comentario_creado" >
    <form class="comentario_contenido" onsubmit="enviarComentario(event)">
        <p><b>User:</b> `+ user.nombre + ` </p>
        <fieldset>
            <label for="Rating"><b>Puntuacion:</b></label>
            <input type="number" name="puntuacion" id="Rating" min= "1" max = "5"  required>
        </fieldset>
        <fieldset>
            <label for="Nuevo_comentario"><b>Comentario:</b></label>
            <textarea name="opinion" id="Nuevo_comentario" placeholder="Ingrese comentario..." rows="4" cols="50" required></textarea>
        </fieldset>
        <input type="submit"  value="Enviar comentario" id="enviar_comentario" >
    </form>
    </div>
    `
    document.getElementById("seccion_comentario").innerHTML += htmlContentToAppendNewComentary
}

function enviarComentario(event){
    event.preventDefault();
    let rating = document.getElementById("Rating").value
    let comentario = document.getElementById("Nuevo_comentario").value
    let tiempo = new Date()
    let fecha = tiempo.getUTCFullYear().toString() + "-" + (tiempo.getUTCMonth() + 1).toString() + "-" + tiempo.getUTCDate().toString() + " " + tiempo.getUTCHours() + ":" + tiempo.getUTCMinutes() + ":" + tiempo.getUTCSeconds()

    let Nuevocomentario = {
        score: rating,
        description: comentario,
        user: user.nombre,
        dateTime: fecha
    }

    productComentary.push(Nuevocomentario)
    showComentary(productComentary)
}