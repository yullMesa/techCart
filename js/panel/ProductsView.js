import Laptop
    from "../models/Laptop.js";

import Smartphone
    from "../models/Smartphone.js";

import Accesorio
    from "../models/Accesorio.js";

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


        this.productos =
            this.crearProductos();


        this.carrito =
            new CarritoCompra(
                StorageService.getCart()
            );

    }


    // =========================================
    // PRODUCTOS
    // =========================================

    crearProductos() {

        return [

            new Laptop(
                1,
                "Laptop TechBook Pro",
                "Laptop de alto rendimiento.",
                3899900,
                10,
                "../img/laptop.png",
                "Intel Core i7",
                "8GB",
                "256GB SSD"
            ),


            new Laptop(
                2,
                "Laptop TechBook Air",
                "Ligera y perfecta para estudiar.",
                2799900,
                8,
                "../img/laptop.png",
                "Intel Core i5",
                "8GB",
                "512GB SSD"
            ),


            new Smartphone(
                3,
                "Smartphone Nova X",
                "Pantalla OLED y cámara avanzada.",
                2999900,
                15,
                "../img/smartphone.png",
                "Android",
                "6.7 pulgadas OLED",
                "108 MP"
            ),


            new Smartphone(
                4,
                "Smartphone Nova Lite",
                "Diseño compacto y gran autonomía.",
                1799900,
                20,
                "../img/smartphone.png",
                "Android",
                "6.1 pulgadas",
                "50 MP"
            ),


            new Accesorio(
                5,
                "Audífonos SoundMax",
                "Cancelación activa de ruido.",
                749900,
                25,
                "../img/headphones.png",
                "Audífonos inalámbricos"
            ),


            new Accesorio(
                6,
                "SmartWatch Fit Pro",
                "Monitoreo de salud y actividad.",
                649900,
                18,
                "../img/smartwatch.png",
                "Smartwatch"
            ),


            new Accesorio(
                7,
                "Mouse Tech Wireless",
                "Mouse inalámbrico ergonómico.",
                129900,
                30,
                "../img/headphones.png",
                "Mouse"
            ),


            new Accesorio(
                8,
                "Teclado Tech RGB",
                "Teclado mecánico para gaming.",
                249900,
                20,
                "../img/laptop.png",
                "Teclado"
            )

        ];

    }


    // =========================================
    // INICIALIZAR
    // =========================================

    init() {

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