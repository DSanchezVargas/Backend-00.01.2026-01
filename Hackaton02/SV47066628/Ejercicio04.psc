Proceso De_menor_a_mayor
	
	Escribir "Ingresa tu primer numero"
	Leer num1
	Escribir "Ingresa tu segundo numero"
	Leer num2
	Escribir "Ingresa tu tercer numero"
	Leer num3
	
	Si num1 < num2
		Si num2 < num3
			Entonces
			primerNum = num1
			segundoNum = num2
			tercerNum = num3
		SiNo
			si num1 < num3
				Entonces
				primerNum = num1
				segundoNum = num3
				tercerNum = num2
			SiNo
				primerNum = num3
				segundoNum = num1
				tercerNum = num2
			FinSi
		FinSi
	SiNo
		Si num1 < num3
			Entonces
			primerNum = num2
			segundoNum = num1
			tercerNum = num3
		SiNo
			Si num2 < num3
				Entonces
				primerNum = num2
				segundoNum = num3
				tercerNum = num1
			SiNo
				primerNum = num3
				segundoNum = num2
				tercerNum = num1
			FinSi
		FinSi
	FinSi
	
	
	Escribir primerNum , " - " segundoNum, " - " tercerNum
	
FinProceso
