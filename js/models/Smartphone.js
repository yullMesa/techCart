import Producto from "./Producto.js";

class Smartphone extends Producto {

    constructor(
        idProducto,
        nombre,
        descripcion,
        precio,
        stock,
        imagen,
        sistemaOperativo,
        pantalla,
        camara
    ) {

        super(
            idProducto,
            nombre,
            descripcion,
            precio,
            stock,
            imagen,
            "smartphones"
        );

        this.sistemaOperativo = sistemaOperativo;
        this.pantalla = pantalla;
        this.camara = camara;
    }


    mostrarInfo() {

        return {
            ...super.mostrarInfo(),

            especificaciones:
                `${this.sistemaOperativo} · ${this.pantalla} · ${this.camara}`
        };

    }

}

export default Smartphone;