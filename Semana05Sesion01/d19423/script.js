console.log("Inicio de la aplicacion");

let objGato01={
    nombre: "Pancho",
    sexo: "Macho",
    peso: 4.5,
    color: "Atigrado",
    raza: "Mestiza",
    dormir(){
        console.log("Se esta durmiendo")
    },
    despertar(){
         console.log("Se esta despertando")
    }
}

let objGato02={
    nombre: "Felipa",
    sexo: "Hembra",
    peso: 4,
    color: "Calico",
    raza: "Mestiza",
    dormir(){
        console.log("Se esta durmiendo")
    },
    despertar(){
         console.log("Se esta despertando")
    }
}

objGato01.despertar()
//abstraccion

//encapsulamiento

//herencia

//Polimorfismo

let admin = true;



// let objTV1 = new Television("00009","JVC","KTV0001","2025-10-25","LED",55,"GoogleTV");

// console.log(objTV1.nombre);

// let objTV2 = new Television("0009999","Samsung","Cristal","2022-09-01","OLED", 55,"Tizen");

// console.log(objTV2.modelo);

// objTV2.encender();
// objTV1.encender();

// objTV2.modelo = "Apple TV";

// console.log(objTV2.modelo);

// console.log(objTV1.getPrecio());

// objTV1.setPrecio(900);

// console.log(objTV1.getPrecio());

class Dispositivo{
    constructor(tipo, isActivo=false){
        this.tipo = tipo;
        this.isActivo = isActivo;
    }
}


class Electrodomesticos{
    #costo=0
    constructor(serie, marca,modelo,conectividad,precio,fechaCompra= new Date()){
        this.serie = serie;
        this.marca = marca; 
        this.modelo = modelo;
        this.conectividad = conectividad;
        this.precio = precio;
        this.fechaCompra = fechaCompra;
    }
    encender(){
        console.log(`El electrodomestico ${this.marca} se esta encendiendo`)
    }
    apagar(){
        console.log(`El electrodomestico ${this.marca} se esta apagando`)
    }
    getCosto(){
        if(admin)return this.#costo;
    }
    setCosto(newCosto){
        if(admin) this.#costo = newCosto;
    }
    conectarAlInternet(dispositivo){
        this.conectividad.forEach(element => {
            if(element.tipo === dispositivo){
                element.isActivo = true;
                console.log(`El dispositivo de conectividad ${element.tipo} se ha activado`)
            }
            else{
                element.isActivo = false;
                console.log(`El dispositivo de conectividad ${element.tipo} se ha desactivado`)
            }
        });
    }
}

class LineaBlanca extends Electrodomesticos{
    constructor(serie, marca,modelo,conectividad,precio,fechaCompra){
        super(serie, marca,modelo,conectividad,precio,fechaCompra);
    }
}

class LineaMarron extends Electrodomesticos{
    constructor(serie, marca,modelo,conectividad,precio,fechaCompra, entradas , salidas){
        super(serie, marca,modelo,conectividad,precio,fechaCompra);
        this.entradas = entradas;
        this.salidas = salidas;
    }
    cambiarEntrada(entrada){
        this.entradas.forEach(element=>{
            if(element.tipo === entrada){
                element.isActivo = true;
                console.log(`El dispositivo de entrada ${element.tipo} se ha activado`)
            }
            else{
                element.isActivo = false;
                console.log(`El dispositivo de entrada ${element.tipo} se ha desactivado`)
            }
        })
    }
    cambiarSalida(salida){
        this.salidas.forEach(element=>{
            if(element.tipo === salida){
                element.isActivo = true;
                console.log(`El dispositivo de salida ${element.tipo} se ha activado`)
            }
            else{
                element.isActivo = false;
                console.log(`El dispositivo de salida ${element.tipo} se ha desactivado`)
            }
        })
    }
}

class Television extends LineaMarron{
    constructor(serie, marca,modelo,conectividad,precio,fechaCompra, entradas , salidas,formato,tamaño,sistemaOperativo){
        super(serie, marca,modelo,conectividad,precio,fechaCompra, entradas , salidas);
        this.formato = formato;
        this.tamaño = tamaño;
        this.sistemaOperativo =sistemaOperativo;
    }
    cambiarCanal(numeroCanal){
        let exito = false;
        this.entradas.forEach(element=>{
            if(element.isActivo && element.tipo === "Cable"){
                exito =true;
                console.log(`La television ${this.marca} ${this.modelo} esta mostrando el canal ${numeroCanal}`);
            }
            if(!exito){
                console.log(`La television ${this.marca} ${this.modelo} no puede realizar esta accion`);
            }
        })
    }
    encender(){
        console.log(`La Television ${this.marca} ${this.modelo} se esta encendiendo`)
    }
}



let objTV0001 = new Television("000001","JVC","KTV0001",[
    new Dispositivo("WIFI"),
    new Dispositivo("BT"),
    new Dispositivo("LAN",true)
],900.99,null,[
    new Dispositivo("HDMI"),
    new Dispositivo("Cable", true),
    new Dispositivo("BT-IN")
],[
    new Dispositivo("Parlantes"),
    new Dispositivo("BT-OUT")
],"4K",55,"GoogleTV");
console.log(objTV0001)


objTV0001.apagar();
objTV0001.conectarAlInternet("WIFI");
objTV0001.cambiarEntrada("HDMI");

objTV0001.cambiarEntrada("Cable");
objTV0001.cambiarCanal(88);

objTV0001.encender();

let objLineaBlanca = new LineaBlanca("ttttt","Sony", "3333",[],99,null);

objLineaBlanca.encender()