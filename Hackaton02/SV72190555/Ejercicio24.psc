Algoritmo Ejercicio24
	
	Definir numero, k, suma Como Entero
	
	Escribir "Ingrese un numero: "
	Leer numero
	
	Si numero <= 0 Entonces
		Escribir "Los numeros negativos no son validos."
	SiNo	
		
		k <- Trunc(numero / 2)
		
		Escribir "Se hara la suma de los primeros ", k, " numeros pares."
		
		suma <- k * (k + 1)
		
		Escribir "La suma de los numeros pares menores o iguales a ", numero, " es ", suma
		
	FinSi
	
FinAlgoritmo
