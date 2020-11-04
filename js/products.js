//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var categoriesArray = [];

function showCategoriesList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        htmlContentToAppend += `
        <div class="col-12 col-md-6 col-lg-3">
        <a href="product-info.html?producto= `+ product.name +`" class="card list-group-item list-group-item-action">
          <img class="bd-placeholder-img card-img-top"  src="` + product.imgSrc + `">
          <hr>
          <h3 class="m-3">`+ product.name +`</h3>
          <hr>
          <div class="card-body">
            <p class="card-text">` + product.description + `</p>
            <hr>
            <p class="card-text">Cantidad disponible: ` + product.soldCount + `</p>
            <hr>
            <p class="card-text">` + product.cost + ` USD</p>
          </div>
        </a>
      </div>
        `

        document.getElementById("car-list-container").innerHTML = htmlContentToAppend;
    }
}


function sortProductsAscendente(array){
    let productos = []
    productos = categoriesArray.sort(function(a, b) {
        if ( a.cost > b.cost ){ return -1; }
        if ( a.cost < b.cost ){ return 1; }
        return 0;
    });
    showCategoriesList(categoriesArray)
}

function sortProductsDescendente(array){
    let productos2 = []
    productos2 = categoriesArray.sort(function(a, b) {
        if ( a.cost < b.cost){ return -1; }
        if ( a.cost > b.cost ){ return 1; }
        return 0; 
    });
    showCategoriesList(categoriesArray)
}

function sortProductsValor(array){
    let valor = []
    valor = categoriesArray.sort(function(a, b) {
        if ( a.soldCount > b.soldCount){ return -1; }
        if ( a.soldCount <  b.soldCount ){ return 1; }
        return 0; 
    });
    showCategoriesList(categoriesArray)
}


document.addEventListener("DOMContentLoaded", function(e){
    showSpinner();
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            categoriesArray = resultObj.data;
            showCategoriesList(categoriesArray);
        }
    document.getElementById("sortByCostAsc").addEventListener("click", function(){
        sortProductsAscendente();
    });
    document.getElementById("sortByCostDesc").addEventListener("click", function(){
        sortProductsDescendente();
    });
    document.getElementById("sortByValor").addEventListener("click", function(){
        sortProductsValor();
    });
    hideSpinner();
    });
});

fetch(PRODUCTS_URL).then(respuesta => {
    return respuesta.json();
})
    .then(respuesta => {
    document.getElementById("buscador").addEventListener("submit", e => {
    e.preventDefault();
    document.getElementById("car-list-container").innerHTML = "";
    let precio_min = document.getElementById("precio_minimo").value;
    let precio_max = document.getElementById("precio_maximo").value;

    let htmlContentToAppend = "";

    for (i = 0; i < respuesta.length; i++) {
        if (respuesta[i].cost >= precio_min && respuesta[i].cost <= precio_max)  {
                   
            htmlContentToAppend += `
            <div class="col-12 col-md-6 col-lg-3">
              <a href="product-info.html?producto= `+ respuesta[i].name +`" class="card list-group-item list-group-item-action">
                <img class="bd-placeholder-img card-img-top"  src="` + respuesta[i].imgSrc + `">
                <hr>
                <h3 class="m-3">`+ respuesta[i].name +`</h3>
                <hr>
                <div class="card-body">
                  <p class="card-text">` + respuesta[i].description + `</p>
                  <hr>
                  <p class="card-text">` + respuesta[i].soldCount + `</p>
                  <hr>
                  <p class="card-text">` + respuesta[i].cost + `</p>
                </div>
              </a>
            </div>
                
            `
                }
        
                document.getElementById("car-list-container").innerHTML = htmlContentToAppend;
            }
        }
    );
    
    
});



document.getElementById("searching").addEventListener("keyup", function(e){
    let searchInput = document.getElementById("searching").value
    let searchArray = categoriesArray.filter(elemento => (elemento.name.includes(searchInput)) || (elemento.description.includes(searchInput)));
    showCategoriesList(searchArray);
});
