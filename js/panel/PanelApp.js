import Router
    from "./Router.js";

import Sidebar
    from "./Sidebar.js";

import ProfileView
    from "./ProfileView.js";

import Chatbot
    from "./Chatbot.js";

import CategoriesView
    from "./CategoriesView.js";

import ProductsView
    from "./ProductsView.js";

import CartView
    from "./CartView.js";

import OrdersView
    from "./OrdersView.js";

import AuthService
    from "../services/AuthService.js";


class PanelApp {

    constructor() {

        // =========================================
        // ROUTER
        // =========================================

        this.router =
            new Router();


        // =========================================
        // PRODUCTOS
        // =========================================

        this.productsView =
            new ProductsView();


        // =========================================
        // CATEGORÍAS
        // =========================================

        /*
         * Ahora CategoriesView recibe
         * directamente ProductsView.
         */

        this.categoriesView =
            new CategoriesView(
                this.router,
                this.productsView
            );


        // =========================================
        // SIDEBAR
        // =========================================

        this.sidebar =
            new Sidebar(
                this.router
            );


        // =========================================
        // PERFIL
        // =========================================

        this.profileView =
            new ProfileView();


        // =========================================
        // CHATBOT
        // =========================================

        this.chatbot =
            new Chatbot(
                this.router
            );


        // =========================================
        // CARRITO
        // =========================================

        this.cartView =
            new CartView();


        // =========================================
        // COMPRAS
        // =========================================

        this.ordersView =
            new OrdersView();

    }


    // =========================================
    // INICIAR APP
    // =========================================

    async init() {

        const accesoPermitido =
            this.protegerPanel();


        if (!accesoPermitido) {

            return;

        }


        // =====================================
        // COMPONENTES GENERALES
        // =====================================

        this.sidebar.init();

        this.profileView.init();

        this.chatbot.init();


        // =====================================
        // PRODUCTOS
        // =====================================

        await this.productsView.init();


        // =====================================
        // CATEGORÍAS
        // =====================================

        this.categoriesView.init();


        // =====================================
        // CARRITO
        // =====================================

        this.cartView.init();


        // =====================================
        // ÓRDENES
        // =====================================

        this.ordersView.init();


        // =====================================
        // VISTA INICIAL
        // =====================================

        this.router.show(
            "inicio"
        );

    }


    // =========================================
    // PROTEGER PANEL
    // =========================================

    protegerPanel() {

        const sesionValida =
            AuthService
                .isAuthenticated();


        if (!sesionValida) {

            window.location.href =
                "../formulario/login.html";


            return false;

        }


        return true;

    }

}


// =========================================
// EJECUTAR APP
// =========================================

const app =
    new PanelApp();


app.init();


export default PanelApp;