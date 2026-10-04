class StorageService {

    static SESSION_KEY = "techCartSesion";
    static CART_KEY = "techCartCarrito";
    static ORDERS_KEY = "techCartOrdenes";


    // ===============================
    // SESIÓN
    // ===============================

    static getSession() {

        const data =
            localStorage.getItem(
                this.SESSION_KEY
            );

        if (!data) {
            return null;
        }

        try {

            return JSON.parse(data);

        } catch (error) {

            console.error(
                "Error leyendo sesión:",
                error
            );

            return null;
        }

    }


    static saveSession(session) {

        localStorage.setItem(
            this.SESSION_KEY,
            JSON.stringify(session)
        );

    }


    // ===============================
    // CARRITO
    // ===============================

    static getCart() {

        const data =
            localStorage.getItem(
                this.CART_KEY
            );

        if (!data) {
            return [];
        }

        try {

            const cart =
                JSON.parse(data);

            return Array.isArray(cart)
                ? cart
                : [];

        } catch (error) {

            console.error(
                "Error leyendo carrito:",
                error
            );

            return [];
        }

    }


    static saveCart(cart) {

        const carrito =
            Array.isArray(cart)
                ? cart
                : [];

        localStorage.setItem(
            this.CART_KEY,
            JSON.stringify(carrito)
        );

        return carrito;
    }


    static clearCart() {

        localStorage.removeItem(
            this.CART_KEY
        );

    }


    // ===============================
    // ÓRDENES
    // ===============================

    static getOrders() {

        const data =
            localStorage.getItem(
                this.ORDERS_KEY
            );

        if (!data) {
            return [];
        }

        try {

            const orders =
                JSON.parse(data);

            return Array.isArray(orders)
                ? orders
                : [];

        } catch (error) {

            return [];
        }

    }


    static saveOrders(orders) {

        localStorage.setItem(
            this.ORDERS_KEY,
            JSON.stringify(
                Array.isArray(orders)
                    ? orders
                    : []
            )
        );

    }


    static addOrder(order) {

        const orders =
            this.getOrders();

        orders.unshift(order);

        this.saveOrders(orders);

        return order;
    }

}


export default StorageService;