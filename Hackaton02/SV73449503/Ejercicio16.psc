Proceso Ejercicio16
	
    Definir n Como Entero
    Definir dia Como Cadena
	
    Escribir "Ingrese un numero del 1 al 7:"
    Leer n
	
    Segun n Hacer
        1:
            dia <- "Lunes"
        2:
            dia <- "Martes"
        3:
            dia <- "Miercoles"
        4:
            dia <- "Jueves"
        5:
            dia <- "Viernes"
        6:
            dia <- "Sabado"
        7:
            dia <- "Domingo"
        De Otro Modo:
            dia <- ""  
    FinSegun
	
    Si dia <> "" Entonces
        Escribir "El dia correspondiente es: ", dia
    Sino
        Escribir "Error: el numero debe estar entre 1 y 7."
    FinSi
	
	
	
FinProceso



//Hacer un algoritmo en Pseint que lea un número y según ese número, 
// indique el día que corresponde.

