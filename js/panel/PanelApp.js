import Router from "./Router.js";
import Sidebar from "./Sidebar.js";
import ProfileView from "./ProfileView.js";
import Chatbot from "./Chatbot.js";
import ProductsView from "./ProductsView.js";
import CartView from "./CartView.js";


class PanelApp {

    constructor() {

        this.router =
            new Router();

        this.sidebar =
            new Sidebar(
                this.router
            );

        this.profileView =
            new ProfileView();

        this.chatbot =
            new Chatbot(
                this.router
            );

        this.productsView =
            new ProductsView();

        this.cartView =
            new CartView();

    }


    init() {

        this.protegerPanel();

        this.sidebar.init();

        this.profileView.init();

        this.chatbot.init();

        this.productsView.init();

        this.cartView.init();

        this.router.show("inicio");

    }


    protegerPanel() {

        const logged =
            localStorage.getItem(
                "isLoggedIn"
            ) === "true";


        if (!logged) {

            window.location.href =
                "../formulario/login.html";

        }

    }

}


const app =
    new PanelApp();

app.init();