Proceso numero_mayor
	
	Escribir "Ingrese el primer numero"
	Leer num1
	Escribir "Ingrese el segundo numero"
	Leer num2
	Escribir "Ingrese el tercer numero"
	Leer num3
	
	si num1 > num2
		Entonces
		si	num1 > num3
			Entonces
			Escribir "El numero mayor es: ", num1
		SiNo
			Escribir "El numero mayor es: ", num3
		FinSi
	SiNo
		si num2 > num3
			Entonces
			Escribir "El numero mayor es: ", num2
		SiNo
			Escribir "El numero mayor es: ", num3
		FinSi
	FinSi

FinProceso

