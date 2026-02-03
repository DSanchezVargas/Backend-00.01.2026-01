Proceso Descuento_Helado
	
	Escribir "Ingresa el tipo de Membresia: A, B o C"
	Leer membresia
	
	
	Si membresia = "A" o membresia = "a"
		Entonces
		Escribir "Tu descuento es de: 10%"
		
	SiNo
		Si membresia = "B" o membresia = "b"
			Entonces
			Escribir "Tu descuento es de: 15%"
		SiNo
			Si membresia = "C" o membresia = "c"
				Entonces
				Escribir "Tu descuento es de: 20%"
			SiNo
				Escribir "Ingrese una opcion correcta"
			FinSi
		FinSi
	FinSi
	
FinProceso
