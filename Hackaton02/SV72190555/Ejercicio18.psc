Algoritmo Ejercicio18
	
	// Venta de CDs vírgenes
	
	Definir cantidad Como Entero
	Definir precio, total, ganancia, utilidad Como Real
	
	utilidad <- 0.0825
	
	Repetir
		Escribir "Ingrese la cantidad de CDs a comprar:"
		Leer cantidad
		
		Si cantidad <= 0 Entonces
			Escribir "Cantidad inválida, ingrese nuevamente."
		FinSi
		
	Hasta Que cantidad > 0
	
	
	Si cantidad >= 500 Entonces
		precio <- 6
	Sino
		Si cantidad >= 100 Entonces
			precio <- 7
		Sino
			Si cantidad >= 10 Entonces
				precio <- 8
			Sino
				precio <- 10
			FinSi
		FinSi
	FinSi
	
	total <- cantidad * precio
	ganancia <- total * utilidad
	
	Escribir "Precio unitario: $", precio
	Escribir "Total a pagar: $", total
	Escribir "Ganancia del vendedor: $", ganancia
	
FinAlgoritmo
