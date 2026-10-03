class Producto {

    constructor(
        idProducto,
        nombre,
        descripcion,
        precio,
        stock,
        imagen,
        categoria
    ) {

        this.idProducto = idProducto;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.categoria = categoria;
    }


    mostrarInfo() {

        return {
            idProducto: this.idProducto,
            nombre: this.nombre,
            descripcion: this.descripcion,
            precio: this.precio,
            stock: this.stock,
            imagen: this.imagen,
            categoria: this.categoria
        };

    }


    actualizarStock(cantidad) {

        this.stock -= cantidad;

    }

}

export default Producto;