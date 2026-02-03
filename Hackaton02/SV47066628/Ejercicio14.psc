Proceso es_numero_primo
	
	Escribir "Ingrese un numero del 1 al 10"
	Leer num
	
	si num = 1 o num = 2 o num = 3 o num = 5 o num = 7
		Escribir "Es un numero primo"
	SiNo
		si num = 4 o num = 6 o num = 8 o num = 9 o num = 10
			Escribir "No es un numero primo"
		SiNo
			Escribir "Por favor ingrese un numero del 1 al 10"
		FinSi
	FinSi
	
FinProceso

