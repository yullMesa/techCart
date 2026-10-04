class CategoriesView {

    constructor(
        router,
        productsView
    ) {

        this.router =
            router;

        this.productsView =
            productsView;

    }


    // =========================================
    // INICIAR
    // =========================================

    init() {

        /*
         * Usamos delegación de eventos.
         * Así funciona aunque las tarjetas
         * hayan sido creadas antes o después.
         */

        document.addEventListener(
            "click",
            event => {

                const categoryCard =
                    event.target.closest(
                        "[data-category]"
                    );


                if (!categoryCard) {

                    return;

                }


                const category =
                    categoryCard.dataset.category;


                if (!category) {

                    console.warn(
                        "La tarjeta no tiene categoría."
                    );

                    return;

                }


                console.log(
                    "Categoría seleccionada:",
                    category
                );


                // =================================
                // FILTRAR PRODUCTOS DIRECTAMENTE
                // =================================

                this.productsView
                    .filtrarPorCategoria(
                        category
                    );


                // =================================
                // ABRIR VISTA PRODUCTOS
                // =================================

                this.router.show(
                    "productos"
                );

            }
        );

    }

}


export default CategoriesView;