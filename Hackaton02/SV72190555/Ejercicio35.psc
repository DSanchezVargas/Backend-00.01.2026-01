//35. Hacer un algoritmo en Pseint que nos permita
//saber cuál es el número mayor y menor, se debe 
//ingresar sólo veinte números.

Algoritmo Ejercicio35
	
	Definir i, numero, mayor, menor Como Entero
	Definir continuar Como Caracter
	
    continuar <- "S"
	
    Mientras continuar = "S" O continuar = "s" 
	// Leer el primer número
	Escribir "Ingrese el número 1:"
	Leer numero
	
	mayor <- numero
	menor <- numero
	
	// Leer los otros 19 números
	Para i <- 2 Hasta 20
		Escribir "Ingrese el número ", i, ":"
		Leer numero
		
		//se calcula el mayor
		Si numero > mayor Entonces
			mayor <- numero
		FinSi
		
		//se calcula el menor
		Si numero < menor Entonces
			menor <- numero
		FinSi
	FinPara
	
	Escribir "========================"
	Escribir "El número mayor es: ", mayor
	Escribir "El número menor es: ", menor
	Escribir "========================"
	Escribir "¿Desea calcular otra suma? (S/N): "
	Leer continuar
FinMientras

Escribir "Gracias por usar el programa."
FinAlgoritmo
