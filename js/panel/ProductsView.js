import ProductService
    from "../services/ProductService.js";

import StorageService
    from "../services/StorageService.js";


class ProductsView {

    constructor() {

        this.productos = [];

        this.container = null;

        this.subtitle = null;

        this.currentCategory = null;

    }


    // ===============================
    // INIT
    // ===============================

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

            console.error(
                "No existe #productsGrid"
            );

            return;
        }


        this.productos =
            await ProductService
                .getProductos();


        console.log(
            "Productos cargados:",
            this.productos.length
        );


        this.renderProductos(
            this.productos
        );


        this.bindEvents();

        this.actualizarContadores();

    }


    // ===============================
    // TODOS LOS EVENTOS
    // ===============================

    bindEvents() {

        document.addEventListener(
            "click",
            event => {


                // =========================
                // AGREGAR AL CARRITO
                // =========================

                const addButton =
                    event.target.closest(
                        "[data-add-cart]"
                    );

                if (addButton) {

                    const id =
                        Number(
                            addButton.dataset.addCart
                        );

                    this.agregarAlCarrito(id);

                    return;
                }


                // =========================
                // CATEGORÍA
                // =========================

                const categoryCard =
                    event.target.closest(
                        "[data-category]"
                    );

                if (categoryCard) {

                    const category =
                        categoryCard.dataset.category;

                    this.filtrarPorCategoria(
                        category
                    );


                    document
                        .querySelector(
                            '[data-view="productos"]'
                        )
                        ?.click();

                    return;
                }


                // =========================
                // QUITAR FILTRO
                // =========================

                const clearButton =
                    event.target.closest(
                        "[data-clear-category]"
                    );

                if (clearButton) {

                    this.quitarFiltro();

                }

            }
        );

    }


    // ===============================
    // CARRITO
    // ===============================

    agregarAlCarrito(idProducto) {

        const producto =
            this.productos.find(
                item =>
                    Number(
                        item.idProducto
                    ) ===
                    Number(idProducto)
            );


        if (!producto) {

            console.error(
                "Producto no encontrado",
                idProducto
            );

            return;
        }


        const carrito =
            StorageService.getCart();


        const existente =
            carrito.find(
                item =>
                    Number(
                        item.producto?.idProducto
                    ) ===
                    Number(idProducto)
            );


        if (existente) {

            const nuevaCantidad =
                Number(
                    existente.cantidad || 1
                ) + 1;


            if (
                producto.stock &&
                nuevaCantidad >
                Number(producto.stock)
            ) {

                Swal.fire({

                    icon: "warning",

                    title:
                        "Stock máximo alcanzado",

                    confirmButtonColor:
                        "#0875ec"

                });

                return;
            }


            existente.cantidad =
                nuevaCantidad;

        } else {

            carrito.push({

                producto: {

                    idProducto:
                    producto.idProducto,

                    nombre:
                    producto.nombre,

                    descripcion:
                    producto.descripcion,

                    precio:
                        Number(
                            producto.precio
                        ),

                    stock:
                        Number(
                            producto.stock
                        ),

                    imagen:
                    producto.imagen,

                    categoria:
                    producto.categoria

                },

                cantidad: 1

            });

        }


        StorageService.saveCart(
            carrito
        );


        console.log(
            "Carrito guardado:",
            StorageService.getCart()
        );


        this.actualizarContadores();


        window.dispatchEvent(
            new CustomEvent(
                "cart-updated"
            )
        );


        Swal.fire({

            icon: "success",

            title:
                "Producto agregado",

            text:
            producto.nombre,

            timer: 900,

            showConfirmButton:
                false

        });

    }


    // ===============================
    // CONTADORES
    // ===============================

    actualizarContadores() {

        const carrito =
            StorageService.getCart();


        const cantidad =
            carrito.reduce(
                (total, item) =>
                    total +
                    Number(
                        item.cantidad || 0
                    ),
                0
            );


        // IDs normales

        [
            "sidebarCartCount",
            "topbarCartCount",
            "dashboardCartCount"
        ]
            .forEach(
                id => {

                    const element =
                        document.getElementById(
                            id
                        );

                    if (element) {

                        element.textContent =
                            cantidad;

                    }

                }
            );


        // Fallback por clases

        document
            .querySelectorAll(
                ".sidebar-badge"
            )
            .forEach(
                element => {

                    element.textContent =
                        cantidad;

                }
            );

    }


    // ===============================
    // CATEGORÍAS
    // ===============================

    filtrarPorCategoria(
        categoria
    ) {

        this.currentCategory =
            String(categoria)
                .trim()
                .toLowerCase();


        const filtrados =
            this.productos.filter(
                producto =>
                    String(
                        producto.categoria || ""
                    )
                        .trim()
                        .toLowerCase()
                    ===
                    this.currentCategory
            );


        console.log(
            "Categoría:",
            this.currentCategory,
            "Resultados:",
            filtrados.length
        );


        if (this.subtitle) {

            this.subtitle.textContent =
                `Mostrando categoría: ${this.getCategoryName(
                    this.currentCategory
                )}`;

        }


        this.renderProductos(
            filtrados
        );

    }


    quitarFiltro() {

        this.currentCategory =
            null;


        if (this.subtitle) {

            this.subtitle.textContent =
                "Explora nuestro catálogo tecnológico.";

        }


        this.renderProductos(
            this.productos
        );

    }


    // ===============================
    // RENDER
    // ===============================

    renderProductos(productos) {

        const filtro =
            this.currentCategory
                ? `
                    <div class="products-filter-bar">

                        <span>
                            Filtro:
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


        this.container.innerHTML = `

            ${filtro}

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


    crearCard(producto) {

        return `

            <article
                class="internal-product-card"
            >

                <img
                    src="${producto.imagen}"
                    alt="${producto.nombre}"
                    onerror="this.style.display='none'"
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


    getCategoryName(categoria) {

        const names = {

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


        return names[categoria]
            || categoria;

    }


    formatearPrecio(precio) {

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
                Number(precio) || 0
            );

    }

}


export default ProductsView;