class CarritoCompra {

    constructor(
        listaProductos = []
    ) {

        this.listaProductos =
            Array.isArray(listaProductos)
                ? listaProductos
                : [];


        this.total =
            this.calcularTotal();

    }


    // =========================================
    // AGREGAR PRODUCTO
    // =========================================

    agregarProducto(
        producto,
        cantidad = 1
    ) {

        if (!producto) {
            return false;
        }


        const cantidadNueva =
            Math.max(
                1,
                Number(cantidad) || 1
            );


        const existente =
            this.listaProductos.find(
                item =>
                    Number(
                        item.producto?.idProducto
                    ) ===
                    Number(
                        producto.idProducto
                    )
            );


        if (existente) {

            const stock =
                Number(
                    existente.producto?.stock
                    ?? Infinity
                );


            existente.cantidad =
                Math.min(
                    Number(existente.cantidad || 1)
                    + cantidadNueva,
                    stock
                );

        }

        else {

            this.listaProductos.push({

                producto:
                    producto,

                cantidad:
                    cantidadNueva

            });

        }


        this.total =
            this.calcularTotal();


        return true;

    }


    // =========================================
    // ELIMINAR PRODUCTO
    // =========================================

    eliminarProducto(
        idProducto
    ) {

        const cantidadAnterior =
            this.listaProductos.length;


        this.listaProductos =
            this.listaProductos.filter(
                item =>
                    Number(
                        item.producto?.idProducto
                    ) !==
                    Number(
                        idProducto
                    )
            );


        this.total =
            this.calcularTotal();


        return (
            this.listaProductos.length
            !== cantidadAnterior
        );

    }


    // =========================================
    // ACTUALIZAR CANTIDAD
    // =========================================

    actualizarCantidad(
        idProducto,
        nuevaCantidad
    ) {

        const item =
            this.listaProductos.find(
                productoCarrito =>
                    Number(
                        productoCarrito.producto?.idProducto
                    ) ===
                    Number(
                        idProducto
                    )
            );


        if (!item) {
            return false;
        }


        const cantidad =
            Number(
                nuevaCantidad
            );


        if (
            !Number.isFinite(cantidad)
            ||
            cantidad < 1
        ) {

            return false;

        }


        const stock =
            Number(
                item.producto?.stock
                ?? Infinity
            );


        item.cantidad =
            Math.min(
                cantidad,
                stock
            );


        this.total =
            this.calcularTotal();


        return true;

    }


    // =========================================
    // CALCULAR TOTAL
    // =========================================

    calcularTotal() {

        return this.listaProductos.reduce(
            (
                acumulado,
                item
            ) => {

                const precio =
                    Number(
                        item.producto?.precio
                        || 0
                    );


                const cantidad =
                    Number(
                        item.cantidad
                        || 0
                    );


                return acumulado
                    + (
                        precio
                        * cantidad
                    );

            },
            0
        );

    }


    // =========================================
    // CONTAR UNIDADES
    // =========================================

    contarProductos() {

        return this.listaProductos.reduce(
            (
                total,
                item
            ) =>
                total
                + Number(
                    item.cantidad
                    || 0
                ),
            0
        );

    }


    // =========================================
    // VACIAR
    // =========================================

    vaciar() {

        this.listaProductos =
            [];


        this.total =
            0;

    }

}


export default CarritoCompra;
