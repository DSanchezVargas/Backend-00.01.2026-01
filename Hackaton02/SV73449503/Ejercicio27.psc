Proceso Ejercicio27
	
    Definir num Como Real
    Definir suma Como Real
    Definir contador Como Entero
    Definir media Como Real
	
    suma <- 0
    contador <- 0
	
    Escribir "Ingrese numeros positivos (un numero negativo para terminar):"
    Leer num
	
    Mientras num >= 0 Hacer
        suma <- suma + num
        contador <- contador + 1
        Leer num
    FinMientras
	
    Si contador > 0 Entonces
        media <- suma / contador
        Escribir "La media de los numeros ingresados es: ", media
    Sino
        Escribir "No se ingresaron numeros positivos"
    FinSi
	
	
FinProceso

//Hacer un algoritmo en Pseint para determinar la media de una lista indefinida de números positivos, 
//se debe acabar el programa al ingresar un número negativo.


