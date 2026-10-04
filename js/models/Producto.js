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

        this.idProducto =
            idProducto;

        this.nombre =
            nombre;

        this.descripcion =
            descripcion;

        this.precio =
            Number(precio) || 0;

        this.stock =
            Number(stock) || 0;

        this.imagen =
            imagen;

        this.categoria =
            categoria;

    }


    // =========================================
    // MOSTRAR INFORMACIÓN
    // =========================================

    mostrarInfo() {

        return {

            idProducto:
            this.idProducto,

            nombre:
            this.nombre,

            descripcion:
            this.descripcion,

            precio:
            this.precio,

            stock:
            this.stock,

            imagen:
            this.imagen,

            categoria:
            this.categoria

        };

    }


    // =========================================
    // ACTUALIZAR STOCK
    // =========================================

    actualizarStock(
        cantidad
    ) {

        const cantidadNumerica =
            Number(cantidad);


        if (
            !Number.isInteger(
                cantidadNumerica
            )
            ||
            cantidadNumerica <= 0
        ) {

            throw new Error(
                "La cantidad debe ser un número entero mayor que cero."
            );

        }


        if (
            cantidadNumerica
            >
            this.stock
        ) {

            throw new Error(
                "No hay suficiente stock disponible."
            );

        }


        this.stock -=
            cantidadNumerica;


        return this.stock;

    }


    // =========================================
    // CONSULTAR DISPONIBILIDAD
    // =========================================

    tieneStock(
        cantidad = 1
    ) {

        const cantidadNumerica =
            Number(cantidad);


        return (
            cantidadNumerica > 0
            &&
            cantidadNumerica <= this.stock
        );

    }


    // =========================================
    // PRECIO FORMATEADO
    // =========================================

    obtenerPrecioFormateado() {

        return new Intl
            .NumberFormat(
                "es-CO",
                {

                    style:
                        "currency",

                    currency:
                        "COP",

                    maximumFractionDigits:
                        0

                }
            )
            .format(
                this.precio
            );

    }

}


export default Producto;