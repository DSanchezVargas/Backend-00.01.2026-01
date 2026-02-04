Proceso monto_a_pagar
	
	Escribir "Ingrese el numero identificador"
	Leer numId
	Escribir "Ingrese el numero de dias trabajados"
	Leer diasTrabajados
	
	Si numId = 1
		pago = diasTrabajados * 56
		
	SiNo
		si numId = 2
			pago = diasTrabajados * 64
			
		SiNo
			si	numId = 3
				pago = diasTrabajados * 80
				
			SiNo
				si numId = 4
					pago = diasTrabajados * 48
				FinSi
			FinSi
		FinSi
	FinSi
	
Escribir "El monto a pagar total al trabajador es: $", pago

FinProceso

