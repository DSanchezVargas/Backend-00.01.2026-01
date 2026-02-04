//31. Hacer un algoritmo en Pseint parar calcular 
//la media de los números pares e impares, 
//sólo se ingresará diez números.

Algoritmo Ejercicio31
	
    Definir i, numero Como Entero
    Definir SumaPar, SumaImpar Como Entero
    Definir ContPar, ContImpar Como Entero
    Definir MediaPar, MediaImpar Como Real
    Definir continuar Como Caracter
	
    continuar <- "S"
	
    Mientras continuar = "S" O continuar = "s" Hacer
		
        SumaPar <- 0
        SumaImpar <- 0
        ContPar <- 0
        ContImpar <- 0
		
        Para i <- 1 Hasta 10
            Escribir "Ingrese el número ", i, ": "
            Leer numero
			
            Si numero MOD 2 = 0 Entonces
                SumaPar <- SumaPar + numero
                ContPar <- ContPar + 1
            SiNo
                SumaImpar <- SumaImpar + numero
                ContImpar <- ContImpar + 1
            FinSi
        FinPara
		
        Si ContPar > 0 Entonces
            MediaPar <- SumaPar / ContPar
            Escribir "La media de los números pares es: ", MediaPar
        SiNo
            Escribir "No se ingresaron números pares."
        FinSi
		
        Si ContImpar > 0 Entonces
            MediaImpar <- SumaImpar / ContImpar
            Escribir "La media de los números impares es: ", MediaImpar
        SiNo
            Escribir "No se ingresaron números impares."
        FinSi
		
        Escribir "¿Desea ingresar un nuevo set de 10 numeros? (S/N): "
        Leer continuar
		
    FinMientras
	
    Escribir "Gracias por usar el programa."
	
FinAlgoritmo
