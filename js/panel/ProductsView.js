import ProductService
    from "../services/ProductService.js";

import StorageService
    from "../services/StorageService.js";


class ProductsView {

    constructor() {

        this.productos =
            [];

        this.productosFiltrados =
            [];

        this.container =
            null;

        this.subtitle =
            null;

        this.currentCategory =
            null;

    }


    // =========================================
    // INICIALIZAR
    // =========================================

    async init() {

        this.container =
            document.getElementById(
                "productsGrid"
            );


        this.subtitle =
            document.getElementById(
                "productsSubtitle"
            );


        if (!this.container) {

            console.warn(
                "No se encontró #productsGrid"
            );

            return;

        }


        this.productos =
            await ProductService
                .getProductos();


        this.productosFiltrados = [
            ...this.productos
        ];


        this.renderProductos(
            this.productosFiltrados
        );


        this.bindEvents();


        const categoriaGuardada =
            sessionStorage.getItem(
                "techCartSelectedCategory"
            );


        if (categoriaGuardada) {

            this.filtrarPorCategoria(
                categoriaGuardada
            );


            sessionStorage.removeItem(
                "techCartSelectedCategory"
            );

        }

    }


    // =========================================
    // EVENTOS
    // =========================================

    bindEvents() {

        window.addEventListener(
            "techcart:category-selected",
            event => {

                this.filtrarPorCategoria(
                    event.detail.category
                );

            }
        );


        this.container.addEventListener(
            "click",
            event => {


                // =================================
                // AGREGAR AL CARRITO
                // =================================

                const addButton =
                    event.target.closest(
                        "[data-add-cart]"
                    );


                if (addButton) {

                    const id =
                        Number(
                            addButton.dataset.addCart
                        );


                    this.agregarAlCarrito(
                        id
                    );


                    return;

                }


                // =================================
                // QUITAR FILTRO
                // =================================

                const clearFilterButton =
                    event.target.closest(
                        "[data-clear-category]"
                    );


                if (
                    clearFilterButton
                ) {

                    this.quitarFiltro();

                }

            }
        );

    }


    // =========================================
    // FILTRAR POR CATEGORÍA
    // =========================================

    filtrarPorCategoria(
        categoria
    ) {

        const categoriaBuscada =
            String(
                categoria || ""
            )
                .trim()
                .toLowerCase();


        if (!categoriaBuscada) {

            this.quitarFiltro();

            return;

        }


        this.currentCategory =
            categoriaBuscada;


        this.productosFiltrados =
            this.productos.filter(
                producto =>

                    String(
                        producto.categoria || ""
                    )
                        .trim()
                        .toLowerCase() ===
                    categoriaBuscada
            );


        this.actualizarSubtitulo();


        this.renderProductos(
            this.productosFiltrados
        );

    }


    // =========================================
    // QUITAR FILTRO
    // =========================================

    quitarFiltro() {

        this.currentCategory =
            null;


        this.productosFiltrados = [
            ...this.productos
        ];


        if (this.subtitle) {

            this.subtitle.textContent =
                "Explora nuestro catálogo tecnológico.";

        }


        sessionStorage.removeItem(
            "techCartSelectedCategory"
        );


        this.renderProductos(
            this.productosFiltrados
        );

    }


    // =========================================
    // ACTUALIZAR SUBTÍTULO
    // =========================================

    actualizarSubtitulo() {

        if (!this.subtitle) {
            return;
        }


        const nombres = {

            laptops:
                "Laptops",

            smartphones:
                "Smartphones",

            accesorios:
                "Accesorios",

            smartwatches:
                "Smartwatches",

            audio:
                "Audio",

            gaming:
                "Gaming"

        };


        const nombre =
            nombres[
                this.currentCategory
                ]
            ||
            this.currentCategory;


        this.subtitle.textContent =
            `Mostrando productos de la categoría: ${nombre}`;

    }


    // =========================================
    // RENDER
    // =========================================

    renderProductos(
        productos
    ) {

        if (!this.container) {

            return;

        }


        // =========================================
        // BOTÓN QUITAR FILTRO
        // =========================================

        const filterHeader =
            this.currentCategory
                ? `
                    <div class="products-filter-bar">

                        <span>
                            Filtro activo:
                            <strong>
                                ${this.getCategoryName(
                    this.currentCategory
                )}
                            </strong>
                        </span>

                        <button
                            type="button"
                            class="clear-filter-button"
                            data-clear-category
                        >
                            ✕ Quitar filtro
                        </button>

                    </div>
                `
                : "";


        if (
            !productos ||
            productos.length === 0
        ) {

            this.container.innerHTML = `

                ${filterHeader}

                <div class="empty-state">

                    <div class="empty-icon">
                        🔎
                    </div>

                    <h2>
                        No encontramos productos
                    </h2>

                    <p>
                        No hay productos disponibles
                        en esta categoría.
                    </p>

                    <button
                        type="button"
                        class="primary-button"
                        data-clear-category
                    >
                        Ver todos los productos
                    </button>

                </div>

            `;


            return;

        }


        this.container.innerHTML = `

            ${filterHeader}

            ${productos
            .map(
                producto =>
                    this.crearCard(
                        producto
                    )
            )
            .join("")
        }

        `;

    }


    // =========================================
    // NOMBRE DE CATEGORÍA
    // =========================================

    getCategoryName(
        categoria
    ) {

        const nombres = {

            laptops:
                "Laptops",

            smartphones:
                "Smartphones",

            accesorios:
                "Accesorios",

            smartwatches:
                "Smartwatches",

            audio:
                "Audio",

            gaming:
                "Gaming"

        };


        return nombres[categoria]
            || categoria;

    }


    // =========================================
    // CARD PRODUCTO
    // =========================================

    crearCard(
        producto
    ) {

        return `

            <article
                class="internal-product-card"
            >

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                >


                <h3>
                    ${producto.nombre}
                </h3>


                <p>
                    ${producto.descripcion}
                </p>


                <strong>
                    ${this.formatearPrecio(
            producto.precio
        )}
                </strong>


                <button
                    type="button"
                    data-add-cart="${producto.idProducto}"
                >
                    🛒 Agregar al carrito
                </button>

            </article>

        `;

    }


    // =========================================
    // AGREGAR AL CARRITO
    // =========================================

    agregarAlCarrito(
        idProducto
    ) {

        const producto =
            this.productos.find(
                item =>
                    Number(
                        item.idProducto
                    ) ===
                    Number(
                        idProducto
                    )
            );


        if (!producto) {

            return;

        }


        const carritoActual =
            StorageService.getCart
                ? StorageService.getCart()
                : JSON.parse(
                    localStorage.getItem(
                        "techCartCarrito"
                    ) || "[]"
                );


        const carrito =
            Array.isArray(
                carritoActual
            )
                ? carritoActual
                : [];


        const existente =
            carrito.find(
                item =>
                    Number(
                        item.producto?.idProducto
                        ??
                        item.idProducto
                    ) ===
                    Number(
                        producto.idProducto
                    )
            );


        if (existente) {

            existente.cantidad =
                Number(
                    existente.cantidad || 1
                ) + 1;

        }

        else {

            carrito.push({

                producto:
                producto,

                cantidad:
                    1

            });

        }


        if (
            StorageService.saveCart
        ) {

            StorageService.saveCart(
                carrito
            );

        }

        else {

            localStorage.setItem(
                "techCartCarrito",
                JSON.stringify(
                    carrito
                )
            );

        }


        window.dispatchEvent(
            new CustomEvent(
                "cart-updated"
            )
        );


        Swal.fire({

            icon:
                "success",

            title:
                "Producto agregado",

            text:
                `${producto.nombre} fue agregado al carrito.`,

            timer:
                1100,

            showConfirmButton:
                false

        });

    }


    // =========================================
    // PRECIO
    // =========================================

    formatearPrecio(
        precio
    ) {

        return new Intl
            .NumberFormat(
                "es-CO",
                {
                    style:
                        "currency",

                    currency:
                        "COP",

                    maximumFractionDigits:
                        0
                }
            )
            .format(
                precio
            );

    }

}


export default ProductsView;