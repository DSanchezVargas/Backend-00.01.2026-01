//calcular el mcd usando el metodo de euclides
//usé el siguiente video para recorar ese metodo
//https://www.youtube.com/watch?v=x6qFMSRpgpM

Algoritmo Ejercicio37
	
	Definir a, b, resto Como Entero
	
	Escribir "Ingrese el primer número:"
	Leer a
	
	Escribir "Ingrese el segundo número:"
	Leer b
	
	Si a <= 0 O b <= 0 Entonces
		Escribir "Ambos números deben ser positivos."
	SiNo
		Mientras b <> 0 Hacer
			resto <- a MOD b
			a <- b
			b <- resto
		FinMientras
		
		Escribir "El M.C.D. es: ", a
	FinSi
	
FinAlgoritmo
