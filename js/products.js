//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var categoriesArray = [];

function showCategoriesList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let category = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                </div>
                
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="nombre_auto">`+ category.name +`</h4>
                        <small class="text-muted">` + category.soldCount + ` artículos</small>
                    </div>
                    <div class="precio">` + category.cost +` `+ category.currency +`</div>
                    <div id="descripcion">`+ category.description +`</div>

                </div>
            </div>
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
                    <a href="category-info.html" class="list-group-item list-group-item-action">
                        <div class="row">
                            <div class="col-3">
                                <img src="` + respuesta[i].imgSrc + `" alt="` + respuesta[i].description + `" class="img-thumbnail">
                            </div>
                            <div class="col">
                                <div class="d-flex w-100 justify-content-between">
                                    <h4 class="mb-1">`+ respuesta[i].name +`</h4>
                                    <small class="text-muted">` + respuesta[i].soldCount + ` artículos</small>
                                </div>
                                <p class="precio">` + respuesta[i].cost + `</p>
                                <p class="mb-1">` + respuesta[i].description + `</p>
                            </div>
                        </div>
                    </a>
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


