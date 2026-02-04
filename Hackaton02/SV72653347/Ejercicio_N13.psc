Proceso Ejercicio_N13
	///Hacer un algoritmo en Pseint que lea una letra y diga si es una vocal.	
	Definir l,result Como Caracter 
	Escribir "Escriba una letra"
	Leer l
	l=Mayusculas(l)
	Segun l Hacer
		"A":
			result="Es una Vocal"
		"E":
			result="Es una Vocal"
		"I":
			result="Es una Vocal"
		"O":
			result="Es una Vocal"
		"U":
			result="Es una Vocal"
		De Otro Modo:
			result="NO es una Vocal"
	Fin Segun
	Escribir result
FinProceso
