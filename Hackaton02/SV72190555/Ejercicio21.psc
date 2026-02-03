Algoritmo Ejercicio21
	
	Definir n, i Como Entero
	Definir factorial Como Entero
	
	Escribir "Escriba un numero para calcular el factorial:"
	Leer n
	
	Si n < 0 Entonces
		Escribir "Los numeros negativos no tienen factorial."
	SiNo
		Si n = 0 Entonces
			factorial <- 1
		SiNo
			factorial <- 1
			Para i <- 1 Hasta n
				factorial <- factorial * i
			FinPara
		FinSi
		
		Escribir "El factorial de ", n, " es ", factorial
	FinSi
	
FinAlgoritmo
