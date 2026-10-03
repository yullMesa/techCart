import Producto from "./Producto.js";

class Laptop extends Producto {

    constructor(
        idProducto,
        nombre,
        descripcion,
        precio,
        stock,
        imagen,
        procesador,
        memoriaRAM,
        almacenamiento
    ) {

        super(
            idProducto,
            nombre,
            descripcion,
            precio,
            stock,
            imagen,
            "laptops"
        );

        this.procesador = procesador;
        this.memoriaRAM = memoriaRAM;
        this.almacenamiento = almacenamiento;
    }


    mostrarInfo() {

        return {
            ...super.mostrarInfo(),

            especificaciones:
                `${this.procesador} · ${this.memoriaRAM} RAM · ${this.almacenamiento}`
        };

    }

}

export default Laptop;