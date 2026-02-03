Funcion fact <- Factorial(n)
    Si n = 0 Entonces
        fact <- 1
    Sino
        fact <- n * Factorial(n - 1)
    FinSi
FinFuncion
Proceso Ejercicio25
	
    Definir n Como Entero
    Definir resultado Como Entero
	
    Escribir "Ingrese un numero entero positivo:"
    Leer n
	
    resultado <- Factorial(n)
	
    Escribir "El factorial de ", n, " es: ", resultado
	
	
FinProceso

//Hacer un algoritmo en Pseint para calcular el factorial de un número de una forma distinta.

