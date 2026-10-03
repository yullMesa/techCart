class Cliente {
    constructor(
        id,
        nombre,
        correo,
        direccionEnvio,
        usuario,
        password
    ) {
        this.id = id;
        this.nombre = nombre;
        this.correo = correo;
        this.direccionEnvio = direccionEnvio;
        this.usuario = usuario;
        this.password = password;
    }

    modificarDatos(datos) {
        this.nombre = datos.nombre;
        this.correo = datos.correo;
        this.direccionEnvio = datos.direccionEnvio;
        this.usuario = datos.usuario;
    }
}

export default Cliente;