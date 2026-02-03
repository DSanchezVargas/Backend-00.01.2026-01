Proceso Ejercicio_N18
///Hacer un algoritmo en Pseint para una empresa se encarga de la venta y distribución de CD vírgenes. 
///Los clientes pueden adquirir los artículos (supongamos un único producto de una única marca) 
///por cantidad. Los precios son:

///$10. Si se compran unidades separadas hasta 9.
///$8. Si se compran entre 10 unidades hasta 99.		
///$7. Entre 100 y 499 unidades.		
///$6. Para mas de 500 unidades.		
	
///La ganancia para el vendedor es de 8,25 % de la venta. Realizar un algoritmo en Pseint 
///que dado un número de CDs a vender calcule el precio total para el cliente y 
///la ganancia para el vendedor.	
	Definir cant Como Entero
	Definir ganancia Como Real
	Escribir "Escriba la cantidad que desea comprar"
	Leer cant
	si cant<=9 Entonces
		ganancia=(cant*10)*0.0825
	FinSi
	si cant>=10 y cant<=99 Entonces
		ganancia=(cant*8)*0.0825
	FinSi
	si cant>=100 y cant<=499 Entonces
		ganancia=(cant*7)*0.0825
	FinSi
	si cant>=500  Entonces
		ganancia=(cant*6)*0.0825
	FinSi
	Escribir "La ganancia del trabajador es : ", ganancia
FinProceso
