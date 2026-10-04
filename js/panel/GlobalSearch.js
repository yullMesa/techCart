class GlobalSearch {

    constructor(
        router,
        productsView
    ) {

        this.router =
            router;

        this.productsView =
            productsView;

        this.input =
            null;

        this.button =
            null;

    }


    // =========================================
    // INIT
    // =========================================

    init() {

        this.input =
            document.getElementById(
                "globalSearchInput"
            );


        this.button =
            document.getElementById(
                "globalSearchButton"
            );


        if (!this.input) {

            console.error(
                "No existe #globalSearchInput"
            );

            return;

        }


        console.log(
            "Buscador global iniciado"
        );


        this.bindEvents();

    }


    // =========================================
    // EVENTOS
    // =========================================

    bindEvents() {

        // ENTER

        this.input.addEventListener(
            "keydown",
            event => {

                if (
                    event.key
                    ===
                    "Enter"
                ) {

                    event.preventDefault();

                    this.executeSearch();

                }

            }
        );


        // CLIC EN LUPA

        this.button
            ?.addEventListener(
                "click",
                () => {

                    this.executeSearch();

                }
            );

    }


    // =========================================
    // EJECUTAR BÚSQUEDA
    // =========================================

    executeSearch() {

        const query =
            this.input
                .value
                .trim();


        console.log(
            "Buscando:",
            query
        );


        if (!query) {

            Swal.fire({

                icon:
                    "info",

                title:
                    "Escribe algo",

                text:
                    "Ingresa una palabra para buscar en TechCart.",

                confirmButtonColor:
                    "#0875ec"

            });


            return;

        }


        this.search(
            query
        );

    }


    // =========================================
    // BUSCAR
    // =========================================

    search(
        query
    ) {

        const text =
            this.normalize(
                query
            );


        // =====================================
        // INICIO
        // =====================================

        if (
            this.matches(
                text,
                [
                    "inicio",
                    "home",
                    "principal"
                ]
            )
        ) {

            this.goTo(
                "inicio"
            );

            return;

        }


        // =====================================
        // CARRITO
        // =====================================

        if (
            this.matches(
                text,
                [
                    "carrito",
                    "carro",
                    "cesta"
                ]
            )
        ) {

            this.goTo(
                "carrito"
            );

            return;

        }


        // =====================================
        // HISTORIAL
        // =====================================

        if (
            this.matches(
                text,
                [
                    "historial",
                    "anteriores",
                    "compras anteriores"
                ]
            )
        ) {

            this.goTo(
                "historial"
            );

            return;

        }


        // =====================================
        // PERFIL
        // =====================================

        if (
            this.matches(
                text,
                [
                    "perfil",
                    "mi perfil",
                    "datos personales",
                    "cuenta"
                ]
            )
        ) {

            this.goTo(
                "perfil"
            );

            return;

        }


        // =====================================
        // MIS COMPRAS
        // =====================================

        if (
            this.matches(
                text,
                [
                    "mis compras",
                    "compras",
                    "orden",
                    "ordenes",
                    "recibo",
                    "recibos"
                ]
            )
        ) {

            this.goTo(
                "compras"
            );

            return;

        }


        // =====================================
        // CATEGORÍAS
        // =====================================

        if (
            this.matches(
                text,
                [
                    "categoria",
                    "categorias"
                ]
            )
        ) {

            this.goTo(
                "categorias"
            );

            return;

        }


        // =====================================
        // PRODUCTOS
        // =====================================

        const resultados =
            this.productsView
                .buscarPorTexto(
                    query
                );


        console.log(
            "Resultados encontrados:",
            resultados
        );


        if (
            Array.isArray(
                resultados
            )
            &&
            resultados.length > 0
        ) {

            this.router.show(
                "productos"
            );


            this.clear();

            return;

        }


        // =====================================
        // SIN RESULTADOS
        // =====================================

        Swal.fire({

            icon:
                "info",

            title:
                "Sin resultados",

            text:
                `No encontramos coincidencias para "${query}".`,

            confirmButtonColor:
                "#0875ec"

        });

    }


    // =========================================
    // IR A VISTA
    // =========================================

    goTo(
        view
    ) {

        console.log(
            "Navegando a:",
            view
        );


        this.router.show(
            view
        );


        this.clear();

    }


    // =========================================
    // COINCIDENCIA
    // =========================================

    matches(
        text,
        words
    ) {

        return words.some(
            word => {

                const normalizedWord =
                    this.normalize(
                        word
                    );


                return (
                    text
                    ===
                    normalizedWord
                    ||
                    text.includes(
                        normalizedWord
                    )
                );

            }
        );

    }


    // =========================================
    // NORMALIZAR
    // =========================================

    normalize(
        text
    ) {

        return String(
            text || ""
        )
            .toLowerCase()
            .normalize(
                "NFD"
            )
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .trim();

    }


    // =========================================
    // LIMPIAR
    // =========================================

    clear() {

        if (this.input) {

            this.input.value =
                "";

        }

    }

}


export default GlobalSearch;