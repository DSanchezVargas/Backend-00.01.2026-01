Proceso Ejercicio_N6
	///Hacer un algoritmo en Pseint para ayudar a un trabajador a saber cuál será su sueldo semanal, 
	///se sabe que si trabaja 40 horas o menos, se le pagará $20 por hora, pero si trabaja más de 40 horas
	///entonces las horas extras se le pagarán a $25 por hora.
	Definir h,sueldo Como Entero
	Escribir "Cuantas HORAS trabajo ? "
	leer h
	si h > 40 Entonces
		sueldo= 25
		sueldo= sueldo * h
	SiNo
		sueldo= 20
		sueldo= sueldo * h
	FinSi
	Escribir "Tu sueldo es de $", sueldo
FinProceso
