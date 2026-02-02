//29. Hacer un algoritmo en Pseint para calcular la suma 
//de los primeros cien números con un ciclo mientras.

Algoritmo Ejercicio29
    Definir limite, n, suma Como Entero
    Definir continuar Como Caracter
	
    continuar <- "S"
	
    Mientras continuar = "S" O continuar = "s" Hacer
        Escribir "Ingrese hasta qué número desea sumar los primeros números positivos: "
        Leer limite
		
        Si limite <= 0 Entonces
            Escribir "Número inválido. Debe ser mayor que 0."
        SiNo
            n <- 1
            suma <- 0
            Mientras n <= limite
                suma <- suma + n
                n <- n + 1
            FinMientras
			
            Escribir "La suma de los primeros ", limite, " números es: ", suma
        FinSi
		
        Escribir "¿Desea calcular otra suma? (S/N): "
        Leer continuar
    FinMientras
	
    Escribir "Gracias por usar el programa."
FinAlgoritmo
