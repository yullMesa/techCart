import StorageService
    from "../services/StorageService.js";


class OrdersView {

    constructor() {

        this.container =
            null;

    }


    // =========================================
    // INICIAR
    // =========================================

    init() {

        this.container =
            document.getElementById(
                "ordersContent"
            );


        if (!this.container) {

            console.warn(
                "No se encontró #ordersContent"
            );

            return;

        }


        this.render();


        window.addEventListener(
            "order-created",
            () => {

                this.render();

                this.actualizarContador();

            }
        );


        this.actualizarContador();

    }


    // =========================================
    // RENDER
    // =========================================

    render() {

        if (!this.container) {
            return;
        }


        const orders =
            StorageService.getOrders();


        if (
            orders.length === 0
        ) {

            this.container.innerHTML = `

                <div class="empty-state">

                    <div class="empty-icon">
                        📦
                    </div>

                    <h2>
                        Aún no tienes compras
                    </h2>

                    <p>
                        Aquí aparecerán tus órdenes realizadas.
                    </p>

                    <button
                        type="button"
                        class="primary-button"
                        data-view-target="productos"
                    >
                        Ir al catálogo
                    </button>

                </div>

            `;


            return;

        }


        this.container.innerHTML = `

            <div class="orders-list">

                ${orders
                    .map(
                        order =>
                            this.crearOrden(
                                order
                            )
                    )
                    .join("")
                }

            </div>

        `;


        this.container
            .querySelectorAll(
                "[data-view-target]"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            document
                                .querySelector(
                                    `[data-view="${button.dataset.viewTarget}"]`
                                )
                                ?.click();

                        }
                    );

                }
            );

    }


    // =========================================
    // CARD ORDEN
    // =========================================

    crearOrden(
        order
    ) {

        const fecha =
            new Date(
                order.fecha
            )
                .toLocaleString(
                    "es-CO"
                );


        const productos =
            Array.isArray(
                order.listaProductos
            )
                ? order.listaProductos
                : [];


        return `

            <article class="order-card">

                <div class="order-card-header">

                    <div>

                        <span>
                            Orden
                        </span>

                        <strong>
                            ${order.numeroOrden}
                        </strong>

                    </div>


                    <span class="order-status">
                        ${order.estado}
                    </span>

                </div>


                <div class="order-date">
                    ${fecha}
                </div>


                <div class="order-products">

                    ${productos
                        .map(
                            item => `

                                <div class="order-product-row">

                                    <span>
                                        ${item.producto?.nombre || "Producto"}
                                        ×
                                        ${item.cantidad}
                                    </span>

                                    <strong>
                                        ${this.formatearPrecio(
                                            Number(
                                                item.producto?.precio
                                                || 0
                                            )
                                            *
                                            Number(
                                                item.cantidad
                                                || 0
                                            )
                                        )}
                                    </strong>

                                </div>

                            `
                        )
                        .join("")
                    }

                </div>


                <div class="order-total">

                    <span>
                        Total
                    </span>

                    <strong>
                        ${this.formatearPrecio(
                            order.total
                        )}
                    </strong>

                </div>

            </article>

        `;

    }


    // =========================================
    // CONTADOR
    // =========================================

    actualizarContador() {

        const count =
            StorageService
                .getOrders()
                .length;


        const dashboard =
            document.getElementById(
                "dashboardOrdersCount"
            );


        if (dashboard) {

            dashboard.textContent =
                count;

        }

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


export default OrdersView;
