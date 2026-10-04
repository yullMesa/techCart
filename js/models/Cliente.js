class Cliente {

    constructor(
        id,
        nombre,
        correo,
        direccionEnvio,
        usuario,
        password,
        termsAccepted = false,
        termsAcceptedAt = null,
        termsVersion = null
    ) {

        this.id = id;

        this.nombre = nombre;

        this.correo = correo;

        this.direccionEnvio = direccionEnvio;

        this.usuario = usuario;

        this.password = password;

        this.termsAccepted =
            termsAccepted;

        this.termsAcceptedAt =
            termsAcceptedAt;

        this.termsVersion =
            termsVersion;
    }


    // =========================================
    // OBTENER TODOS LOS CLIENTES
    // =========================================

    static obtenerClientes() {

        const datos =
            localStorage.getItem(
                "techCartClientes"
            );


        if (!datos) {

            return [];

        }


        try {

            return JSON.parse(datos);

        }

        catch (error) {

            console.error(
                "Error al leer los clientes:",
                error
            );

            return [];

        }

    }


    // =========================================
    // REGISTRAR CLIENTE
    // =========================================

    registrar() {

        const clientes =
            Cliente.obtenerClientes();


        clientes.push(this);


        localStorage.setItem(
            "techCartClientes",
            JSON.stringify(clientes)
        );


        return true;
    }


    // =========================================
    // BUSCAR CLIENTE POR ID
    // =========================================

    static buscarPorId(idCliente) {

        const clientes =
            Cliente.obtenerClientes();


        return clientes.find(
            cliente =>
                String(cliente.id) ===
                String(idCliente)
        ) || null;
    }


    // =========================================
    // VALIDAR LOGIN
    // =========================================

    static iniciarSesion(
        usuarioOCorreo,
        password
    ) {

        const clientes =
            Cliente.obtenerClientes();


        const identificador =
            usuarioOCorreo
                .trim()
                .toLowerCase();


        return clientes.find(
            cliente => {

                const coincideUsuario =
                    cliente.usuario
                        .toLowerCase() ===
                    identificador;


                const coincideCorreo =
                    cliente.correo
                        .toLowerCase() ===
                    identificador;


                const coincidePassword =
                    cliente.password ===
                    password;


                return (
                    (
                        coincideUsuario ||
                        coincideCorreo
                    )
                    &&
                    coincidePassword
                );

            }
        ) || null;
    }


    // =========================================
    // COMPROBAR USUARIO DUPLICADO
    // =========================================

    static usuarioExiste(usuario) {

        const clientes =
            Cliente.obtenerClientes();


        return clientes.some(
            cliente =>
                cliente.usuario
                    .toLowerCase() ===
                usuario
                    .trim()
                    .toLowerCase()
        );
    }


    // =========================================
    // COMPROBAR CORREO DUPLICADO
    // =========================================

    static correoExiste(correo) {

        const clientes =
            Cliente.obtenerClientes();


        return clientes.some(
            cliente =>
                cliente.correo
                    .toLowerCase() ===
                correo
                    .trim()
                    .toLowerCase()
        );
    }


    // =========================================
    // MODIFICAR DATOS
    // =========================================

    static modificarDatos(
        idCliente,
        nuevosDatos
    ) {

        const clientes =
            Cliente.obtenerClientes();


        const index =
            clientes.findIndex(
                cliente =>
                    String(cliente.id) ===
                    String(idCliente)
            );


        if (index === -1) {

            return null;

        }


        clientes[index] = {

            ...clientes[index],

            ...nuevosDatos

        };


        localStorage.setItem(
            "techCartClientes",
            JSON.stringify(clientes)
        );


        return clientes[index];
    }

}


export default Cliente;