//38. Hacer un algoritmo en Pseint 
//que nos permita saber si un
//número es un número perfecto.
//un numero perfeceto es uno cuyos divisores sumados
//dan como resultado el numero original


Algoritmo Ejercicio38_Simple
	
	Definir n, i, suma Como Entero
	
	Definir continuar Como Caracter
	
    continuar <- "S"
	
Mientras continuar = "S" O continuar = "s"
Escribir "Ingrese un número positivo:"
	Leer n
	
	Si n <= 0 Entonces
		Escribir "El número debe ser positivo."
		SiNo
		suma <- 0
		
		Para i <- 1 Hasta n-1
			Si n MOD i = 0 Entonces
				suma <- suma + i
				Escribir suma
			FinSi
		FinPara
		
		Si suma = n Entonces
			Escribir n, " es un número perfecto."
		SiNo
			Escribir n, " NO es un número perfecto."
		FinSi
	FinSi
	
	Escribir "¿Desea comenzar de nuevo? (S/N): "
	Leer continuar
	
FinMientras

Escribir "Gracias por usar el programa."
FinAlgoritmo
