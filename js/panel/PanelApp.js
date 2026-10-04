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
        // PRODUCTOS
        // =========================================

        this.productsView =
            new ProductsView();


        // =========================================
        // CATEGORÍAS
        // =========================================

        this.categoriesView =
            new CategoriesView(
                this.router
            );


        // =========================================
        // CARRITO
        // =========================================

        this.cartView =
            new CartView();

    }


    // =========================================
    // INICIAR APLICACIÓN
    // =========================================

    async init() {

        const accesoPermitido =
            this.protegerPanel();


        if (!accesoPermitido) {

            return;

        }


        // =====================================
        // INICIAR MÓDULOS
        // =====================================

        this.sidebar.init();

        this.profileView.init();

        this.chatbot.init();


        // Productos carga JSON de forma asíncrona

        await this.productsView.init();


        // Categorías escucha clics

        this.categoriesView.init();


        // Carrito

        this.cartView.init();


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