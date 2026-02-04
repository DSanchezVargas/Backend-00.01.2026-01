Proceso Aprueba_o_Desaprueba
	
	Escribir "Ingresa la primera nota"
	Leer nota1
	Escribir "Ingresa la segunda nota"
	Leer nota2
	Escribir "Ingresa la tercera nota"
	Leer nota3
	
	promedio = (nota1 + nota2 + nota3) / 3
	
	// Profesor aqui voy a considerar que aprueban con 13 a mas ya que el problema no expresa ese dato
	
	Si promedio > 12
		Entonces
		Escribir "Estudiante Aprueba"
	SiNo
		Escribir "Estudiante Desprueba"
	FinSi
	
FinProceso

