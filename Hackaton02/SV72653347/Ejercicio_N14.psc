Proceso Ejercicio_N14
	///Hacer un algoritmo en Pseint que lea un entero positivo del 1 al diez y al 9 y 
	///determine si es un número primo.	
	Definir n, i, cont Como Entero
	Escribir "Ingrese un numero entero del 1 al 10:"
	Leer n
	
	cont = 0
	
	Para i = 1 Hasta n Hacer
		Si n mod i = 0 Entonces
			cont = cont + 1
		FinSi
	FinPara
	
	Si cont = 2 Entonces
		Escribir "El numero ", n, " es primo"
	SiNo
		Escribir "El numero ", n, " no es primo"
	FinSi
	
FinProceso
