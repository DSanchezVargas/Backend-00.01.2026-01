//calcular la serie de fibonacci para n terminos

// Calcular la serie de Fibonacci para n términos

Algoritmo Ejercicio36
	
	Definir n, i Como Entero
	Definir a, b, fib Como Entero
	
	Escribir "Ingrese cuántos términos de Fibonacci desea mostrar:"
	Leer n
	
	Si n <= 0 Entonces
		Escribir "Debe ingresar un número mayor que 0."
	SiNo
		a <- 0
		b <- 1
		
		Escribir "Serie de Fibonacci:"
		
		Si n >= 1 Entonces
			Escribir a
		FinSi
		
		Si n >= 2 Entonces
			Escribir b
			
			Para i <- 3 Hasta n
				fib <- a + b
				Escribir fib
				a <- b
				b <- fib
			FinPara
		FinSi
	FinSi
	
FinAlgoritmo
