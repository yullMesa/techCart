document.addEventListener("DOMContentLoaded", () => {


    // =========================================
    // ESTADO DE SESIÓN
    // =========================================

    const isLoggedIn =
        localStorage.getItem("isLoggedIn") === "true";



    // =========================================
    // ELEMENTOS GENERALES
    // =========================================

    const loginButton =
        document.querySelector(".btn-login");


    const registerButton =
        document.querySelector(".btn-register");


    const addCartButtons =
        document.querySelectorAll(".add-cart");


    const goCartButton =
        document.querySelector(".go-cart");


    const cartHeader =
        document.querySelector(".cart-header");


    const viewCartLink =
        document.querySelector(".view-cart-link");


    const navCart =
        document.querySelector(".nav-cart");


    const footerCartLink =
        document.querySelector(".footer-cart-link");


    const viewAllProducts =
        document.querySelector(".view-all-products");


    const offersButton =
        document.querySelector(".offers-button");


    const footerOffersLink =
        document.querySelector(".footer-offers-link");


    const searchInput =
        document.getElementById("searchInput");


    const categories =
        document.querySelectorAll(".category");


    const productCards =
        document.querySelectorAll(".product-card");



    // =========================================
    // RUTAS
    // =========================================

    const LOGIN_URL =
        "./formulario/login.html";


    const SIGNUP_URL =
        "./formulario/signup.html";



    // =========================================
    // FUNCIÓN: SOLICITAR LOGIN
    // =========================================

    function requireLogin(event) {


        if (event) {

            event.preventDefault();

        }


        // Si posteriormente existe una sesión real,
        // permitiremos la acción.

        if (isLoggedIn) {

            return true;

        }


        Swal.fire({

            icon: "info",

            title:
                "Inicia sesión para continuar",

            text:
                "Para acceder a esta función debes iniciar sesión o crear una cuenta en TechCart.",

            showDenyButton: true,

            showCancelButton: true,

            confirmButtonText:
                "Iniciar sesión",

            denyButtonText:
                "Registrarme",

            cancelButtonText:
                "Ahora no",

            confirmButtonColor:
                "#0875ec",

            denyButtonColor:
                "#13ae9f"

        }).then((result) => {


            if (result.isConfirmed) {

                window.location.href =
                    LOGIN_URL;

            }


            else if (result.isDenied) {

                window.location.href =
                    SIGNUP_URL;

            }


        });


        return false;

    }



    // =========================================
    // LOGIN
    // =========================================

    if (loginButton) {


        loginButton.addEventListener(
            "click",
            () => {


                window.location.href =
                    LOGIN_URL;


            }
        );


    }



    // =========================================
    // REGISTRO
    // =========================================

    if (registerButton) {


        registerButton.addEventListener(
            "click",
            () => {


                window.location.href =
                    SIGNUP_URL;


            }
        );


    }



    // =========================================
    // AGREGAR AL CARRITO
    // =========================================

    addCartButtons.forEach((button) => {


        button.addEventListener(
            "click",
            (event) => {


                // Si no tiene sesión,
                // NO agregamos nada.

                if (!requireLogin(event)) {

                    return;

                }


                // Más adelante, cuando hagamos
                // el carrito real con POO:
                //
                // carrito.agregarProducto(producto);


            }
        );


    });



    // =========================================
    // BOTÓN "IR AL CARRITO"
    // =========================================

    if (goCartButton) {


        goCartButton.addEventListener(
            "click",
            (event) => {


                if (!requireLogin(event)) {

                    return;

                }


                // Próximamente:
                //
                // window.location.href =
                //     "./pages/carrito.html";


            }
        );


    }



    // =========================================
    // ICONO CARRITO HEADER
    // =========================================

    if (cartHeader) {


        cartHeader.addEventListener(
            "click",
            (event) => {


                if (!requireLogin(event)) {

                    return;

                }


            }
        );


    }



    // =========================================
    // "VER CARRITO" DEL SIDEBAR
    // =========================================

    if (viewCartLink) {


        viewCartLink.addEventListener(
            "click",
            (event) => {


                if (!requireLogin(event)) {

                    return;

                }


            }
        );


    }



    // =========================================
    // CARRITO DEL MENÚ PRINCIPAL
    // =========================================

    if (navCart) {


        navCart.addEventListener(
            "click",
            (event) => {


                if (!requireLogin(event)) {

                    return;

                }


            }
        );


    }



    // =========================================
    // CARRITO DEL FOOTER
    // =========================================

    if (footerCartLink) {


        footerCartLink.addEventListener(
            "click",
            (event) => {


                if (!requireLogin(event)) {

                    return;

                }


            }
        );


    }



    // =========================================
    // VER TODOS LOS PRODUCTOS
    // =========================================

    if (viewAllProducts) {


        viewAllProducts.addEventListener(
            "click",
            (event) => {


                if (!requireLogin(event)) {

                    return;

                }


                // Próximamente:
                //
                // window.location.href =
                //     "./pages/productos.html";


            }
        );


    }



    // =========================================
    // BUSCADOR + CATEGORÍAS
    // =========================================

    let selectedCategory = "todos";



    // =========================================
    // NORMALIZAR TEXTO
    // =========================================

    function normalizeText(text) {


        return text
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();


    }



    // =========================================
    // FILTRAR PRODUCTOS
    // =========================================

    function filterProducts() {


        const searchText =
            searchInput
                ? normalizeText(searchInput.value)
                : "";


        let visibleProducts = 0;


        productCards.forEach((card) => {


            const cardCategory =
                card.dataset.category || "";


            const normalizedCategory =
                normalizeText(cardCategory);


            const productName =
                card.querySelector("h3")
                    ?.textContent || "";


            const productDescription =
                card.querySelector(".product-info p")
                    ?.textContent || "";


            const imageAlt =
                card.querySelector("img")
                    ?.alt || "";


            const searchableText =
                normalizeText(
                    productName +
                    " " +
                    productDescription +
                    " " +
                    imageAlt +
                    " " +
                    cardCategory
                );


            // Coincidencia del buscador

            const matchesSearch =
                searchText === "" ||
                searchableText.includes(searchText);


            // Coincidencia de categoría

            const categoriesOfProduct =
                normalizedCategory.split(/\s+/);


            const matchesCategory =
                selectedCategory === "todos" ||
                categoriesOfProduct.includes(
                    selectedCategory
                );


            // Mostrar u ocultar

            if (
                matchesSearch &&
                matchesCategory
            ) {

                card.style.display = "";

                visibleProducts++;

            }

            else {

                card.style.display = "none";

            }


        });



        // Si el usuario busca algo
        // que no existe:

        showNoResultsMessage(
            visibleProducts,
            searchText
        );


    }



    // =========================================
    // MENSAJE SIN RESULTADOS
    // =========================================

    function showNoResultsMessage(
        visibleProducts,
        searchText
    ) {


        let message =
            document.querySelector(
                ".no-results-message"
            );


        // Si sí hay productos visibles,
        // quitamos el mensaje.

        if (visibleProducts > 0) {


            if (message) {

                message.remove();

            }


            return;

        }


        // Crear mensaje solo una vez.

        if (!message) {


            message =
                document.createElement("div");


            message.className =
                "no-results-message";


            message.style.gridColumn =
                "1 / -1";


            message.style.textAlign =
                "center";


            message.style.padding =
                "40px 20px";


            message.style.color =
                "#748096";


            message.style.background =
                "#ffffff";


            message.style.borderRadius =
                "12px";


            const productsGrid =
                document.querySelector(
                    ".products-grid"
                );


            if (productsGrid) {

                productsGrid.appendChild(
                    message
                );

            }


        }


        if (searchText) {


            message.innerHTML = `

                <strong
                    style="
                        display:block;
                        color:#101b3d;
                        font-size:18px;
                        margin-bottom:8px;
                    "
                >
                    No encontramos productos
                </strong>

                <span>
                    Intenta buscar con otra palabra.
                </span>

            `;


        }

        else {


            message.innerHTML = `

                <strong
                    style="
                        display:block;
                        color:#101b3d;
                        font-size:18px;
                        margin-bottom:8px;
                    "
                >
                    No hay productos en esta categoría
                </strong>

                <span>
                    Muy pronto agregaremos nuevos productos.
                </span>

            `;


        }


    }



    // =========================================
    // EVENTOS DE CATEGORÍAS
    // =========================================

    categories.forEach((category) => {


        category.addEventListener(
            "click",
            () => {


                // Quitar selección actual

                categories.forEach((item) => {


                    item.classList.remove(
                        "active-category"
                    );


                });



                // Activar categoría elegida

                category.classList.add(
                    "active-category"
                );



                // Obtener categoría

                selectedCategory =
                    normalizeText(
                        category.dataset.category
                        || "todos"
                    );



                // Filtrar

                filterProducts();


            }
        );


    });



    // =========================================
    // EVENTO DEL BUSCADOR
    // =========================================

    if (searchInput) {


        searchInput.addEventListener(
            "input",
            () => {


                filterProducts();


            }
        );


    }



    // =========================================
    // OFERTAS
    // =========================================

    function showOffersAlert(event) {


        if (event) {

            event.preventDefault();

        }


        // Si después tenemos usuario autenticado,
        // aquí podremos mostrar promociones reales.

        if (isLoggedIn) {


            Swal.fire({

                icon: "success",

                title:
                    "Ofertas TechCart",

                text:
                    "Muy pronto mostraremos aquí las promociones disponibles.",

                confirmButtonText:
                    "Entendido",

                confirmButtonColor:
                    "#0875ec"

            });


            return;

        }



        Swal.fire({

            icon: "success",

            title:
                "¿Quieres obtener las mejores ofertas?",

            text:
                "Inicia sesión o crea una cuenta para acceder a promociones exclusivas de TechCart.",

            showDenyButton: true,

            showCancelButton: true,

            confirmButtonText:
                "Iniciar sesión",

            denyButtonText:
                "Registrarme",

            cancelButtonText:
                "Ahora no",

            confirmButtonColor:
                "#0875ec",

            denyButtonColor:
                "#13ae9f"

        }).then((result) => {


            if (result.isConfirmed) {


                window.location.href =
                    LOGIN_URL;


            }


            else if (result.isDenied) {


                window.location.href =
                    SIGNUP_URL;


            }


        });


    }



    // BOTÓN GRANDE "VER OFERTAS"

    if (offersButton) {


        offersButton.addEventListener(
            "click",
            showOffersAlert
        );


    }



    // ENLACE "OFERTAS" DEL FOOTER

    if (footerOffersLink) {


        footerOffersLink.addEventListener(
            "click",
            showOffersAlert
        );


    }



    // =========================================
    // BOTONES X DEL MINI CARRITO
    // =========================================
    //
    // Todavía NO eliminan productos,
    // porque el carrito aún no está implementado.
    // Si el usuario intenta utilizarlos,
    // solicitamos autenticación.
    // =========================================

    const removeButtons =
        document.querySelectorAll(".remove");


    removeButtons.forEach((button) => {


        button.addEventListener(
            "click",
            (event) => {


                if (!requireLogin(event)) {

                    return;

                }


            }
        );


    });



    // =========================================
    // INICIALIZACIÓN
    // =========================================

    filterProducts();


});