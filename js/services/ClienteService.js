import StorageService
    from "./StorageService.js";


class ClienteService {


    // =========================================
    // BUSCAR CLIENTE
    // =========================================

    static getClienteById(clienteId) {

        const clientes =
            StorageService.getClientes();


        return clientes.find(
            cliente =>
                String(cliente.id) ===
                String(clienteId)
        ) || null;

    }



    // =========================================
    // VALIDAR USUARIO/CORREO DUPLICADO
    // =========================================

    static datosDisponibles(
        clienteId,
        usuario,
        correo
    ) {

        const clientes =
            StorageService.getClientes();


        const usuarioDuplicado =
            clientes.some(cliente => {

                return (
                    String(cliente.id) !==
                    String(clienteId)
                    &&
                    cliente.usuario.toLowerCase() ===
                    usuario.toLowerCase()
                );

            });


        const correoDuplicado =
            clientes.some(cliente => {

                return (
                    String(cliente.id) !==
                    String(clienteId)
                    &&
                    cliente.correo.toLowerCase() ===
                    correo.toLowerCase()
                );

            });


        return {

            usuarioDisponible:
                !usuarioDuplicado,

            correoDisponible:
                !correoDuplicado

        };

    }



    // =========================================
    // ACTUALIZAR CLIENTE
    // =========================================

    static actualizarCliente(
        clienteId,
        nuevosDatos
    ) {

        const clientes =
            StorageService.getClientes();


        const index =
            clientes.findIndex(
                cliente =>
                    String(cliente.id) ===
                    String(clienteId)
            );


        if (index === -1) {

            return null;

        }


        clientes[index] = {

            ...clientes[index],

            ...nuevosDatos

        };


        StorageService.saveClientes(
            clientes
        );


        return clientes[index];

    }

}


export default ClienteService;