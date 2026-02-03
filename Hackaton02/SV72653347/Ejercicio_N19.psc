Proceso Ejercicio_N19
///Hacer un algoritmo en Pseint para una heladería se tienen 4 tipos de empleados ordenados de la siguiente
///forma con su número identificador y salario diario correspondiente:
///Cajero (56$/día).				
///Servidor (64$/día).
///Preparador de mezclas (80$/día).
///Mantenimiento (48$/día).
///El dueño de la tienda desea tener un programa donde sólo ingrese dos números enteros que representen al 
///número identificador del empleado y la cantidad de días que trabajó en la semana (6 días máximos). 
///Y el programa le mostrará por pantalla la cantidad de dinero que el dueño le debe pagar al empleado que ingresó
	
	Definir e,d,subtotal Como entero
	//Definir oficio Como caracter
	Escribir "Que tipo de empleado es :"
	Escribir "1 = CAJERO :"
	Escribir "2 = SERVIDOR"
	Escribir "3 = PREPARADOR DE MEZCLAS"
	Escribir "4  = MANTENIMIENTO "
	Escribir "Elija el numero del empleado"
	Leer e
	Escribir "Cuantos dias de la semana trabajo ? 6 dias maximo "
	Leer d
	Segun e Hacer
		1:
			
			subtotal=56*d
			Escribir "El CAJERO tiene un sueldo de : ", subtotal
		2:
			subtotal=64*d
			Escribir "El SERVIDOR tiene un sueldo de : ", subtotal
		3:
			subtotal=80*d
			Escribir "El PREPARADOR DE MEZCLAS tiene un sueldo de : ", subtotal
		4:
			subtotal=48*d
			Escribir "El MANTENIMIENTO tiene un sueldo de : ", subtotal
		De Otro Modo:
			Escribir "Error, debe elegir un numero valido (1,2,3,4)"
	Fin Segun
FinProceso
