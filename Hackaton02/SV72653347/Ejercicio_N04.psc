Proceso Ejercicio_N04
	///Hacer un algoritmo en Pseint que lea tres números enteros y los muestre de menor a mayor.
	Definir n1,n2,n3,temp Como Entero
	Escribir "Escriba el primero numero"
	Leer n1
	Escribir "Escriba el segundo numero"
	Leer n2
	Escribir "Escriba el tercero numero"
	Leer n3
	
	si n1 > n2 Entonces
		temp=n1
		n1=n2
		n2=temp
	FinSi
	si n2 > n3 Entonces
		temp=n2
		n2=n3
		n3=temp
	FinSi
	si n1 > n2 Entonces
		temp=n1
		n1=n2
		n2=temp
	FinSi
	Escribir n1 " , " n2 , " , " n3
FinProceso
