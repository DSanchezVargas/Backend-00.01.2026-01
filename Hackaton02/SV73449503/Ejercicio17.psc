Proceso Ejercicio17
    Definir h, m, s Como Entero
	
    Escribir "Ingrese la hora:"
    Leer h
    Escribir "Ingrese los minutos:"
    Leer m
    Escribir "Ingrese los segundos:"
    Leer s
	
    s <- s + 1
	
    Si s = 60 Entonces
        s <- 0
        m <- m + 1
    FinSi
	
    Si m = 60 Entonces
        m <- 0
        h <- h + 1
    FinSi
	
    Si h = 24 Entonces
        h <- 0
    FinSi
	
    Escribir "Hora dentro de un segundo: "
	
    Si h < 10 Entonces
        Escribir Sin Saltar "0"
    FinSi
    Escribir Sin Saltar h, ":"
	
    Si m < 10 Entonces
        Escribir Sin Saltar "0"
    FinSi
    Escribir Sin Saltar m, ":"
	
    Si s < 10 Entonces
        Escribir Sin Saltar "0"
    FinSi
    Escribir s
	
FinProceso

//Hacer un algoritmo en Pseint donde se ingrese una hora y nos calcule la hora 
//dentro de un segundo.

