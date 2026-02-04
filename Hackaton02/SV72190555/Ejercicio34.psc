//34. Hacer un algoritmo en Pseint que imprima 
//la tabla de multiplicar de los números del uno al nueve.


Algoritmo Ejercicio34
	
	
	Definir continuar Como Caracter
	Definir i, j, n, resultado Como Entero
	
	continuar <- "S"
	Mientras continuar = "S" O continuar = "s" Hacer
		
		Escribir "ingrese un numero para sacar su tabla de multiplicar"
		leer n
		
		Para i <- 1 Hasta n
			Escribir "========================"
			Escribir "Tabla del ", i
			Escribir "========================"
			
			Para j <- 1 Hasta 10
				resultado <- i * j
				Escribir i, " x ", j, " = ", resultado
			FinPara
			
			Escribir ""   // línea en blanco
		FinPara
		Escribir "¿Desea calcular otra suma? (S/N): "
		Leer continuar
		
	FinMientras
	
Escribir "Gracias por usar el programa."
FinAlgoritmo
