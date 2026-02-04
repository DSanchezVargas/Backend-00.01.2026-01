Proceso Ejercicio19
	
    Definir id, dias Como Entero
    Definir salarioDiario, pagoTotal Como Real
	
    Escribir "Ingrese el ID del empleado (1 a 4):"
    Leer id
    Escribir "Ingrese la cantidad de dias trabajados (maximo 6):"
    Leer dias
	
    Si dias < 0 O dias > 6 Entonces
        Escribir "Error: cantidad de dias invalida"
    Sino
        Segun id Hacer
            1:
                salarioDiario <- 56
            2:
                salarioDiario <- 64
            3:
                salarioDiario <- 80
            4:
                salarioDiario <- 48
            De Otro Modo:
                Escribir "Error: ID de empleado invalido"
                salarioDiario <- 0
        FinSegun
		
        pagoTotal <- salarioDiario * dias
		
        Si salarioDiario > 0 Entonces
            Escribir "El pago total al empleado es: $", pagoTotal
        FinSi
    FinSi
	
	
FinProceso



//Hacer un algoritmo en Pseint para una heladería se tienen 4 tipos de empleados ordenados de la siguiente forma con su número identificador y salario diario correspondiente:

//Cajero (56$/día).
//Servidor (64$/día).
//Preparador de mezclas (80$/día).
//Mantenimiento (48$/día).
//El dueño de la tienda desea tener un programa donde sólo ingrese dos números enteros que representen al número identificador del empleado y 
//la cantidad de días que trabajó en la semana (6 días máximos). Y el programa le mostrará por pantalla la cantidad de dinero que el dueño le debe pagar al empleado que ingresó

