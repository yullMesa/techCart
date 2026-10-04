class ClienteService {

    static STORAGE_KEY =
        "techCartClientes";


    // =========================================
    // NORMALIZAR TEXTO
    // =========================================

    static normalizar(
        valor
    ) {

        return String(
            valor ?? ""
        )
            .trim()
            .toLowerCase();

    }


    // =========================================
    // OBTENER TODOS LOS CLIENTES
    // =========================================

    static getClientes() {

        const data =
            localStorage.getItem(
                this.STORAGE_KEY
            );


        if (!data) {

            return [];

        }


        try {

            const clientes =
                JSON.parse(data);


            return Array.isArray(
                clientes
            )
                ? clientes
                : [];

        }

        catch (error) {

            console.error(
                "Error leyendo clientes:",
                error
            );


            return [];

        }

    }


    // =========================================
    // BUSCAR CLIENTE POR ID
    // =========================================

    static getClienteById(
        idCliente
    ) {

        const clientes =
            this.getClientes();


        return clientes.find(
            cliente =>
                String(
                    cliente.id
                ) ===
                String(
                    idCliente
                )
        ) || null;

    }


    // =========================================
    // BUSCAR CLIENTE POR USUARIO
    // =========================================

    static getClienteByUsuario(
        usuario
    ) {

        const clientes =
            this.getClientes();


        const usuarioBuscado =
            this.normalizar(
                usuario
            );


        return clientes.find(
            cliente =>
                this.normalizar(
                    cliente.usuario
                ) ===
                usuarioBuscado
        ) || null;

    }


    // =========================================
    // BUSCAR CLIENTE POR CORREO
    // =========================================

    static getClienteByCorreo(
        correo
    ) {

        const clientes =
            this.getClientes();


        const correoBuscado =
            this.normalizar(
                correo
            );


        return clientes.find(
            cliente =>
                this.normalizar(
                    cliente.correo
                ) ===
                correoBuscado
        ) || null;

    }


    // =========================================
    // VALIDAR DISPONIBILIDAD DE DATOS
    // =========================================

    static datosDisponibles(
        idCliente,
        usuario,
        correo
    ) {

        const clientes =
            this.getClientes();


        const usuarioBuscado =
            this.normalizar(
                usuario
            );


        const correoBuscado =
            this.normalizar(
                correo
            );


        const usuarioOcupado =
            clientes.some(
                cliente =>
                    String(
                        cliente.id
                    ) !==
                    String(
                        idCliente
                    )
                    &&
                    this.normalizar(
                        cliente.usuario
                    ) ===
                    usuarioBuscado
            );


        const correoOcupado =
            clientes.some(
                cliente =>
                    String(
                        cliente.id
                    ) !==
                    String(
                        idCliente
                    )
                    &&
                    this.normalizar(
                        cliente.correo
                    ) ===
                    correoBuscado
            );


        return {

            usuarioDisponible:
                !usuarioOcupado,

            correoDisponible:
                !correoOcupado

        };

    }


    // =========================================
    // ACTUALIZAR CLIENTE
    // =========================================

    static actualizarCliente(
        idCliente,
        nuevosDatos
    ) {

        const clientes =
            this.getClientes();


        const index =
            clientes.findIndex(
                cliente =>
                    String(
                        cliente.id
                    ) ===
                    String(
                        idCliente
                    )
            );


        if (index === -1) {

            return null;

        }


        clientes[index] = {

            ...clientes[index],

            ...nuevosDatos

        };


        localStorage.setItem(
            this.STORAGE_KEY,
            JSON.stringify(
                clientes
            )
        );


        return clientes[index];

    }


    // =========================================
    // GUARDAR CLIENTES
    // =========================================

    static guardarClientes(
        clientes
    ) {

        localStorage.setItem(
            this.STORAGE_KEY,
            JSON.stringify(
                Array.isArray(clientes)
                    ? clientes
                    : []
            )
        );

    }

}


export default ClienteService;