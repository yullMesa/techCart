class Orden {

    constructor(
        cliente,
        listaProductos,
        total
    ) {

        this.numeroOrden =
            `TC-${Date.now()}`;


        this.cliente =
            cliente;


        this.listaProductos =
            Array.isArray(listaProductos)
                ? listaProductos
                : [];


        this.total =
            Number(total) || 0;


        this.fecha =
            new Date()
                .toISOString();


        this.estado =
            "Confirmada";

    }


    generarOrden() {

        return {

            numeroOrden:
                this.numeroOrden,

            cliente:
                this.cliente,

            listaProductos:
                this.listaProductos,

            total:
                this.total,

            fecha:
                this.fecha,

            estado:
                this.estado

        };

    }


    mostrarResumen() {

        return {

            numeroOrden:
                this.numeroOrden,

            fecha:
                this.fecha,

            estado:
                this.estado,

            total:
                this.total,

            productos:
                this.listaProductos

        };

    }

}


export default Orden;
