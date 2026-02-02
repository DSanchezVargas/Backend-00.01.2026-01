//32. Se quiere saber cuál es la ciudad con la población de más personas,
//son tres provincias y once ciudades, hacer un algoritmo en
//Pseint que nos permita saber eso. 

Algoritmo Ejercicio32
	
    Definir i, posMax Como Entero
    Definir poblacionMax Como Entero
	
    Dimension Ciudad[11]
    Dimension Provincia[11]
    Dimension Poblacion[11]
	
    Para i <- 1 Hasta 11
        Escribir "Ingrese el nombre de la ciudad ", i, ": "
        Leer Ciudad[i]
		
        Escribir "Ingrese la provincia de la ciudad ", i, ": "
        Leer Provincia[i]
		
        Escribir "Ingrese la población de la ciudad ", i, ": "
        Leer Poblacion[i]
    FinPara
	
    poblacionMax <- Poblacion[1]
    posMax <- 1
	
    Para i <- 2 Hasta 11
        Si Poblacion[i] > poblacionMax Entonces
            poblacionMax <- Poblacion[i]
            posMax <- i
        FinSi
    FinPara
	
    Escribir "La ciudad con mayor población es: ", Ciudad[posMax]
    Escribir "Provincia: ", Provincia[posMax]
    Escribir "Población: ", poblacionMax
	
FinAlgoritmo

