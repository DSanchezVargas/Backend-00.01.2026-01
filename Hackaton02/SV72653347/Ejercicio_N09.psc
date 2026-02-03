Proceso Ejercicio_N09
	///Hacer un algoritmo en Pseint para determinar el aumento de un trabajador, 
	///se debe tomar en cuenta que si ganaba más de $2000 tendrá un aumento del 5%, si generaba menos de $2000 
	///su aumento será de un 10%.
	Definir n,total Como Real
	Escribir "Escriba cuanto ganaba para determinar su aumento de sueldo"
	Leer n
	total=n
	si n < 2000 Entonces
		n = n*0.10
	SiNo
		n = n*0.05
	FinSi
	Escribir  "El aumento equivale : ", n
	Escribir  "Total de sueldo: ", n+total
FinProceso
