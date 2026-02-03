//39. Hacer un algoritmo en Pseint que cumpla con la aproximación 
//del número pi con la serie de Gregory-Leibniz.
//La formula que se debe aplicar es:
//Pi = (4/1) - (4/3) + (4/5) - (4/7) + (4/9) - (4/11) + (4/13) - (4/15) ...
//Pi = 4 * ((1/1) - (1/3) + (1/5) - (1/7) + (1/9) - (1/11) + (1/13) - (1/15) ...)


Algoritmo Ejercicio39
	
	// n: cantidad de términos que usará la serie
	// i: contador del ciclo
	Definir n, i Como Entero
	
	// pie: acumulador del valor aproximado de PI
	// termino: valor de cada término de la serie
	Definir termino, pie Como Real
	
	// signo alterna entre +1 y -1 para la suma y resta
	Definir signo Como Entero
	
	// Solicitar cantidad de términos
	Escribir "Ingrese la cantidad de terminos para aproximar PI:"
	Leer n
	
	// Validación básica
	Si n <= 0 Entonces
		Escribir "La cantidad de terminos debe ser mayor que 0."
	SiNo
		
		// Inicialización
		pie <- 0
		signo <- 1   // el primer término es positivo
		
		// Ciclo principal de la serie
		Para i <- 1 Hasta n
			
			// Genera los denominadores: 1, 3, 5, 7, ...
			termino <- 4 / (2*i - 1)
			
			// Suma o resta el término según el signo
			pie <- pie + signo * termino
			
			// Cambia el signo para el siguiente término
			signo <-  (-1) * signo
			
		FinPara
		
		// Resultado final
		Escribir "La aproximacion de PI usando ", n, " terminos es:"
		Escribir pie
		
	FinSi
	
FinAlgoritmo
