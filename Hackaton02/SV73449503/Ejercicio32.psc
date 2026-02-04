Proceso Ejercicio32
	
    Definir i Como Entero
    Definir poblacion, mayorPoblacion Como Entero
    Definir ciudad, ciudadMayor Como Cadena
    Definir provincia, provinciaMayor Como Entero
	
    mayorPoblacion <- 0
	
    Para i <- 1 Hasta 11 Hacer
        Escribir "Ingrese el nombre de la ciudad ", i, ":"
        Leer ciudad
        Escribir "Ingrese la provincia (1, 2 o 3):"
        Leer provincia
        Escribir "Ingrese la poblacion de la ciudad:"
        Leer poblacion
		
        Si poblacion > mayorPoblacion Entonces
            mayorPoblacion <- poblacion
            ciudadMayor <- ciudad
            provinciaMayor <- provincia
        FinSi
    FinPara
	
    Escribir "La ciudad con mayor poblacion es: ", ciudadMayor
    Escribir "Provincia: ", provinciaMayor
    Escribir "Cantidad de habitantes: ", mayorPoblacion
	
FinProceso


//Se quiere saber cuál es la ciudad con la población de más personas, son tres provincias y once ciudades, 
//hacer un algoritmo en Pseint que nos permita saber eso. 

