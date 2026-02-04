Proceso De_menor_a_mayor
	
	Escribir "Ingresa el numero de zapatos a comprar"
	Leer numZapatos
	precio = numZapatos * 80
	
	Si numZapatos > 30
		Entonces
		pago = precio - (precio * 0.4)
		
	SiNo
		Si numZapatos > 20
			Entonces
			pago = precio - (precio * 0.2)
		SiNo
			Si numZapatos > 10
				Entonces
				pago = precio - (precio * 0.1)
			SiNo
				pago = precio
			FinSi
		FinSi
	FinSi

	Escribir "Usted debe pagar: $", pago
FinProceso
