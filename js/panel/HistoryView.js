import StorageService
    from "../services/StorageService.js";


class HistoryView {

    constructor() {

        this.container = null;

        this.fromInput = null;

        this.toInput = null;

    }


    // =========================================
    // INIT
    // =========================================

    init() {

        this.container =
            document.getElementById(
                "historyContent"
            );


        this.fromInput =
            document.getElementById(
                "historyDateFrom"
            );


        this.toInput =
            document.getElementById(
                "historyDateTo"
            );


        if (!this.container) {

            console.error(
                "No existe #historyContent"
            );

            return;

        }


        this.bindEvents();

        this.render();

    }


    // =========================================
    // EVENTOS
    // =========================================

    bindEvents() {

        const filterButton =
            document.getElementById(
                "historyFilterButton"
            );


        const clearButton =
            document.getElementById(
                "historyClearButton"
            );


        // FILTRAR

        filterButton?.addEventListener(
            "click",
            () => {

                this.renderFiltered();

            }
        );


        // LIMPIAR FILTRO

        clearButton?.addEventListener(
            "click",
            () => {

                if (this.fromInput) {

                    this.fromInput.value = "";

                }


                if (this.toInput) {

                    this.toInput.value = "";

                }


                this.render();

            }
        );


        // DESCARGAR PDF

        this.container.addEventListener(
            "click",
            event => {

                const pdfButton =
                    event.target.closest(
                        "[data-history-pdf]"
                    );


                if (!pdfButton) {

                    return;

                }


                const orderNumber =
                    pdfButton.dataset
                        .historyPdf;


                this.downloadPDF(
                    orderNumber
                );

            }
        );


        // NUEVA ORDEN

        window.addEventListener(
            "order-created",
            () => {

                this.render();

            }
        );

    }


    // =========================================
    // FILTRAR
    // =========================================

    renderFiltered() {

        const orders =
            StorageService.getOrders();


        const from =
            this.fromInput?.value
            ||
            "";


        const to =
            this.toInput?.value
            ||
            "";


        console.log(
            "Filtro desde:",
            from
        );


        console.log(
            "Filtro hasta:",
            to
        );


        // =====================================
        // SIN FECHAS
        // =====================================

        if (!from && !to) {

            this.render();

            return;

        }


        // =====================================
        // VALIDAR RANGO
        // =====================================

        if (
            from
            &&
            to
            &&
            from > to
        ) {

            Swal.fire({

                icon:
                    "warning",

                title:
                    "Rango inválido",

                text:
                    "La fecha inicial no puede ser posterior a la fecha final.",

                confirmButtonColor:
                    "#0875ec"

            });


            return;

        }


        // =====================================
        // FILTRAR POR YYYY-MM-DD
        // =====================================

        const filtered =
            orders.filter(
                order => {

                    const orderDate =
                        this.getDateKey(
                            order.fecha
                        );


                    console.log(
                        "Orden:",
                        order.numeroOrden
                        ||
                        order.idOrden,
                        "Fecha original:",
                        order.fecha,
                        "Fecha normalizada:",
                        orderDate
                    );


                    if (!orderDate) {

                        return false;

                    }


                    // Solo fecha DESDE

                    if (
                        from
                        &&
                        !to
                    ) {

                        return orderDate >= from;

                    }


                    // Solo fecha HASTA

                    if (
                        !from
                        &&
                        to
                    ) {

                        return orderDate <= to;

                    }


                    // Ambas fechas

                    return (
                        orderDate >= from
                        &&
                        orderDate <= to
                    );

                }
            );


        console.log(
            "Resultados del historial:",
            filtered.length
        );


        this.renderOrders(
            filtered
        );

    }


    // =========================================
    // NORMALIZAR FECHA
    // =========================================

    getDateKey(
        value
    ) {

        if (!value) {

            return null;

        }


        // =====================================
        // CASO 1
        // ISO:
        // 2026-10-04T12:30:00.000Z
        // =====================================

        if (
            typeof value === "string"
            &&
            /^\d{4}-\d{2}-\d{2}/
                .test(value)
        ) {

            return value.substring(
                0,
                10
            );

        }


        // =====================================
        // CASO 2
        // FECHA COLOMBIANA:
        // 04/10/2026
        // 04/10/2026, 7:33 a. m.
        // =====================================

        if (
            typeof value === "string"
        ) {

            const match =
                value.match(
                    /^(\d{1,2})\/(\d{1,2})\/(\d{4})/
                );


            if (match) {

                const day =
                    String(
                        match[1]
                    )
                        .padStart(
                            2,
                            "0"
                        );


                const month =
                    String(
                        match[2]
                    )
                        .padStart(
                            2,
                            "0"
                        );


                const year =
                    match[3];


                return `${year}-${month}-${day}`;

            }

        }


        // =====================================
        // CASO 3
        // DATE VÁLIDO
        // =====================================

        const date =
            new Date(
                value
            );


        if (
            Number.isNaN(
                date.getTime()
            )
        ) {

            console.warn(
                "Fecha no reconocida:",
                value
            );


            return null;

        }


        const year =
            date.getFullYear();


        const month =
            String(
                date.getMonth() + 1
            )
                .padStart(
                    2,
                    "0"
                );


        const day =
            String(
                date.getDate()
            )
                .padStart(
                    2,
                    "0"
                );


        return `${year}-${month}-${day}`;

    }


    // =========================================
    // RENDER GENERAL
    // =========================================

    render() {

        const orders =
            StorageService.getOrders();


        console.log(
            "Historial completo:",
            orders
        );


        this.renderOrders(
            orders
        );

    }


    // =========================================
    // RENDER ÓRDENES
    // =========================================

    renderOrders(
        orders
    ) {

        if (
            !Array.isArray(orders)
            ||
            orders.length === 0
        ) {

            this.container.innerHTML = `

                <div class="empty-state">

                    <div class="empty-icon">

                        🧾

                    </div>


                    <h2>

                        No hay compras en este período

                    </h2>


                    <p>

                        Cambia el rango de fechas
                        o presiona Limpiar para ver
                        todo tu historial.

                    </p>

                </div>

            `;


            return;

        }


        const sortedOrders =
            [...orders]
                .sort(
                    (
                        a,
                        b
                    ) => {

                        const dateA =
                            this.parseDate(
                                a.fecha
                            );


                        const dateB =
                            this.parseDate(
                                b.fecha
                            );


                        return dateB - dateA;

                    }
                );


        this.container.innerHTML = `

            <div class="history-list">

                ${sortedOrders
            .map(
                order =>
                    this.createHistoryCard(
                        order
                    )
            )
            .join("")
        }

            </div>

        `;

    }


    // =========================================
    // TARJETA
    // =========================================

    createHistoryCard(
        order
    ) {

        const products =
            this.getProducts(
                order
            );


        const orderNumber =
            order.numeroOrden
            ||
            order.idOrden
            ||
            "Sin número";


        const totalProducts =
            products.reduce(
                (
                    total,
                    item
                ) => {

                    return total
                        +
                        Number(
                            item.cantidad
                            ||
                            1
                        );

                },
                0
            );


        return `

            <article class="history-card">


                <!-- HEADER -->

                <div class="history-card-header">


                    <div>


                        <span class="history-order-label">

                            Número de orden

                        </span>


                        <h3>

                            ${orderNumber}

                        </h3>


                        <p>

                            ${this.formatDate(
            order.fecha
        )}

                        </p>


                    </div>


                    <span class="history-status">

                        ✓ ${order.estado || "Confirmada"}

                    </span>


                </div>


                <!-- RESUMEN -->

                <div class="history-card-body">


                    <div class="history-stat">


                        <small>

                            Productos comprados

                        </small>


                        <strong>

                            ${totalProducts}

                        </strong>


                    </div>


                    <div class="history-stat">


                        <small>

                            Total pagado

                        </small>


                        <strong>

                            ${this.formatPrice(
            order.total
        )}

                        </strong>


                    </div>


                </div>


                <!-- PRODUCTOS -->

                <div class="history-products">


                    ${products
            .map(
                item => {

                    const product =
                        item.producto
                        ||
                        item;


                    const quantity =
                        Number(
                            item.cantidad
                            ||
                            1
                        );


                    return `

                                    <div class="history-product-row">

                                        <span>

                                            ${product.nombre || "Producto"}

                                        </span>


                                        <strong>

                                            × ${quantity}

                                        </strong>

                                    </div>

                                `;

                }
            )
            .join("")
        }


                </div>


                <!-- FOOTER -->

                <div class="history-card-footer">


                    <button
                            type="button"
                            class="download-receipt-button"
                            data-history-pdf="${orderNumber}"
                    >

                        📄 Descargar PDF

                    </button>


                </div>


            </article>

        `;

    }


    // =========================================
    // PRODUCTOS DE ORDEN
    // =========================================

    getProducts(
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
    // PARSEAR FECHA PARA ORDENAR
    // =========================================

    parseDate(
        value
    ) {

        const key =
            this.getDateKey(
                value
            );


        if (!key) {

            return 0;

        }


        return new Date(
            `${key}T00:00:00`
        ).getTime();

    }


    // =========================================
    // FORMATEAR FECHA
    // =========================================

    formatDate(
        value
    ) {

        const key =
            this.getDateKey(
                value
            );


        if (!key) {

            return String(
                value
                ||
                "Fecha no disponible"
            );

        }


        const [
            year,
            month,
            day
        ] =
            key
                .split("-")
                .map(Number);


        const date =
            new Date(
                year,
                month - 1,
                day
            );


        return date
            .toLocaleDateString(
                "es-CO",
                {

                    year:
                        "numeric",

                    month:
                        "long",

                    day:
                        "2-digit"

                }
            );

    }


    // =========================================
    // PDF
    // =========================================

    downloadPDF(
        orderNumber
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
                        orderNumber
                    )
            );


        if (!order) {

            Swal.fire({

                icon:
                    "error",

                title:
                    "Orden no encontrada",

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


        const products =
            this.getProducts(
                order
            );


        let y =
            20;


        pdf.setFont(
            "helvetica",
            "bold"
        );


        pdf.setFontSize(
            22
        );


        pdf.text(
            "TechCart",
            20,
            y
        );


        y += 10;


        pdf.setFontSize(
            11
        );


        pdf.text(
            "Historial de compra",
            20,
            y
        );


        y += 15;


        pdf.setFont(
            "helvetica",
            "normal"
        );


        pdf.text(
            `Orden: ${
                order.numeroOrden
                ||
                order.idOrden
            }`,
            20,
            y
        );


        y += 8;


        pdf.text(
            `Fecha: ${
                this.formatDate(
                    order.fecha
                )
            }`,
            20,
            y
        );


        y += 8;


        pdf.text(
            `Estado: ${
                order.estado
                ||
                "Confirmada"
            }`,
            20,
            y
        );


        y += 15;


        pdf.setFont(
            "helvetica",
            "bold"
        );


        pdf.text(
            "Productos",
            20,
            y
        );


        y += 10;


        pdf.setFont(
            "helvetica",
            "normal"
        );


        products.forEach(
            item => {

                const product =
                    item.producto
                    ||
                    item;


                const quantity =
                    Number(
                        item.cantidad
                        ||
                        1
                    );


                const price =
                    Number(
                        product.precio
                        ||
                        0
                    );


                const subtotal =
                    price
                    *
                    quantity;


                if (
                    y > 265
                ) {

                    pdf.addPage();

                    y = 20;

                }


                pdf.text(
                    `${
                        product.nombre
                        ||
                        "Producto"
                    } x ${quantity}`,
                    20,
                    y
                );


                pdf.text(
                    this.formatPricePDF(
                        subtotal
                    ),
                    145,
                    y
                );


                y += 8;

            }
        );


        y += 8;


        pdf.setFont(
            "helvetica",
            "bold"
        );


        pdf.text(
            `Total: ${
                this.formatPricePDF(
                    order.total
                )
            }`,
            20,
            y
        );


        y += 15;


        pdf.setFontSize(
            9
        );


        pdf.setFont(
            "helvetica",
            "normal"
        );


        pdf.text(
            "Compra simulada con fines académicos.",
            20,
            y
        );


        pdf.save(
            `Historial-${orderNumber}.pdf`
        );

    }


    // =========================================
    // PRECIOS
    // =========================================

    formatPrice(
        value
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
                Number(value)
                ||
                0
            );

    }


    formatPricePDF(
        value
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
                    Number(value)
                    ||
                    0
                );

    }

}


export default HistoryView;