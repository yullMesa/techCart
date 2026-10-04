class Router {

    constructor() {

        this.views =
            document.querySelectorAll(
                ".spa-view"
            );

        this.pageTitle =
            document.getElementById(
                "pageTitle"
            );

        this.pageSubtitle =
            document.getElementById(
                "pageSubtitle"
            );


        this.viewInfo = {

            inicio: {

                title:
                    "Inicio",

                subtitle:
                    "Bienvenido a tu espacio TechCart"

            },


            productos: {

                title:
                    "Productos",

                subtitle:
                    "Explora nuestro catálogo tecnológico"

            },


            categorias: {

                title:
                    "Categorías",

                subtitle:
                    "Encuentra productos por categoría"

            },


            carrito: {

                title:
                    "Mi carrito",

                subtitle:
                    "Administra los productos seleccionados"

            },


            compras: {

                title:
                    "Mis compras",

                subtitle:
                    "Consulta tus órdenes realizadas"

            },

            historial: {

                title:
                    "Historial",

                subtitle:
                    "Consulta y filtra tus compras anteriores"

            },


            perfil: {

                title:
                    "Mi perfil",

                subtitle:
                    "Administra tu información personal"

            }

        };

    }


    // =========================================
    // CAMBIAR VISTA SPA
    // =========================================

    show(viewName) {

        this.views.forEach(
            (view) => {

                view.classList.remove(
                    "active-view"
                );

            }
        );


        const selectedView =
            document.getElementById(
                `view-${viewName}`
            );


        if (!selectedView) {

            console.warn(
                `Vista no encontrada: ${viewName}`
            );

            return;

        }


        selectedView.classList.add(
            "active-view"
        );


        this.updateHeader(
            viewName
        );

    }


    // =========================================
    // ACTUALIZAR HEADER
    // =========================================

    updateHeader(viewName) {

        const info =
            this.viewInfo[
                viewName
                ];


        if (!info) {
            return;
        }


        if (this.pageTitle) {

            this.pageTitle.textContent =
                info.title;

        }


        if (this.pageSubtitle) {

            this.pageSubtitle.textContent =
                info.subtitle;

        }

    }

}


export default Router;