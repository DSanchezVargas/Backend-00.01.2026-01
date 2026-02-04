Proceso monto_a_pagar
	
	Escribir "Ingrese el primer numero"
	Leer num1
	Escribir "Ingrese el segundo numero"
	Leer num2
	Escribir "Ingrese el tercer numero"
	Leer num3
	Escribir "Ingrese el cuarto numero"
	Leer num4
	
	//cantidad de pares
	
	cantPares = 0
	si num1 % 2 = 0
		cantPares = cantPares + 1
	FinSi
	si num2 % 2 = 0
		cantPares = cantPares + 1
	FinSi
	si num3 % 2 = 0
		cantPares = cantPares + 1
	FinSi
	si num4 % 2 = 0
		cantPares = cantPares + 1
	FinSi
	
	//numero mayor
	
	numMayor = num1
	si num2 > numMayor
		numMayor = num2
	FinSi
	si num3 > numMayor
		numMayor = num3
	FinSi
	si num4 > numMayor
		numMayor = num4
	FinSi
	
	// si tercero es par
	
	si num3 % 2 = 0
		Escribir num2, " al cuadrado es: ", num2 * num2
	FinSi
	
	// si primero es menor que el cuarto
	
	si num1 < num4
		media = (num1 + num2 + num3 + num4) / 4
		Escribir "La media de los cuatro numeros es: ", media
	FinSi
	
	// si segundo es mayor al tercero
	
	si num2 < num3
		si n3 > 49 Y n3 < 701
			suma = num1 + num2 + num3 + num4
			Escribir "La suma de los 4 numeros es: ", suma
		FinSi
	FinSi	
	
Escribir "La cantidad de pares es: ", cantPares
Escribir "El numero mayor es: ", numMayor	

FinProceso

