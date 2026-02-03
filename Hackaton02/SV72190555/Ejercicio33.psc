//33. Hacer un algoritmo en Pseint que permita 
//al usuario continuar con el programa.

Algoritmo Ejercicio33
	
    Dimension v[100]       // Vector para guardar hasta 100 números
    Definir n Como Entero
    Definir suma, media Como Real
    
    n <- 0
	Definir continuar Como Caracter
	
    continuar <- "S"
	
    Mientras continuar = "S" O continuar = "s" Hacer
        
		Escribir "Ingrese números positivos (un número negativo para terminar):"
		
		Repetir
			n <- n + 1
			Leer v[n]
		Hasta Que v[n] < 0          // Si el número es negativo, se acaba el bucle
		
		// Ajustamos n porque el último valor es negativo
		n <- n - 1
		
		// Suma todos los números positivos almacenados en el vector
		suma <- 0
		Para i <- 1 Hasta n
			suma <- suma + v[i]
		FinPara
		
		Si n > 0 Entonces
			media <- suma / n
			Escribir "La media de los ", n, " números positivos ingresados es: ", media
		SiNo
			Escribir "No se ingresaron números positivos."
		FinSi
		
        Escribir "¿Desea calcular otra suma? (S/N): "
        Leer continuar
    FinMientras
	
    Escribir "Gracias por usar el programa."

FinAlgoritmo