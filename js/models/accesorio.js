import Producto from "./Producto.js";

class Accesorio extends Producto {

    constructor(
        idProducto,
        nombre,
        descripcion,
        precio,
        stock,
        imagen,
        tipoAccesorio
    ) {

        super(
            idProducto,
            nombre,
            descripcion,
            precio,
            stock,
            imagen,
            "accesorios"
        );

        this.tipoAccesorio =
            tipoAccesorio;
    }


    mostrarInfo() {

        return {
            ...super.mostrarInfo(),

            especificaciones:
            this.tipoAccesorio
        };

    }

}

export default Accesorio;