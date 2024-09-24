let productos = [
    { id: 1, nombre: "Romeo Y Julieta", precio: 4000 },
    { id: 2, nombre: "Cien Años de Soledad", precio: 6000 },
    { id: 3, nombre: "Hamlet", precio: 3000 },
    { id: 4, nombre: "Harry Potter", precio: 4500 },
    { id: 5, nombre: "Las Mil y Una Noches", precio: 4200 },
    { id: 6, nombre: "Noticia de un Secuestro", precio: 3100 },
    { id: 7, nombre: "Odisea", precio: 7000 },
    { id: 8, nombre: "Pinocho", precio: 2000 },
    { id: 9, nombre: "Romper el Círculo", precio: 5999 }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let contadorCarrito = document.getElementById("contador-carrito");
let articulosCarrito = document.getElementById("articulos-carrito");
let totalCarrito = document.getElementById("total-carrito");
let mensajeCarritoVacio = document.getElementById("mensaje-carrito-vacio");

const actualizarCarrito = () => {
    contadorCarrito.textContent = carrito.length;

    if (carrito.length === 0) {
        articulosCarrito.innerHTML = "";
        totalCarrito.textContent = "Total: $0";
        mensajeCarritoVacio.style.display = "block";
    } else {
        let total = 0;
        articulosCarrito.innerHTML = "";
        carrito.forEach(producto => {
            total += producto.precio * producto.cantidad;
            
            let divProducto = document.createElement("div");
            divProducto.classList.add("producto-carrito");
            divProducto.innerHTML = `
                <p>${producto.nombre} - $${producto.precio} x ${producto.cantidad}</p>
                <button class="boton-eliminar">X</button>
            `;
            articulosCarrito.appendChild(divProducto);

            divProducto.querySelector(".boton-eliminar").addEventListener("click", () => {
                eliminarProductoDelCarrito(producto.id);
            });
        });

        totalCarrito.textContent = `Total: $${total}`;
        mensajeCarritoVacio.style.display = "none";
    }
};

const eliminarProductoDelCarrito = (productoId) => {
    carrito = carrito.filter(producto => producto.id !== productoId);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
};

document.querySelectorAll(".info button").forEach((btn, index) => {
    btn.addEventListener("click", () => {
        let productoSeleccionado = productos[index];
        let productoEnCarrito = carrito.find(producto => producto.id === productoSeleccionado.id);

        if (productoEnCarrito) {
            productoEnCarrito.cantidad++;
        } else {
            carrito.push({ ...productoSeleccionado, cantidad: 1 });
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));

        actualizarCarrito();

        Toastify({
            text: "Producto agregado",
            duration: 3000,
            backgroundColor: "#9e5b7a",
            close: true,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                color: "white",
            }
        }).showToast();
    });
});

document.getElementById("vaciar-carrito").addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
});

document.getElementById("cerrar-carrito").addEventListener("click", () => {
    document.getElementById("pestaña-carrito").classList.toggle("oculto");
});

document.querySelector(".contenedor-carrito").addEventListener("click", () => {
    document.getElementById("pestaña-carrito").classList.toggle("oculto");
});

document.getElementById("comprar-carrito").addEventListener("click", () => {
    if (carrito.length > 0) {
        Swal.fire({
            title: 'Compra realizada con éxito!',
            icon: 'success',
            timer: 1500
        }).then(() => {
            carrito = [];
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
        });
    } else {
        Swal.fire({
            title: 'El carrito está vacío!',
            icon: 'warning',
            timer: 1500
        });
    }
});

actualizarCarrito();
