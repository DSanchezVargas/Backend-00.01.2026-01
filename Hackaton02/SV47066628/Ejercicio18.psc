Proceso Hora_dentro_de_un_segundo
	
	Escribir "Ingrese el numero de CD a comprar"
	Leer numCD
	
	Si numCD > 500
		precio = numCD * 6
		gananciaVD = precio * 0.0825
	SiNo
		si numCD > 99
			precio = numCD * 7
			gananciaVD = precio * 0.0825
		SiNo
			si	numCD > 9
				precio = numCD * 8
				gananciaVD = precio * 0.0825
			SiNo
				precio = numCD * 10
				gananciaVD = precio * 0.0825
			FinSi
		FinSi
	FinSi
	
Escribir "El precio total para el cliente es: $", precio
Escribir "La ganacia para el vendedor es: $", gananciaVD

FinProceso

