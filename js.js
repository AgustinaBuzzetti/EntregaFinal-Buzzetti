// Este es un sistema de una biblioteca para registrar los libros más vendidos, los vendidos de menor 
//precio, el promedio de los precios y si es envío gratis o no.

alert("Este es el registro de datos de una biblioteca. Los libros comprados mayores o iguales a $3000 tienen ENVÍO GRATIS.")


function ingresarLibros() {
    let libros = [];
    let seguir = true;

    while (seguir === true) {

        let cliente = prompt("Ingresá el nombre del cliente:");

        while (cliente.trim() === '') {
            cliente = prompt("Ingresá un nombre válido:");
        }

        let libro = prompt("Ingresá el nombre del libro que se lleva el cliente:").toUpperCase();

        while (libro.trim() === '') {
            libro = prompt("Ingresá un nombre de un libro válido:");
        }

        let precio = prompt("Ingresá el precio del libro que se lleva el cliente (en números, sin signo $):");

        while (isNaN(precio) || precio.trim() === '') {
            precio = prompt("Ingresá un precio válido (en números, sin signo $):");
        }

        libros.push({cliente: cliente, libro: libro, precio: precio});

        const respuesta = prompt("¿Querés ingresar otro cliente? (Si o No):").toLowerCase();
        seguir = respuesta === "si";
    }

    return libros;
}

function librosMasVendidos(libros) {

    let contadorLibros = {};

    libros.forEach((i) => {
        contadorLibros[i.libro] = (contadorLibros[i.libro] || 0) + 1;
    });

    let maxVendido = 0;
    for (let libro in contadorLibros) {
        if (contadorLibros[libro] > maxVendido) {
            maxVendido = contadorLibros[libro];
        }
    }

    let masVendidos = libros.filter((i) => contadorLibros[i.libro] === maxVendido);

    return masVendidos;
}

function librosMenorPrecio(libros) {
    let menorPrecio = libros[0].precio;

    libros.forEach(i => {
        if (Number(i.precio) < Number(menorPrecio)) {
            menorPrecio = i.precio;
        }
    });

    let menor = libros.filter((i) => i.precio === menorPrecio);

    return menor;
}

function promedioPrecios(libros) {
    const suma = libros.reduce((acum, i) => acum + Number(i.precio), 0);
    const promedio = suma / libros.length;
    return promedio;
}

function enviosGratis(libros) {
    let gratis = [];
    let pago = [];

    libros.forEach((i) => {
        if (i.precio <= 3000) {
            pago.push(i);
        } else {
            gratis.push(i);
        }
    });

    console.log("%cEnvíos gratis:", "color: green;");
    gratis.forEach((i) => {
        console.log(i.cliente + " se lleva el libro -" + i.libro + "- con envío gratis. Costo del libro: $" + i.precio);
    })

    console.log("%cEnvíos pagos:", "color: red;");
    pago.forEach((i) => {
        console.log(i.cliente + " tiene que pagar el envío de su libro -" + i.libro + "-");
        console.log("Costo del libro: $" + i.precio + " - Costo con envío: $" + (Number(i.precio) + 700))
    })
}

function final() {
    const libritos = ingresarLibros();

    if (libritos.length === 0) {
        console.log("No se ingresaron libros");
        return;
    }

    const lmv = librosMasVendidos(libritos);
    const lmp = librosMenorPrecio(libritos);
    const promedio = promedioPrecios(libritos);

    console.log("%cLibros más vendidos:", "color: pink;");
    lmv.forEach((i) => console.log("-" + i.libro + "- fue el libro más vendido."));

    console.log("%cLibros vendidos con el menor precio:", "color: blue;");
    lmp.forEach((i) => console.log("-" + i.libro + "- fue el libro vendido con menor precio: $" + i.precio))

    console.log("%cPromedio de los precios:", "color: violet;");
    console.log("$" + promedio.toFixed(2));
    
    enviosGratis(libritos);
}

final();
