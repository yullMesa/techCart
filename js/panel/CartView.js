import CarritoCompra
    from "../models/CarritoCompra.js";

import StorageService
    from "../services/StorageService.js";


class CartView {

    constructor() {

        this.container =
            document.getElementById(
                "view-carrito"
            );

    }


    init() {

        this.render();

        this.updateCounters();


        window.addEventListener(
            "techcart:cart-updated",
            () => {

                this.render();

                this.updateCounters();

            }
        );

    }


    getCart() {

        return new CarritoCompra(
            StorageService.getCart()
        );

    }


    render() {

        if (!this.container) {
            return;
        }


        const carrito =
            this.getCart();


        if (
            carrito.listaProductos.length === 0
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
                        class="primary-button"
                        data-view-target="productos"
                    >
                        Explorar productos
                    </button>

                </div>

            `;


            return;

        }


        this.container.innerHTML = `

            <div class="cart-panel">

                <div class="section-title">

                    <div>

                        <h2>
                            Mi carrito
                        </h2>

                        <p>
                            Administra los productos seleccionados.
                        </p>

                    </div>

                </div>


                <div class="cart-products">

                    ${carrito.listaProductos
            .map(item =>
                this.createItem(item)
            )
            .join("")}

                </div>


                <div class="cart-summary">

                    <span>
                        Total
                    </span>

                    <strong>
                        ${this.formatPrice(
            carrito.calcularTotal()
        )}
                    </strong>

                    <button
                        class="primary-button"
                        id="confirmCartButton"
                    >
                        Confirmar compra
                    </button>

                </div>

            </div>

        `;


        this.addCartEvents();

    }


    createItem(item) {

        return `

            <article class="cart-product">

                <img
                    src="${item.producto.imagen}"
                    alt="${item.producto.nombre}"
                >

                <div class="cart-product-info">

                    <h3>
                        ${item.producto.nombre}
                    </h3>

                    <span>
                        ${this.formatPrice(
            item.producto.precio
        )}
                    </span>

                </div>


                <div class="quantity-control">

                    <button
                        data-action="decrease"
                        data-id="${item.producto.idProducto}"
                    >
                        −
                    </button>

                    <strong>
                        ${item.cantidad}
                    </strong>

                    <button
                        data-action="increase"
                        data-id="${item.producto.idProducto}"
                    >
                        +
                    </button>

                </div>


                <strong class="cart-subtotal">

                    ${this.formatPrice(
            item.producto.precio *
            item.cantidad
        )}

                </strong>


                <button
                    class="remove-cart-product"
                    data-action="remove"
                    data-id="${item.producto.idProducto}"
                >
                    ✕
                </button>

            </article>

        `;

    }


    addCartEvents() {

        const buttons =
            this.container.querySelectorAll(
                "[data-action]"
            );


        buttons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.id
                        );


                    this.changeCart(
                        id,
                        button.dataset.action
                    );

                }
            );

        });

    }


    changeCart(id, action) {

        const carrito =
            this.getCart();


        const item =
            carrito.listaProductos.find(
                item =>
                    item.producto.idProducto === id
            );


        if (!item) {
            return;
        }


        if (action === "increase") {

            carrito.actualizarCantidad(
                id,
                item.cantidad + 1
            );

        }


        if (action === "decrease") {

            carrito.actualizarCantidad(
                id,
                item.cantidad - 1
            );

        }


        if (action === "remove") {

            carrito.eliminarProducto(id);

        }


        StorageService.saveCart(
            carrito.listaProductos
        );


        this.render();

        this.updateCounters();

    }


    updateCounters() {

        const carrito =
            this.getCart();


        const cantidad =
            carrito.cantidadTotal();


        document
            .querySelectorAll(
                ".sidebar-badge, .notification"
            )
            .forEach(element => {

                element.textContent =
                    cantidad;

            });


        const dashboard =
            document.getElementById(
                "dashboardCartCount"
            );


        if (dashboard) {

            dashboard.textContent =
                cantidad;

        }

    }


    formatPrice(value) {

        return value.toLocaleString(
            "es-CO",
            {
                style: "currency",
                currency: "COP",
                maximumFractionDigits: 0
            }
        );

    }

}


export default CartView;