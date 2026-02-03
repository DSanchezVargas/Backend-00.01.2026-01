Proceso Pago_Horas
	
	Escribir "Ingresa tu numero de horas de trabajo"
	Leer horasTrabajo
	horasExtras = horasTrabajo - 40
	
	Si horasTrabajo < 41
		Entonces
		pago = horasTrabajo * 20
		
	SiNo
		pago = (40 * 20) + (horasExtras * 25)
	FinSi

	Escribir "A usted se le pagara: $", pago
FinProceso
