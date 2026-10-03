import StorageService from "./StorageService.js";

class AuthService {

    static isAuthenticated() {
        return localStorage.getItem("isLoggedIn") === "true";
    }

    static verificarPassword(clienteId, password) {

        const clientes = StorageService.getClientes();

        const cliente = clientes.find(
            cliente => String(cliente.id) === String(clienteId)
        );

        if (!cliente) {
            return false;
        }

        return cliente.password === password;
    }

    static logout() {
        StorageService.clearSession();
    }
}

export default AuthService;