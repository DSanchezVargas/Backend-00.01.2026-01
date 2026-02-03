Proceso Ejercicio_N21
	///Hacer un algoritmo en Pseint que permita calcular el factorial de un número.	
	Definir num, factorial, i Como Entero
    Escribir "Ingrese un numero:"
    Leer num
    
    factorial = 1
    Si num < 0 Entonces
        Escribir "No se puede calcular un numero negativo."
    Sino
        Para i = 1 Hasta num Con Paso 1 Hacer
            factorial = factorial * i
        FinPara
        
        Escribir "El factorial de ", num, " es: ", factorial
    FinSi

FinProceso
