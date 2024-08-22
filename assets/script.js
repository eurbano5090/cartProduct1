function Producto(nombre, precio) {
  this.nombre = nombre;
  this.precio = precio;
}

const productosDisponibles = [
  new Producto("Leche", 1000),
  new Producto("Pan de Molde", 2000),
  new Producto("Queso", 1200),
  new Producto("Mermelada", 890),
  new Producto("Azúcar", 1300),
];

function lista(productosDisponibles) { 
    productosDisponibles.forEach((producto, index) => {
        $("#listado-productos tbody").append(
            `<tr>
                <td>${index + 1}</td>
                <td>${producto.nombre}</td>
                <td>&#36;${producto.precio}</td>
                <td><button class="agregar-carrito" data-index="${index}"><i class="fa-solid fa-cart-shopping"></button></td>
            </tr>`
        );
    });
}


function Carrito() {
  this.productos = [];


  this.agregarProducto = function (producto, cantidad) {
    this.productos.push({ producto, cantidad });
    this.actualizarCarrito();
  };

  this.calcularTotal = function () {
    return this.productos.reduce(function (total, item) {
      return total + item.producto.precio * item.cantidad;
    }, 0);
  };

  this.mostrarDetalles = function () {
    return this.productos
      .map(function (item) {
        return `${
            item.cantidad
        } x ${item.producto.nombre} - $${item.producto.precio * item.cantidad}`;
    })
    .join("<br>");
  };


  this.actualizarCarrito = function () {
    const detalles = this.mostrarDetalles();
    const total = this.calcularTotal();
    $("#carrito-detalles").html(detalles + `<br><strong>Total: $${total}</strong>`);
};

this.finalizarCompra = function () {
    const total = this.calcularTotal();
    alert(`Compra finalizada. Total a pagar: $${total}`);
    this.productos = [];
    this.actualizarCarrito();
};
} 

$(document).ready(function() {
    const carrito = new Carrito();

    lista(productosDisponibles);

    $("#listado-productos").on("click", ".agregar-carrito", function() {
        const index = $(this).data("index");
        const cantidadInput = $(`#cantidad-${index}`);
        let cantidad = parseInt(cantidadInput.val());

        if (isNaN(cantidad)) {
            cantidad = 0; 
        }

        cantidad += 1; 

        carrito.agregarProducto(productosDisponibles[index], cantidad);

        alert(`${cantidad} ${productosDisponibles[index].nombre}(s) agregado(s) al carrito.`);

        cantidadInput.val(cantidad);
    });

    $("#finalizar-compra").on("click", function() {
        carrito.finalizarCompra();
    });

    $("#mostrar-ocultar").click(function() {
        if($("#carrito-detalles").hasClass("d-none")) { // Lógica para mostrar
            $("#carrito-detalles").removeClass("d-none")
            $("#mostrar-ocultar").removeClass("btn-success").addClass("btn-danger").html("Ocultar")
        } else { // Lógica para ocultar
            $("#carrito-detalles").addClass("d-none")
            $("#mostrar-ocultar").removeClass("btn-danger").addClass("btn-success").html("Mostrar")
        }
    })
});

/*
$(document).ready(function() {
    const carrito = new Carrito();

    lista(productosDisponibles);

    $("#listado-productos").on("click", ".agregar-carrito", function() {
        const index = $(this).data("index");
        const productoSeleccionado = productosDisponibles[index];
        const cantidad = parseInt($(`#cantidad-${index}`).val());

        carrito.agregarProducto(productoSeleccionado, cantidad);
    });

    $("#finalizar-compra").on("click", function() {
        carrito.finalizarCompra();
    });
});*/



carrito.finalizarCompra();
