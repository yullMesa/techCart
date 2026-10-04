import StorageService
    from "../services/StorageService.js";

import CarritoCompra
    from "../models/CarritoCompra.js";

import Orden
    from "../models/Orden.js";


class CartView {

    constructor() {

        this.container =
            null;


        this.carrito =
            new CarritoCompra();


        this.session =
            StorageService.getSession();

    }


    // =========================================
    // INICIAR
    // =========================================

    init() {

        this.container =
            document.getElementById(
                "cartContent"
            );


        if (!this.container) {

            console.warn(
                "No se encontró #cartContent"
            );

            return;

        }


        this.cargarCarrito();

        this.bindEvents();

        this.render();

        this.actualizarContadores();

    }


    // =========================================
    // CARGAR CARRITO PERSISTENTE
    // =========================================

    cargarCarrito() {

        this.carrito =
            new CarritoCompra(
                StorageService.getCart()
            );

    }


    // =========================================
    // EVENTOS
    // =========================================

    bindEvents() {

        this.container.addEventListener(
            "click",
            event => {


                const button =
                    event.target.closest(
                        "[data-cart-action]"
                    );


                if (!button) {
                    return;
                }


                const action =
                    button.dataset.cartAction;


                const idProducto =
                    Number(
                        button.dataset.productId
                    );


                switch (action) {

                    case "increase":

                        this.cambiarCantidad(
                            idProducto,
                            1
                        );

                        break;


                    case "decrease":

                        this.cambiarCantidad(
                            idProducto,
                            -1
                        );

                        break;


                    case "remove":

                        this.eliminarProducto(
                            idProducto
                        );

                        break;


                    case "checkout":

                        this.confirmarCompra();

                        break;


                    case "products":

                        document
                            .querySelector(
                                '[data-view="productos"]'
                            )
                            ?.click();

                        break;

                }

            }
        );


        window.addEventListener(
            "cart-updated",
            () => {

                this.cargarCarrito();

                this.render();

                this.actualizarContadores();

            }
        );

    }


    // =========================================
    // CAMBIAR CANTIDAD
    // =========================================

    cambiarCantidad(
        idProducto,
        cambio
    ) {

        const item =
            this.carrito.listaProductos.find(
                productoCarrito =>
                    Number(
                        productoCarrito.producto
                            ?.idProducto
                    ) ===
                    Number(
                        idProducto
                    )
            );


        if (!item) {
            return;
        }


        const actual =
            Number(
                item.cantidad
                || 1
            );


        const nuevaCantidad =
            actual
            + cambio;


        if (
            nuevaCantidad < 1
        ) {

            return;

        }


        const stock =
            Number(
                item.producto?.stock
                || 0
            );


        if (
            cambio > 0
            &&
            stock > 0
            &&
            nuevaCantidad > stock
        ) {

            Swal.fire({

                icon:
                    "warning",

                title:
                    "Stock máximo alcanzado",

                text:
                    `Solo hay ${stock} unidad(es) disponibles.`,

                confirmButtonColor:
                    "#0875ec"

            });


            return;

        }


        this.carrito
            .actualizarCantidad(
                idProducto,
                nuevaCantidad
            );


        this.persistir();

    }


    // =========================================
    // ELIMINAR
    // =========================================

    async eliminarProducto(
        idProducto
    ) {

        const item =
            this.carrito.listaProductos.find(
                productoCarrito =>
                    Number(
                        productoCarrito.producto
                            ?.idProducto
                    ) ===
                    Number(
                        idProducto
                    )
            );


        if (!item) {
            return;
        }


        const result =
            await Swal.fire({

                icon:
                    "question",

                title:
                    "¿Eliminar producto?",

                text:
                    item.producto.nombre,

                showCancelButton:
                    true,

                confirmButtonText:
                    "Sí, eliminar",

                cancelButtonText:
                    "Cancelar",

                confirmButtonColor:
                    "#e74c3c",

                cancelButtonColor:
                    "#7b879a"

            });


        if (!result.isConfirmed) {
            return;
        }


        this.carrito
            .eliminarProducto(
                idProducto
            );


        this.persistir();


        Swal.fire({

            icon:
                "success",

            title:
                "Producto eliminado",

            timer:
                900,

            showConfirmButton:
                false

        });

    }


    // =========================================
    // PERSISTIR
    // =========================================

    persistir() {

        StorageService.saveCart(
            this.carrito.listaProductos
        );


        this.render();

        this.actualizarContadores();


        window.dispatchEvent(
            new CustomEvent(
                "cart-updated-external"
            )
        );

    }


    // =========================================
    // CONFIRMAR COMPRA
    // =========================================

    async confirmarCompra() {

        if (
            this.carrito
                .listaProductos
                .length === 0
        ) {

            Swal.fire({

                icon:
                    "info",

                title:
                    "Tu carrito está vacío",

                text:
                    "Agrega productos antes de confirmar una compra.",

                confirmButtonColor:
                    "#0875ec"

            });


            return;

        }


        const total =
            this.carrito.calcularTotal();


        const result =
            await Swal.fire({

                icon:
                    "question",

                title:
                    "Confirmar compra",

                html: `
                    <p>
                        Vas a confirmar
                        <strong>
                            ${this.carrito.contarProductos()}
                        </strong>
                        producto(s).
                    </p>

                    <p style="
                        margin-top:12px;
                        font-size:20px;
                        font-weight:bold;
                        color:#0875ec;
                    ">
                        ${this.formatearPrecio(total)}
                    </p>
                `,

                showCancelButton:
                    true,

                confirmButtonText:
                    "Sí, confirmar compra",

                cancelButtonText:
                    "Cancelar",

                confirmButtonColor:
                    "#0875ec"

            });


        if (!result.isConfirmed) {
            return;
        }


        const orden =
            new Orden(

                this.session,

                this.carrito
                    .listaProductos
                    .map(
                        item => ({
                            producto:
                                {
                                    ...item.producto
                                },

                            cantidad:
                                item.cantidad
                        })
                    ),

                total

            );


        const ordenGenerada =
            orden.generarOrden();


        StorageService.addOrder(
            ordenGenerada
        );


        StorageService.clearCart();


        this.carrito =
            new CarritoCompra();


        this.render();

        this.actualizarContadores();


        window.dispatchEvent(
            new CustomEvent(
                "order-created",
                {
                    detail:
                        ordenGenerada
                }
            )
        );


        await Swal.fire({

            icon:
                "success",

            title:
                "¡Compra confirmada!",

            html: `
                <p>
                    Orden:
                    <strong>
                        ${ordenGenerada.numeroOrden}
                    </strong>
                </p>

                <p style="
                    margin-top:8px;
                ">
                    Total:
                    <strong>
                        ${this.formatearPrecio(
                            ordenGenerada.total
                        )}
                    </strong>
                </p>
            `,

            confirmButtonText:
                "Ver mis compras",

            confirmButtonColor:
                "#0875ec"

        });


        document
            .querySelector(
                '[data-view="compras"]'
            )
            ?.click();

    }


    // =========================================
    // RENDER
    // =========================================

    render() {

        if (!this.container) {
            return;
        }


        const productos =
            this.carrito
                .listaProductos;


        if (
            productos.length === 0
        ) {

            this.container.innerHTML = `

                <div class="empty-state">

                    <div class="empty-icon">
                        🛒
                    </div>

                    <h2>
                        Tu carrito está vacío
                    </h2>

                    <p>
                        Agrega productos para comenzar tu compra.
                    </p>

                    <button
                        type="button"
                        class="primary-button"
                        data-cart-action="products"
                    >
                        Explorar productos
                    </button>

                </div>

            `;


            return;

        }


        const productosHtml =
            productos
                .map(
                    item =>
                        this.crearItem(
                            item
                        )
                )
                .join("");


        this.container.innerHTML = `

            <div class="cart-panel">

                <div class="cart-products">

                    ${productosHtml}

                </div>


                <div class="cart-summary">

                    <div class="cart-total">

                        <span>
                            Total
                        </span>

                        <strong>
                            ${this.formatearPrecio(
                                this.carrito
                                    .calcularTotal()
                            )}
                        </strong>

                    </div>


                    <button
                        type="button"
                        class="primary-button"
                        data-cart-action="checkout"
                    >
                        Confirmar compra
                    </button>

                </div>

            </div>

        `;

    }


    // =========================================
    // ITEM CARRITO
    // =========================================

    crearItem(
        item
    ) {

        const producto =
            item.producto;


        const subtotal =
            Number(
                producto.precio
            )
            *
            Number(
                item.cantidad
            );


        return `

            <article
                class="cart-product"
            >

                <div class="cart-product-image">

                    <img
                        src="${producto.imagen}"
                        alt="${producto.nombre}"
                        onerror="
                            this.style.display='none';
                            this.nextElementSibling.style.display='flex';
                        "
                    >

                    <div
                        class="cart-image-fallback"
                    >
                        📦
                    </div>

                </div>


                <div class="cart-product-info">

                    <h3>
                        ${producto.nombre}
                    </h3>

                    <span>
                        ${this.formatearPrecio(
                            producto.precio
                        )}
                    </span>

                </div>


                <div class="quantity-control">

                    <button
                        type="button"
                        data-cart-action="decrease"
                        data-product-id="${producto.idProducto}"
                        aria-label="Disminuir cantidad"
                    >
                        −
                    </button>


                    <strong>
                        ${item.cantidad}
                    </strong>


                    <button
                        type="button"
                        data-cart-action="increase"
                        data-product-id="${producto.idProducto}"
                        aria-label="Aumentar cantidad"
                    >
                        +
                    </button>

                </div>


                <strong class="cart-subtotal">

                    ${this.formatearPrecio(
                        subtotal
                    )}

                </strong>


                <button
                    type="button"
                    class="remove-cart-product"
                    data-cart-action="remove"
                    data-product-id="${producto.idProducto}"
                    aria-label="Eliminar producto"
                >
                    ✕
                </button>

            </article>

        `;

    }


    // =========================================
    // CONTADORES
    // =========================================

    actualizarContadores() {

        const totalProductos =
            this.carrito
                .contarProductos();


        const elementos = [

            document.getElementById(
                "sidebarCartCount"
            ),

            document.getElementById(
                "topbarCartCount"
            ),

            document.getElementById(
                "dashboardCartCount"
            )

        ];


        elementos.forEach(
            elemento => {

                if (elemento) {

                    elemento.textContent =
                        totalProductos;

                }

            }
        );

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
                Number(precio) || 0
            );

    }

}


export default CartView;
