Algoritmo Ejercicio19
	
	Definir id, cargo Como Cadena
	Definir dias, continuar Como Entero
	Definir pagoDia, pago Como Real
	
	Repetir
		
		Escribir "========== EMPLEADOS =========="
		Escribir "[01] Cajero ($56 por día)"
		Escribir "[02] Servidor ($64 por día)"
		Escribir "[03] Preparador de mezclas ($80 por día)"
		Escribir "[04] Mantenimiento ($48 por día)"
		Escribir "================================"
		
		Escribir "Ingrese el ID del empleado (ej: 01): "
		Leer id
		
		Si id <> "01" Y id <> "02" Y id <> "03" Y id <> "04" Entonces
			Escribir "ID incorrecto. Vuelva a ingresar."
		SiNo
			
			Escribir "Ingrese los días trabajados (máximo 6): "
			Leer dias
			
			Si dias < 0 O dias > 6 Entonces
				Escribir "Cantidad de días inválida."
			SiNo
				
				Segun id Hacer
					"01":
						pagoDia <- 56
						cargo <- "Cajero"
					"02":
						pagoDia <- 64
						cargo <- "Servidor"
					"03":
						pagoDia <- 80
						cargo <- "Preparador de mezclas"
					"04":
						pagoDia <- 48
						cargo <- "Mantenimiento"
				FinSegun
				
				pago <- dias * pagoDia
				
				Escribir "Empleado: ", cargo, " (ID ", id, ")"
				Escribir "Días trabajados: ", dias
				Escribir "Monto a pagar: $", pago
				
			FinSi
			
		FinSi
		
		Escribir "¿Desea consultar otro empleado? (1=Si / 0=No): "
		Leer continuar
		
	Hasta Que continuar = 0
	
	Escribir "Programa finalizado."
	
FinAlgoritmo
