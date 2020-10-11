var articulosArray = [];


function showArticulosCarrito(array){
    let htmlContentToAppend = "";
    for (let i = 0; i < array.length; i++){
        let article = array[i];

        if(article.currency === "UYU"){

             article.unitCost = 0.025 * article.unitCost 
        }
        
        htmlContentToAppend += `<div class="container mb-4">
        <div class="row">
            <div class="col-12">
                <div class="table-responsive">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col" class="tabla"> </th>
                                <th scope="col" class="tabla">Producto</th>
                                <th scope="col" class="tabla" type="number">Cantidad</th>
                                <th scope="col" class="tabla">Precio (USD)</th>
                                <th> </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="tabla"><img src="` + article.src + `" / class="imagen_carrito"> </td>
                                <td class="tabla">` + article.name + `</td>
                                <td class="tabla"><label id="label-cantidad` + i + `"></label> <input id="cantidad` + i + `" type="number" class="form-control" value="` + article.count + `"></td>
                                <td class="tabla">` + article.unitCost + `</td>
                                <td class="tabla"></td>
                                </tr>
                                <tr>
                                <td colspan="4"></td>
                                <td colspan="2">SUBTOTAL (USD) : <input type="number" id="subtotal` + i + `" disabled></td>
                            </tr>
                                `
        
    }

    document.getElementById("carrito").innerHTML = htmlContentToAppend;
    

}



function compraExitosa(){
    mensaje = alerta.msg
    alert(mensaje)
}

document.addEventListener("DOMContentLoaded", function (e) {
    
    getJSONData(CART_2).then(function(resultObj){
        
        if (resultObj.status === "ok");
        {
            articulosArray = resultObj.data.articles;
            showArticulosCarrito(articulosArray);
           
        }

        function sumatoriaTotal(){
            var total = 0;
            for (let i=0; i<articulosArray.length;i++){
                // subtotales += document.getElementById("subtotal"+ i).value;
                total += parseInt(document.getElementById("subtotal"+ i).value); 
                console.log(subtotales);
            }
            document.getElementById("subtotales").innerHTML= total;
        }
        
        function costo() {
            for (let i=0; i<articulosArray.length;i++){
                var cantidad = document.getElementById("cantidad" + i).value;
                var article = articulosArray[i];
            var precio   = article.unitCost;
            var cuenta = parseInt(cantidad) * precio;
            document.getElementById("subtotal"+i).value = cuenta;
                
            }         
            
            sumatoriaTotal();
            
        
        }

        for (let i=0; i<articulosArray.length;i++){
            document.getElementById("cantidad"+i).addEventListener("change",costo);

        }

        
       
    });
    getJSONData(CART_BUY_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            alerta = resultObj.data
        }
    });

})

