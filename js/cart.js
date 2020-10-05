//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var carritoArray = [];
var alerta = [];


function showCarrito(array){

    let htmlContentToAppendCarrito = "";

        htmlContentToAppendCarrito += `
        <div>
            <h3>`+ array.articles[0].name +`</h3>
            <img src="`+ array.articles[0].src +`">
        </div>
        <div>
            <form>

                <fieldset>
                <label for="precio_producto"> Precio unitario (UYU) = </label>
                <input type="number" id="precio_producto" value="` + array.articles[0].unitCost +`" disabled>
                </fieldset>
                <label for="cantidad_producto"> Cantidad : </label>
                <input type="number" id="cantidad_producto" value="` + array.articles[0].count + `" onclick="subtotal()"required>

                <p id="subtotal" class="costos"> Subtotal : ` + array.articles[0].unitCost  *  array.articles[0].count +`<p>

                <fieldset class="datos_envio">
                    <label name="Tipo de Envo" value=""><b>Tipo de envío (Seleccionar)</b></label>
                    <br>
                    <input id="envio" type="radio" name="Tipo de Envio"   onclick="total(1.05)"> Standard (12 a 15 días)- 5% 
                    <br>
                    <input id="envio2" type="radio" name="Tipo de Envio"  onclick="total(1.07)"> Express (5 a 8 días)- 7% 
                    <br>
                    <input id="envio3" type="radio" name="Tipo de Envio"  onclick="total(1.15)"> Premium(12 a 15 días)- 15% 
                </fieldset>

                <p id="total" class="costos">Total (UYU) = <p>

            </form>
        
        <div>
            <form>
                <fieldset class="datos_envio">
                <label for="Direccion"><b> Direccion : </b></label>
                <input type="text" id="Direccion">
                </fieldset>

                <fieldset>
                <label for="Pais"><b> País : </b></label>
                <input type="text" id="Pais">
                </fieldset>

                <fieldset class="datos_envio">
                    <label for="forma_pago" name="forma de pago"><b>Forma de pago</b></label>
                    <br>
                    <input type="radio"  name="forma de pago" value="1"> Tarjeta de crédito
                    <br>
                    <input type="radio"  name="forma de pago" value="2"> Transferencia bancaria
                </fieldset>

                <input type="button"  value="Comprar" class="costos" onclick="compraExitosa()">

            <form>
        </div>

            
        </div>

        `

        document.getElementById("carrito_info").innerHTML = htmlContentToAppendCarrito;
    
}

function subtotal() {
    let cantidad = document.getElementById("cantidad_producto").value
    let precio = document.getElementById("precio_producto").value
    let subtotal = cantidad * precio
    document.getElementById("subtotal").innerHTML = "Subtotal : " + subtotal
}

function total(envio){
    let cantidad = document.getElementById("cantidad_producto").value
    let precio = document.getElementById("precio_producto").value
    let total = cantidad * precio * envio 
    document.getElementById("total").innerHTML = "Total (UYU) = " + total
}

function compraExitosa(){
    mensaje = alerta.msg
    alert(mensaje)
}

document.addEventListener("DOMContentLoaded", function(e){
    showSpinner();
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            carritoArray = resultObj.data
            showCarrito(carritoArray);
        }
    });
    getJSONData(CART_BUY_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            alerta = resultObj.data
        }
    });
    hideSpinner();
});

