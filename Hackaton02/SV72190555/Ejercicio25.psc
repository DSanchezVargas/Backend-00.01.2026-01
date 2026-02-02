Algoritmo Ejercicio25
	
	Definir n, i, j Como Entero
	Definir factorial, acumulador Como Entero
	
	Escribir "Escriba un numero para calcular el factorial:"
	Leer n
	
	Si n < 0 Entonces
		Escribir "Los numeros negativos no tienen factorial."
	SiNo
		
		factorial <- 1
		
		Para i <- 1 Hasta n
			acumulador <- 0
			
			Para j <- 1 Hasta i
				acumulador <- acumulador + factorial
				Escribir acumulador
				
			FinPara
		
			factorial <- acumulador
			
			Escribir factorial
		FinPara
		
		Escribir "El factorial de ", n, " es ", factorial
		
	FinSi
	
FinAlgoritmo
