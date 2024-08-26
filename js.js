//En una Librería se registran los siguientes datos en cada venta:

//•	Código de cliente
//•	Categoría del Cliente (1-2)
//•	Total Facturado

//Se tiene que calcular y mostrar:

//a) el promedio facturado de los clientes con categoría 1.
//b) La cantidad de Clientes que no superan los $1200
//c) La ganancia obtenida por el los clientes de categoría 2 (corresponde al 10% del total facturado de esa categoría)



let finalizado= false;
let acumcat = 0
let contador = 0
let contador2 = 0
let ganancia = 0

function biblioteca(){

    while (finalizado===false){

        let codcli = parseInt(prompt("Ingrese el código del cliente:"))
        let catcli = parseInt(prompt("Ingrese la categoría del cliente (1-2):"))
        let total = parseInt(prompt("Ingrese el total facturado:"))

        if (catcli === 1){
            contador ++
            acumcat = acumcat + total
        }
        if (total < 1200){
            contador2++
        }
        if (catcli === 2){
            ganancia = ganancia + total
        }

        let continuar = confirm("¿Quieres ingresar un nuevo dato de otro cliente?")
        if (continuar=== true){
            biblioteca()

        }else{
            finalizado = true
            alert("Estos son los datos registrados finalmente:")
            if (contador===0){
                console.log("No se han ingresado clientes con la categoría 1.")
            }else{
                console.log("El promedio facturado de los clientes con categoría 1 es de $" + acumcat/contador)
            }
            console.log("La cantidad de clientes que no superan los $1200 son " + contador2)
            if (ganancia===0){
                console.log("No se han ingresado clientes con la categoría 2.")
            }else{
                gananciatotal= ganancia-(ganancia*(10/100))
                console.log("La ganancia obtenida por los clientes de categoría 2 es de $" + gananciatotal)
            }
            break
        }
    }

}

biblioteca()