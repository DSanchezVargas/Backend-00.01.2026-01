Proceso aumenta_segundo
	
	Escribir "Ingrese las Horas"
	Leer h
	Escribir "Ingrese los Minutos"
	Leer m
	Escribir "Ingrese Los Segundos"
	Leer s
	
	s = s + 1
	
	Si s = 60
		s = 0
		m = m + 1
		si m = 60
			m = 0
			h = h + 1
			Si h = 24
				h = 0
			FinSi
		FinSi
	FinSi
	
	Escribir h, ":", m, ":", s
	
FinProceso

