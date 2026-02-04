Proceso Aumento_Sueldo
	
	Escribir "Ingrese el sueldo actual del trabajador"
	Leer sueldoActual

	Si sueldoActual > 2000
		Entonces
		Escribir "El aumento sera del 5%"
	SiNo
		si sueldoActual < 2000
			Escribir "El aumento sera del 10%"
		SiNo
			Escribir "No percibe aumento"
		FinSi
	FinSi
	
FinProceso

