Proceso Ejercicio31
	
	
    Definir num, i Como Entero
    Definir sumaPares, sumaImpares Como Entero
    Definir contPares, contImpares Como Entero
    Definir mediaPares, mediaImpares Como Real
	
    sumaPares <- 0
    sumaImpares <- 0
    contPares <- 0
    contImpares <- 0
	
    Para i <- 1 Hasta 10 Hacer
        Escribir "Ingrese el numero ", i, ":"
        Leer num
		
        Si num MOD 2 = 0 Entonces
            sumaPares <- sumaPares + num
            contPares <- contPares + 1
        Sino
            sumaImpares <- sumaImpares + num
            contImpares <- contImpares + 1
        FinSi
    FinPara
	
    Si contPares > 0 Entonces
        mediaPares <- sumaPares / contPares
        Escribir "La media de los numeros pares es: ", mediaPares
    Sino
        Escribir "No se ingresaron numeros pares"
    FinSi
	
    Si contImpares > 0 Entonces
        mediaImpares <- sumaImpares / contImpares
        Escribir "La media de los numeros impares es: ", mediaImpares
    Sino
        Escribir "No se ingresaron numeros impares"
    FinSi
FinProceso


//Hacer un algoritmo en Pseint parar calcular la media de los números pares e impares, sólo se ingresará diez números.

