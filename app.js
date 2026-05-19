let datosPedido = {};

function mostrarPantalla(id){

    document.querySelectorAll(".screen").forEach(screen=>{
        screen.classList.remove("active");
    });

    document.getElementById(id).classList.add("active");
}

function irPantalla2(){

    let nombre = document.getElementById("nombre").value;
    let direccion = document.getElementById("direccionEntrega").value;
    let pedido = document.getElementById("pedido").value;
    let pago = document.getElementById("pago").value;

    if(nombre == "" || direccion == "" || pedido == "" || pago == ""){
        alert("Completa todos los campos");
        return;
    }

    datosPedido.nombre = nombre;
    datosPedido.direccion = direccion;
    datosPedido.pedido = pedido;
    datosPedido.pago = pago;

    mostrarPantalla("screen2");
}

function obtenerUbicacion(){

    let texto = document.getElementById("ubicacionTexto");

    texto.innerHTML = "Obteniendo ubicación...";

    if(navigator.geolocation){

        navigator.geolocation.getCurrentPosition(function(position){

            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            datosPedido.ubicacion =
            `https://maps.google.com/?q=${lat},${lon}`;

            texto.innerHTML =
            `
            ✅ Ubicación obtenida correctamente <br><br>
            Latitud: ${lat.toFixed(5)}<br>
            Longitud: ${lon.toFixed(5)}
            `;

        }, function(){

            texto.innerHTML = "No se pudo obtener la ubicación";

        });

    }
}

function confirmarPedido(){

    let costo = document.getElementById("costoProducto").value;
    let recogida = document.getElementById("direccionRecogida").value;

    if(costo == "" || recogida == ""){
        alert("Completa todos los campos");
        return;
    }

    datosPedido.costo = costo;
    datosPedido.recogida = recogida;

    document.getElementById("resPedido").innerHTML =
    datosPedido.pedido;

    document.getElementById("resEntrega").innerHTML =
    datosPedido.direccion;

    document.getElementById("resRecogida").innerHTML =
    datosPedido.recogida;

    document.getElementById("resPago").innerHTML =
    datosPedido.pago;

    mostrarPantalla("screen3");
}

function enviarWhatsApp(){

    let numero = "5213220000000";

    let mensaje =
`🛵 NUEVO PEDIDO MANDADEX

👤 Cliente: ${datosPedido.nombre}

🛒 Pedido:
${datosPedido.pedido}

📍 Entrega:
${datosPedido.direccion}

🏪 Recoger en:
${datosPedido.recogida}

💰 Costo:
$${datosPedido.costo}

💳 Pago:
${datosPedido.pago}

📍 GPS:
${datosPedido.ubicacion || "No compartida"}`;

    let url =
`https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url,'_blank');
}
