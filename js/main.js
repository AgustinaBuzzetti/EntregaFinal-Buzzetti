let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

let contadorCarrito = document.getElementById("contador-carrito");
let articulosCarrito = document.getElementById("articulos-carrito");
let totalCarrito = document.getElementById("total-carrito");
let mensajeCarritoVacio = document.getElementById("mensaje-carrito-vacio");

const mostrarProductos = (productos) => {
    const contenedor = document.getElementById("contenedor");

    productos.forEach(producto => {
        let div = document.createElement("div");
        div.innerHTML = `
            <img src="./img/${producto.nombre}.jpg">
            <div class="info">
                <p>${producto.nombre}</p>
                <p class="precio">$${producto.precio}</p>
                <button>Comprar</button>
            </div>
        `;
        contenedor.append(div);

        div.querySelector("button").addEventListener("click", () => {
            agregarAlCarrito(producto);
        });
    });
};

const agregarAlCarrito = (producto) => {
    let productoEnCarrito = carrito.find(item => item.id === producto.id);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
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
};

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

fetch('../json/data.json')
    .then(respuesta => respuesta.json())
    .then(data => {
        mostrarProductos(data);
    })
    .catch(() => {
        console.error("Hubo un error en la carga de productos");
    });

const darkModeToggle = document.getElementById("toggle-darkmode");
const body = document.body;

if (localStorage.getItem("theme") === "dark") {
    body.classList.add("darkmode");
    darkModeToggle.textContent = "☀️";
}

darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("darkmode");

    if (body.classList.contains("darkmode")) {
        localStorage.setItem("theme", "dark");
        darkModeToggle.textContent = "☀️";
    } else {
        localStorage.setItem("theme", "light");
        darkModeToggle.textContent = "🌙";
    }
});

document.getElementById("vaciar-carrito").addEventListener("click", () => {
    if (carrito.length === 0) {
        Swal.fire({
            title: 'Error',
            text: 'El carrito ya está vacío!',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false
        });
    } else {
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();

        Swal.fire({
            title: '¡Listo!',
            text: 'El carrito se ha vaciado con éxito!',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
        });
    }
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
            icon: 'error',
            timer: 1500
        });
    }
});

actualizarCarrito();
