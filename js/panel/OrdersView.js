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

            console.error(
                "No existe #ordersContent"
            );

            return;

        }


        this.bindEvents();

        this.render();

        this.actualizarContador();


        // Cuando CartView genere una nueva orden
        window.addEventListener(
            "order-created",
            () => {

                this.render();

                this.actualizarContador();

            }
        );

    }


    // =========================================
    // EVENTOS
    // =========================================

    bindEvents() {

        this.container.addEventListener(
            "click",
            event => {


                // =================================
                // DESCARGAR PDF
                // =================================

                const pdfButton =
                    event.target.closest(
                        "[data-download-order]"
                    );


                if (pdfButton) {

                    const numeroOrden =
                        pdfButton.dataset
                            .downloadOrder;


                    this.descargarPDF(
                        numeroOrden
                    );


                    return;

                }


                // =================================
                // VOLVER A PRODUCTOS
                // =================================

                const productsButton =
                    event.target.closest(
                        "[data-orders-products]"
                    );


                if (productsButton) {

                    document
                        .querySelector(
                            '[data-view="productos"]'
                        )
                        ?.click();

                }

            }
        );

    }


    // =========================================
    // RENDER
    // =========================================

    render() {

        const orders =
            StorageService.getOrders();


        console.log(
            "Órdenes guardadas:",
            orders
        );


        if (
            !orders
            ||
            orders.length === 0
        ) {

            this.renderEmpty();

            return;

        }


        this.container.innerHTML = `

            <div class="orders-container">

                ${orders
            .map(
                (
                    order,
                    index
                ) =>
                    this.crearRecibo(
                        order,
                        index === 0
                    )
            )
            .join("")
        }

            </div>

        `;

    }


    // =========================================
    // ESTADO VACÍO
    // =========================================

    renderEmpty() {

        this.container.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    📦
                </div>

                <h2>
                    Aún no tienes compras
                </h2>

                <p>
                    Cuando confirmes una compra,
                    tu recibo aparecerá aquí.
                </p>

                <button
                    type="button"
                    class="primary-button"
                    data-orders-products
                >
                    Explorar productos
                </button>

            </div>

        `;

    }


    // =========================================
    // CREAR RECIBO
    // =========================================

    crearRecibo(
        order,
        esNueva
    ) {

        const numeroOrden =
            order.numeroOrden
            ||
            order.idOrden
            ||
            "Sin número";


        const fecha =
            this.formatearFecha(
                order.fecha
            );


        const productos =
            this.obtenerProductos(
                order
            );


        const cliente =
            order.cliente
            ||
            {};


        const nombreCliente =
            cliente.nombre
            ||
            cliente.usuario
            ||
            "Cliente TechCart";


        const correo =
            cliente.correo
            ||
            cliente.email
            ||
            "";


        const total =
            Number(
                order.total
            ) || 0;


        return `

            <article class="order-receipt">


                <!-- ========================= -->
                <!-- ENCABEZADO -->
                <!-- ========================= -->

                <div class="receipt-header">


                    <div class="receipt-brand">

                        <div class="receipt-logo">
                            🛒
                        </div>

                        <div>

                            <h3>
                                Tech<span>Cart</span>
                            </h3>

                            <p>
                                Recibo de compra
                            </p>

                        </div>

                    </div>


                    <div class="receipt-status-area">

                        ${
            esNueva
                ? `
                                    <span class="new-order-badge">
                                        Nueva compra
                                    </span>
                                `
                : ""
        }

                        <span class="order-status">
                            ✓ ${order.estado || "Confirmada"}
                        </span>

                    </div>


                </div>


                <!-- ========================= -->
                <!-- INFORMACIÓN ORDEN -->
                <!-- ========================= -->

                <div class="receipt-info-grid">


                    <div>

                        <small>
                            Número de orden
                        </small>

                        <strong>
                            ${numeroOrden}
                        </strong>

                    </div>


                    <div>

                        <small>
                            Fecha
                        </small>

                        <strong>
                            ${fecha}
                        </strong>

                    </div>


                    <div>

                        <small>
                            Cliente
                        </small>

                        <strong>
                            ${nombreCliente}
                        </strong>

                    </div>


                    <div>

                        <small>
                            Correo
                        </small>

                        <strong>
                            ${correo || "No registrado"}
                        </strong>

                    </div>


                </div>


                <!-- ========================= -->
                <!-- PRODUCTOS -->
                <!-- ========================= -->

                <div class="receipt-products">


                    <div class="receipt-table-header">

                        <span>
                            Producto
                        </span>

                        <span>
                            Cant.
                        </span>

                        <span>
                            Precio
                        </span>

                        <span>
                            Subtotal
                        </span>

                    </div>


                    ${productos
            .map(
                item => {

                    const producto =
                        item.producto
                        ||
                        item;


                    const cantidad =
                        Number(
                            item.cantidad
                            || 1
                        );


                    const precio =
                        Number(
                            producto.precio
                            || 0
                        );


                    const subtotal =
                        precio
                        *
                        cantidad;


                    return `

                                    <div class="receipt-product-row">

                                        <div class="receipt-product-name">

                                            <span class="receipt-product-icon">
                                                📦
                                            </span>

                                            <div>

                                                <strong>
                                                    ${producto.nombre || "Producto"}
                                                </strong>

                                                <small>
                                                    ${producto.categoria || "Tecnología"}
                                                </small>

                                            </div>

                                        </div>


                                        <span>
                                            ${cantidad}
                                        </span>


                                        <span>
                                            ${this.formatearPrecio(
                        precio
                    )}
                                        </span>


                                        <strong>
                                            ${this.formatearPrecio(
                        subtotal
                    )}
                                        </strong>

                                    </div>

                                `;

                }
            )
            .join("")
        }


                </div>


                <!-- ========================= -->
                <!-- TOTAL -->
                <!-- ========================= -->

                <div class="receipt-total-area">


                    <div>

                        <small>
                            Total pagado
                        </small>

                        <strong>
                            ${this.formatearPrecio(
            total
        )}
                        </strong>

                    </div>


                </div>


                <!-- ========================= -->
                <!-- PIE -->
                <!-- ========================= -->

                <div class="receipt-footer">


                    <div>

                        <strong>
                            ¡Gracias por comprar en TechCart!
                        </strong>

                        <p>
                            Conserva este recibo como comprobante de tu compra.
                        </p>

                    </div>


                    <button
                        type="button"
                        class="download-receipt-button"
                        data-download-order="${numeroOrden}"
                    >

                        📄 Descargar PDF

                    </button>


                </div>


            </article>

        `;

    }


    // =========================================
    // OBTENER PRODUCTOS
    // =========================================

    obtenerProductos(
        order
    ) {

        if (
            Array.isArray(
                order.listaProductos
            )
        ) {

            return order.listaProductos;

        }


        if (
            Array.isArray(
                order.productos
            )
        ) {

            return order.productos;

        }


        return [];

    }


    // =========================================
    // DESCARGAR PDF
    // =========================================

    descargarPDF(
        numeroOrden
    ) {

        const orders =
            StorageService.getOrders();


        const order =
            orders.find(
                item =>

                    String(
                        item.numeroOrden
                        ||
                        item.idOrden
                    )
                    ===
                    String(
                        numeroOrden
                    )
            );


        if (!order) {

            Swal.fire({

                icon:
                    "error",

                title:
                    "Orden no encontrada",

                text:
                    "No fue posible generar el recibo.",

                confirmButtonColor:
                    "#0875ec"

            });


            return;

        }


        if (
            !window.jspdf
            ||
            !window.jspdf.jsPDF
        ) {

            Swal.fire({

                icon:
                    "error",

                title:
                    "PDF no disponible",

                text:
                    "La librería jsPDF no está cargada.",

                confirmButtonColor:
                    "#0875ec"

            });


            return;

        }


        const {
            jsPDF
        } =
            window.jspdf;


        const pdf =
            new jsPDF();


        const azulTechCart =
            [
                8,
                117,
                236
            ];


        const oscuro =
            [
                16,
                27,
                61
            ];


        const gris =
            [
                100,
                110,
                130
            ];


        const productos =
            this.obtenerProductos(
                order
            );


        const cliente =
            order.cliente
            ||
            {};


        const nombreCliente =
            cliente.nombre
            ||
            cliente.usuario
            ||
            "Cliente TechCart";


        const correo =
            cliente.correo
            ||
            cliente.email
            ||
            "No registrado";


        let y =
            20;


        // =================================
        // MARCA
        // =================================

        pdf.setTextColor(
            ...oscuro
        );

        pdf.setFontSize(
            22
        );

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.text(
            "Tech",
            20,
            y
        );


        pdf.setTextColor(
            ...azulTechCart
        );

        pdf.text(
            "Cart",
            38,
            y
        );


        pdf.setTextColor(
            ...gris
        );

        pdf.setFontSize(
            10
        );

        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.text(
            "Recibo de compra",
            20,
            y + 8
        );


        // =================================
        // LÍNEA
        // =================================

        y +=
            18;


        pdf.setDrawColor(
            225,
            230,
            238
        );

        pdf.line(
            20,
            y,
            190,
            y
        );


        // =================================
        // DATOS ORDEN
        // =================================

        y +=
            12;


        pdf.setTextColor(
            ...oscuro
        );

        pdf.setFontSize(
            10
        );


        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.text(
            "Orden:",
            20,
            y
        );


        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.text(
            String(
                order.numeroOrden
                ||
                order.idOrden
            ),
            38,
            y
        );


        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.text(
            "Estado:",
            120,
            y
        );


        pdf.setTextColor(
            19,
            174,
            159
        );

        pdf.text(
            String(
                order.estado
                ||
                "Confirmada"
            ),
            138,
            y
        );


        y +=
            8;


        pdf.setTextColor(
            ...oscuro
        );

        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.text(
            "Fecha:",
            20,
            y
        );


        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.text(
            this.formatearFecha(
                order.fecha
            ),
            38,
            y
        );


        y +=
            8;


        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.text(
            "Cliente:",
            20,
            y
        );


        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.text(
            nombreCliente,
            38,
            y
        );


        y +=
            8;


        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.text(
            "Correo:",
            20,
            y
        );


        pdf.setFont(
            "helvetica",
            "normal"
        );

        pdf.text(
            correo,
            38,
            y
        );


        // =================================
        // PRODUCTOS
        // =================================

        y +=
            16;


        pdf.setFillColor(
            242,
            247,
            253
        );


        pdf.rect(
            20,
            y - 6,
            170,
            10,
            "F"
        );


        pdf.setFont(
            "helvetica",
            "bold"
        );

        pdf.setTextColor(
            ...oscuro
        );


        pdf.text(
            "Producto",
            23,
            y
        );

        pdf.text(
            "Cant.",
            112,
            y
        );

        pdf.text(
            "Precio",
            135,
            y
        );

        pdf.text(
            "Subtotal",
            165,
            y
        );


        y +=
            10;


        pdf.setFont(
            "helvetica",
            "normal"
        );


        productos.forEach(
            item => {

                const producto =
                    item.producto
                    ||
                    item;


                const cantidad =
                    Number(
                        item.cantidad
                        ||
                        1
                    );


                const precio =
                    Number(
                        producto.precio
                        ||
                        0
                    );


                const subtotal =
                    precio
                    *
                    cantidad;


                // Nueva página si hace falta

                if (
                    y > 265
                ) {

                    pdf.addPage();

                    y =
                        20;

                }


                pdf.setTextColor(
                    ...oscuro
                );


                const nombre =
                    pdf.splitTextToSize(
                        producto.nombre
                        ||
                        "Producto",
                        80
                    );


                pdf.text(
                    nombre,
                    23,
                    y
                );


                pdf.text(
                    String(
                        cantidad
                    ),
                    115,
                    y
                );


                pdf.text(
                    this.formatearPrecioPDF(
                        precio
                    ),
                    135,
                    y
                );


                pdf.text(
                    this.formatearPrecioPDF(
                        subtotal
                    ),
                    165,
                    y
                );


                y +=
                    Math.max(
                        9,
                        nombre.length
                        *
                        5
                    );

            }
        );


        // =================================
        // TOTAL
        // =================================

        y +=
            5;


        pdf.setDrawColor(
            225,
            230,
            238
        );


        pdf.line(
            20,
            y,
            190,
            y
        );


        y +=
            12;


        pdf.setFont(
            "helvetica",
            "bold"
        );


        pdf.setFontSize(
            12
        );


        pdf.setTextColor(
            ...oscuro
        );


        pdf.text(
            "TOTAL:",
            130,
            y
        );


        pdf.setTextColor(
            ...azulTechCart
        );


        pdf.text(
            this.formatearPrecioPDF(
                order.total
            ),
            155,
            y
        );


        // =================================
        // PIE
        // =================================

        y +=
            25;


        pdf.setFontSize(
            9
        );


        pdf.setTextColor(
            ...gris
        );


        pdf.setFont(
            "helvetica",
            "normal"
        );


        pdf.text(
            "Gracias por comprar en TechCart.",
            20,
            y
        );


        pdf.text(
            "Este documento corresponde a una compra simulada con fines académicos.",
            20,
            y + 6
        );


        // =================================
        // GUARDAR
        // =================================

        pdf.save(
            `TechCart-${order.numeroOrden || order.idOrden}.pdf`
        );

    }


    // =========================================
    // CONTADOR DE COMPRAS
    // =========================================

    actualizarContador() {

        const orders =
            StorageService.getOrders();


        const dashboard =
            document.getElementById(
                "dashboardOrdersCount"
            );


        if (dashboard) {

            dashboard.textContent =
                orders.length;

        }

    }


    // =========================================
    // FECHA
    // =========================================

    formatearFecha(
        fecha
    ) {

        if (!fecha) {

            return "Fecha no disponible";

        }


        const date =
            new Date(
                fecha
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            return fecha;

        }


        return date.toLocaleString(
            "es-CO",
            {

                year:
                    "numeric",

                month:
                    "long",

                day:
                    "2-digit",

                hour:
                    "2-digit",

                minute:
                    "2-digit"

            }
        );

    }


    // =========================================
    // PRECIO HTML
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
                Number(precio)
                ||
                0
            );

    }


    // =========================================
    // PRECIO PDF
    // =========================================

    formatearPrecioPDF(
        precio
    ) {

        return "$ "
            +
            new Intl
                .NumberFormat(
                    "es-CO",
                    {
                        maximumFractionDigits:
                            0
                    }
                )
                .format(
                    Number(precio)
                    ||
                    0
                );

    }

}


export default OrdersView;