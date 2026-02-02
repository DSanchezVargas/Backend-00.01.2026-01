//30. Hacer un algoritmo en Pseint para calcular 
//la suma de los primeros cien números con un 
///ciclo para.


Algoritmo Ejercicio30
    Definir limite, n, suma Como Entero
    Definir continuar Como Caracter
	
    continuar <- "S"
	
    Mientras continuar = "S" O continuar = "s" Hacer
        Escribir "Ingrese hasta qué número desea sumar los primeros números positivos: "
        Leer limite
		
        Si limite <= 0 Entonces
            Escribir "Número inválido. Debe ser mayor que 0."
        SiNo
            
            suma <- 0
			Para n <- 1 Hasta limite 
				suma <- suma + n
			Fin Para
			
            Escribir "La suma de los primeros ", limite, " números es: ", suma
        FinSi
		
        Escribir "¿Desea calcular otra suma? (S/N): "
        Leer continuar
    FinMientras
	
    Escribir "Gracias por usar el programa."
FinAlgoritmo

