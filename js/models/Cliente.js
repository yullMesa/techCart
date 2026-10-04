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

        this.termsAccepted = termsAccepted;
        this.termsAcceptedAt = termsAcceptedAt;
        this.termsVersion = termsVersion;
    }


    // =========================================
    // NORMALIZAR TEXTO
    // =========================================

    static normalizar(valor) {

        return String(valor ?? "")
            .trim()
            .toLowerCase();

    }


    // =========================================
    // OBTENER CLIENTES
    // =========================================

    static obtenerClientes() {

        const data =
            localStorage.getItem(
                "techCartClientes"
            );


        if (!data) {
            return [];
        }


        try {

            const clientes =
                JSON.parse(data);


            return Array.isArray(clientes)
                ? clientes
                : [];

        }

        catch (error) {

            console.error(
                "Error leyendo techCartClientes:",
                error
            );

            return [];

        }

    }


    // =========================================
    // REGISTRAR
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
    // LOGIN
    // =========================================

    static iniciarSesion(
        usuarioOCorreo,
        password
    ) {

        const clientes =
            Cliente.obtenerClientes();


        const identificador =
            Cliente.normalizar(
                usuarioOCorreo
            );


        return clientes.find(
            cliente => {


                const usuario =
                    Cliente.normalizar(
                        cliente.usuario
                    );


                const correo =
                    Cliente.normalizar(
                        cliente.correo
                    );


                const coincideIdentificador =
                    usuario === identificador ||
                    correo === identificador;


                const coincidePassword =
                    String(cliente.password) ===
                    String(password);


                return (
                    coincideIdentificador &&
                    coincidePassword
                );

            }

        ) || null;

    }


    // =========================================
    // RECUPERAR CONTRASEÑA
    // =========================================

    static recuperarPassword(
        usuarioONombre,
        correo
    ) {

        const clientes =
            Cliente.obtenerClientes();


        const identificadorBuscado =
            Cliente.normalizar(
                usuarioONombre
            );


        const correoBuscado =
            Cliente.normalizar(
                correo
            );


        return clientes.find(
            cliente => {


                const usuarioGuardado =
                    Cliente.normalizar(
                        cliente.usuario
                    );


                const nombreGuardado =
                    Cliente.normalizar(
                        cliente.nombre
                    );


                const correoGuardado =
                    Cliente.normalizar(
                        cliente.correo
                    );


                const coincideIdentificador =
                    usuarioGuardado ===
                    identificadorBuscado
                    ||
                    nombreGuardado ===
                    identificadorBuscado;


                const coincideCorreo =
                    correoGuardado ===
                    correoBuscado;


                return (
                    coincideIdentificador &&
                    coincideCorreo
                );

            }

        ) || null;

    }


    // =========================================
    // USUARIO DUPLICADO
    // =========================================

    static usuarioExiste(usuario) {

        const clientes =
            Cliente.obtenerClientes();


        const usuarioBuscado =
            Cliente.normalizar(usuario);


        return clientes.some(
            cliente =>
                Cliente.normalizar(
                    cliente.usuario
                ) === usuarioBuscado
        );

    }


    // =========================================
    // CORREO DUPLICADO
    // =========================================

    static correoExiste(correo) {

        const clientes =
            Cliente.obtenerClientes();


        const correoBuscado =
            Cliente.normalizar(correo);


        return clientes.some(
            cliente =>
                Cliente.normalizar(
                    cliente.correo
                ) === correoBuscado
        );

    }


    // =========================================
    // BUSCAR POR ID
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