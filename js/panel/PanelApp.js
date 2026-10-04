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

import HistoryView
    from "./HistoryView.js";

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


        // =========================================
        // HISTORIAL HU-07
        // =========================================

        this.historyView =
            new HistoryView();

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
        // SIDEBAR
        // =====================================

        this.sidebar.init();


        // =====================================
        // PERFIL
        // =====================================

        this.profileView.init();


        // =====================================
        // CHATBOT
        // =====================================

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
        // COMPRAS
        // =====================================

        this.ordersView.init();


        // =====================================
        // HISTORIAL
        // =====================================

        this.historyView.init();


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
// INICIAR
// =========================================

const app =
    new PanelApp();


app.init();


export default PanelApp;