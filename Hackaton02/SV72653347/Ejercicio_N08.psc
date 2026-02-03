Proceso Ejercicio_N08
	///Hacer un algoritmo en Pseint para calcular el promedio de tres notas y determinar si el estudiante aprobó o no.
	
	Definir n1,n2,n3,promedio Como Real
	Definir  resultdo Como Caracter
	
	Escribir "Escribir nota 1 "
	Leer n1
	Escribir "Escribir nota 2 "
	Leer n2
	Escribir "Escribir nota 3 "
	Leer n3
	
	promedio=(n1+n2+n3)/3
	
	si promedio>=12 Entonces
		resultdo="APROBADO con : "
	SiNo
		resultdo="DESAPROBADO con : "
	FinSi
	
Escribir resultdo , promedio
FinProceso
