Proceso Ejercicio_N15
	///Hacer un algoritmo en Pseint que convierta centímetros a pulgadas y libras a kilogramos
	Definir tipo,result Como Caracter
	Definir n Como Real
	Escribir "Que tipo de conversion desea realizar?"
	Escribir "cm a pulgadas  ==>  A "
	Escribir "libras a kg  ==>  B "
	Leer tipo
	Escribir "Escriba el numero o cantidad a convertir"
	Leer n
	
	tipo=Mayusculas(tipo)
	
	Segun tipo Hacer
		"A":
			n=n*2.54
			Escribir "La conversion de cm a pulgadas es igual a : ", n
		"B":
			n=n*2.205
			Escribir "La conversion de libras a kg es igual a : ", n
		De Otro Modo:
			Escribir "Error Marque otra opcion de conversion entre  (A y B)"
	Fin Segun
FinProceso
