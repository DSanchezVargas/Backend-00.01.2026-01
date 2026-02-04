Proceso Ejercicio_N23
	///Hacer un algoritmo en Pseint para calcular la suma de los números impares menores o iguales a n
	
		Definir n, i, suma Como Entero
		
		Escribir "Ingrese un numero entero positivo:"
		Leer n
		
		suma = 0
		
		Para i = 1 Hasta n Hacer
			Si i mod 2 <> 0 Entonces
				suma = suma + i
			FinSi
		FinPara
		
		Escribir "La suma de los numeros impares menores o iguales a ", n, " es: ", suma


FinProceso
