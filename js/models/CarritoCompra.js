class CarritoCompra {

    constructor(items = []) {

        this.listaProductos = items;

    }


    agregarProducto(producto) {

        const existente =
            this.listaProductos.find(
                item =>
                    item.producto.idProducto ===
                    producto.idProducto
            );


        if (existente) {

            existente.cantidad++;

        } else {

            this.listaProductos.push({

                producto: producto,

                cantidad: 1

            });

        }

    }


    eliminarProducto(idProducto) {

        this.listaProductos =
            this.listaProductos.filter(
                item =>
                    item.producto.idProducto !==
                    idProducto
            );

    }


    actualizarCantidad(
        idProducto,
        nuevaCantidad
    ) {

        const item =
            this.listaProductos.find(
                item =>
                    item.producto.idProducto ===
                    idProducto
            );


        if (!item) {
            return;
        }


        if (nuevaCantidad <= 0) {

            this.eliminarProducto(
                idProducto
            );

            return;
        }


        item.cantidad =
            nuevaCantidad;

    }


    calcularTotal() {

        return this.listaProductos.reduce(

            (total, item) => {

                return total +
                    (
                        item.producto.precio *
                        item.cantidad
                    );

            },

            0

        );

    }


    cantidadTotal() {

        return this.listaProductos.reduce(

            (total, item) =>
                total + item.cantidad,

            0

        );

    }

}

export default CarritoCompra;