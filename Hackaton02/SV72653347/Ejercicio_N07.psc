Proceso Ejercicio_N07
	///Hacer un algoritmo en Pseint para una tienda de helado que da un descuento por compra a sus clientes 
	///con membresía dependiendo de su tipo, sólo existen tres tipos de membresía, tipo A, tipo B y tipo C. 
	///Los descuentos son los siguientes:
	///Tipo A 10% de descuento Tipo B 15% de descuento Tipo C 20% de descuento
	
	Definir mem,memMayuscula,desc Como Caracter
	Escribir "Que tipo de membresia tiene ?"
	leer mem
	
	memMayuscula<- MAYÚSCULAS(mem)
	
	Segun memmayuscula Hacer
		"A":
			desc="Tiene un descuento de 10%"
		"B":
			desc="Tiene un descuento de 15%"
		"C":
			desc="Tiene un descuento de 20%"
		De Otro Modo:
			desc="No tiene descuento"
	Fin Segun
	
	Escribir desc	
FinProceso
