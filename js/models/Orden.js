class Orden {

    constructor(
        cliente,
        listaProductos,
        total,
        envio = null
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


        this.envio = envio;
        this.subtotal = envio ? Number(envio.subtotal) : this.total;
        this.costoEnvio = envio ? Number(envio.costoEnvio) : 0;

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
            subtotal: this.subtotal,
            costoEnvio: this.costoEnvio,
            envio: this.envio,

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
            subtotal: this.subtotal,
            costoEnvio: this.costoEnvio,
            envio: this.envio,

            productos:
                this.listaProductos

        };

    }

}


export default Orden;
