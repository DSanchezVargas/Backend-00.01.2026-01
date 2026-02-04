//40. Hacer un algoritmo en Pseint que cumpla 
//con la aproximación del número pi con la serie de Nilakantha.
//La formula que se debe aplicar es:
//Pi = = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - 4/(8*9*10) + 4/(10*11*12) - 4/(12*13*14) ...

Algoritmo Ejercicio40
	
	Definir n, i, a Como Entero
	Definir termino, pie Como Real
	Definir signo Como Entero
	
	Escribir "Ingrese la cantidad de terminos para aproximar PI:"
	Leer n
	
	Si n <= 0 Entonces
		Escribir "La cantidad de terminos debe ser mayor que 0."
	SiNo
		
		pie <- 3
		signo <- 1
		a <- 2   // primer valor del denominador
		
		Para i <- 1 Hasta n
			termino <- 4 / (a * (a + 1) * (a + 2))
			pie <- pie + signo * termino
			signo <- signo * (-1)
			a <- a + 2
		FinPara
		
		Escribir "La aproximacion de PI usando ", n, " terminos es:"
		Escribir pie
		
	FinSi
	
FinAlgoritmo
