Algoritmo Ejercicio22
	
	Definir n, i, suma Como Entero
	
	Escribir "Escriba un numero para calcular la suma de los primeros n numeros:"
	Leer n
	
	Si n < 0 Entonces
		Escribir "Los numeros negativos no son validos."
	SiNo
		
		suma <- 0
		
		Para i <- 0 Hasta n
			suma <- suma + i
		FinPara		
		
		Escribir "La suma de los primeros ", n, " numeros es ", suma
		
	FinSi
	
FinAlgoritmo
