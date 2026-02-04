Algoritmo Ejercicio20
	
	Dimension v[4]
	Dimension original[4]
	
	Definir i, j, aux Como Entero
	Definir pares, mayor, suma Como Entero
	Definir media, cuadrado Como Real
	
	Escribir "================================"
	
	// 1) Leer los números
	Para i <- 1 Hasta 4
		Escribir "Ingrese el número ", i, ": "
		Leer v[i]
		original[i] <- v[i]
	FinPara
	
	// 2) Contar pares (con el original)
	pares <- 0
	Para i <- 1 Hasta 4
		Si original[i] mod 2 = 0 Entonces
			pares <- pares + 1
		FinSi
	FinPara
	
	// 3) Ordenamiento burbuja en v
	Para i <- 1 Hasta 3
		Para j <- 1 Hasta 4 - i
			Si v[j] > v[j+1] Entonces
				aux <- v[j]
				v[j] <- v[j+1]
				v[j+1] <- aux
			FinSi
		FinPara
	FinPara
	
	// 4) El mayor
	mayor <- v[4]
	
	// 5) Suma total usando el vector
	suma <- 0
	Para i <- 1 Hasta 4
		suma <- suma + original[i]
	FinPara
	
	Escribir "================================"
	
	// I) Si el tercero es par ? cuadrado del segundo
	Si original[3] mod 2 = 0 Entonces
		cuadrado <- original[2] * original[2]
		Escribir "I) El tercero es par."
		Escribir "El cuadrado del segundo es: ", cuadrado
		Escribir "================================"
	FinSi
	
	// II) Si el primero es menor que el cuarto ? media
	Si original[1] < original[4] Entonces
		media <- suma / 4
		Escribir "II) El primero es menor que el cuarto."
		Escribir "La media es: ", media
		Escribir "================================"
	FinSi
	
	// III) Si el segundo es mayor que el tercero y el tercero está entre 50 y 700 ? suma
	Si original[2] > original[3] Y original[3] >= 50 Y original[3] <= 700 Entonces
		Escribir "III) Se cumple la condición."
		Escribir "La suma es: ", suma
		Escribir "================================"
	FinSi
	
	// 6) Resultados finales
	Escribir "IV) Cantidad de números pares: ", pares
	Escribir "================================"
	Escribir "V) El número mayor es: ", mayor
	Escribir "================================"
	
FinAlgoritmo
