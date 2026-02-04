Algoritmo Ejercicio23
	
	Definir numero, k, suma Como Entero
	
	Escribir "Ingrese un numero: "
	Leer numero
	
	Si numero <= 0 Entonces
		Escribir "Los numeros negativos no son validos."
	SiNo	
		
		k <- Trunc((numero + 1) / 2)
		
		Escribir "Se hara la suma de los primeros ", k, " numeros impares."
		
		suma <- k * k
		
		Escribir "La suma de los numeros impares menores o iguales a ", numero, " es ", suma
		
	FinSi
	
FinAlgoritmo

