import ProductService
    from "../services/ProductService.js";

import CarritoCompra
    from "../models/CarritoCompra.js";

import StorageService
    from "../services/StorageService.js";


class ProductsView {

    constructor() {

        this.container =
            document.querySelector(
                ".internal-products-grid"
            );

        this.productos = [];

        this.carrito =
            new CarritoCompra(
                StorageService.getCart()
            );

    }





    // =========================================
    // INICIALIZAR
    // =========================================

    async init() {

        this.productos =
            await ProductService.getProductos();

        this.render();

    }


    // =========================================
    // RENDER
    // =========================================

    render() {

        if (!this.container) {
            return;
        }


        this.container.innerHTML =
            "";


        this.productos.forEach(
            producto => {

                const info =
                    producto.mostrarInfo();


                const card =
                    document.createElement(
                        "article"
                    );


                card.className =
                    "internal-product-card";


                card.innerHTML = `

                    <img
                        src="${info.imagen}"
                        alt="${info.nombre}"
                    >

                    <h3>
                        ${info.nombre}
                    </h3>

                    <p>
                        ${info.especificaciones}
                    </p>

                    <strong>
                        ${this.formatPrice(
                    info.precio
                )}
                    </strong>

                    <button
                        class="add-product-button"
                        data-product-id="${info.idProducto}"
                    >

                        🛒 Agregar al carrito

                    </button>

                `;


                this.container.appendChild(
                    card
                );

            }
        );


        this.addEvents();

    }


    // =========================================
    // EVENTOS
    // =========================================

    addEvents() {

        const buttons =
            document.querySelectorAll(
                ".add-product-button"
            );


        buttons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(
                            button.dataset.productId
                        );


                    this.addToCart(id);

                }
            );

        });

    }


    // =========================================
    // AGREGAR
    // =========================================

    addToCart(idProducto) {

        const producto =
            this.productos.find(
                producto =>
                    producto.idProducto ===
                    idProducto
            );


        if (!producto) {
            return;
        }


        this.carrito.agregarProducto(
            producto
        );


        StorageService.saveCart(
            this.carrito.listaProductos
        );


        window.dispatchEvent(
            new CustomEvent(
                "techcart:cart-updated"
            )
        );


        Swal.fire({

            icon: "success",

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


export default ProductsView;