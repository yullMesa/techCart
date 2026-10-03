class StorageService {

    static getClientes() {
        return JSON.parse(
            localStorage.getItem("techCartClientes")
        ) || [];
    }

    static saveClientes(clientes) {
        localStorage.setItem(
            "techCartClientes",
            JSON.stringify(clientes)
        );
    }

    static getSession() {
        return JSON.parse(
            localStorage.getItem("techCartSesion")
        );
    }

    static saveSession(session) {
        localStorage.setItem(
            "techCartSesion",
            JSON.stringify(session)
        );

        localStorage.setItem(
            "isLoggedIn",
            "true"
        );
    }

    static clearSession() {
        localStorage.removeItem("techCartSesion");
        localStorage.removeItem("isLoggedIn");
    }

    static getCart() {

        const data =
            localStorage.getItem(
                "techCartCarrito"
            );


        return data
            ? JSON.parse(data)
            : [];

    }


    static saveCart(items) {

        localStorage.setItem(
            "techCartCarrito",
            JSON.stringify(items)
        );

    }


    static clearCart() {

        localStorage.removeItem(
            "techCartCarrito"
        );

    }
}

export default StorageService;