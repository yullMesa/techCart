import StorageService
    from "../services/StorageService.js";


class Chatbot {

    constructor(router) {

        this.router =
            router;


        this.chatButton =
            null;

        this.chatWindow =
            null;

        this.closeButton =
            null;

        this.messagesContainer =
            null;

        this.optionsContainer =
            null;

        this.input =
            null;

        this.sendButton =
            null;

    }


    // =========================================
    // INICIAR CHATBOT
    // =========================================

    init() {

        this.chatButton =
            document.getElementById(
                "chatButton"
            );


        this.chatWindow =
            document.getElementById(
                "chatWindow"
            );


        this.closeButton =
            document.getElementById(
                "closeChat"
            );


        this.messagesContainer =
            document.getElementById(
                "chatMessages"
            );


        this.optionsContainer =
            document.querySelector(
                ".chat-options"
            );


        if (
            !this.chatButton
            ||
            !this.chatWindow
            ||
            !this.messagesContainer
        ) {

            console.warn(
                "No se encontraron los elementos del chatbot."
            );

            return;

        }


        this.createInputArea();

        this.bindEvents();

    }


    // =========================================
    // CREAR ÁREA PARA ESCRIBIR
    // =========================================

    createInputArea() {

        if (
            document.getElementById(
                "chatInputArea"
            )
        ) {

            return;

        }


        const inputArea =
            document.createElement(
                "div"
            );


        inputArea.id =
            "chatInputArea";


        inputArea.className =
            "chat-input-area";


        inputArea.innerHTML = `

            <input
                type="text"
                id="chatInput"
                placeholder="Escribe tu pregunta..."
                autocomplete="off"
            >

            <button
                type="button"
                id="chatSendButton"
                aria-label="Enviar mensaje"
            >
                ➤
            </button>

        `;


        this.chatWindow.appendChild(
            inputArea
        );


        this.input =
            document.getElementById(
                "chatInput"
            );


        this.sendButton =
            document.getElementById(
                "chatSendButton"
            );

    }


    // =========================================
    // EVENTOS
    // =========================================

    bindEvents() {

        // ABRIR CHAT

        this.chatButton
            .addEventListener(
                "click",
                () => {

                    this.openChat();

                }
            );


        // CERRAR CHAT

        this.closeButton
            ?.addEventListener(
                "click",
                () => {

                    this.closeChat();

                }
            );


        // OPCIONES RÁPIDAS

        this.optionsContainer
            ?.addEventListener(
                "click",
                event => {

                    const button =
                        event.target.closest(
                            "[data-chat-action]"
                        );


                    if (!button) {

                        return;

                    }


                    const action =
                        button.dataset
                            .chatAction;


                    this.handleAction(
                        action
                    );

                }
            );


        // BOTÓN ENVIAR

        this.sendButton
            ?.addEventListener(
                "click",
                () => {

                    this.processInput();

                }
            );


        // ENTER

        this.input
            ?.addEventListener(
                "keydown",
                event => {

                    if (
                        event.key
                        ===
                        "Enter"
                    ) {

                        event.preventDefault();

                        this.processInput();

                    }

                }
            );

    }


    // =========================================
    // ABRIR CHAT
    // =========================================

    openChat() {

        this.chatWindow
            .classList
            .add(
                "open"
            );


        this.input
            ?.focus();

    }


    // =========================================
    // CERRAR CHAT
    // =========================================

    closeChat() {

        this.chatWindow
            .classList
            .remove(
                "open"
            );

    }


    // =========================================
    // PROCESAR TEXTO DEL USUARIO
    // =========================================

    processInput() {

        const message =
            this.input
                ?.value
                .trim();


        if (!message) {

            return;

        }


        this.addUserMessage(
            message
        );


        this.input.value =
            "";


        const response =
            this.getResponse(
                message
            );


        setTimeout(
            () => {

                this.addBotMessage(
                    response.message
                );


                if (
                    response.action
                ) {

                    this.addNavigationButton(
                        response.action,
                        response.buttonText
                    );

                }

            },
            350
        );

    }


    // =========================================
    // RESPUESTAS DEL BOT
    // =========================================

    getResponse(message) {

        const text =
            this.normalizeText(
                message
            );


        // =====================================
        // SALUDOS
        // =====================================

        if (
            this.includesAny(
                text,
                [
                    "hola",
                    "buenas",
                    "hey",
                    "buenos dias",
                    "buenas tardes",
                    "buenas noches"
                ]
            )
        ) {

            return {

                message:
                    "👋 ¡Hola! Soy TechBot. Puedo ayudarte con productos, categorías, carrito, compras, historial, perfil, envíos y métodos de pago."

            };

        }


        // =====================================
        // AYUDA GENERAL
        // =====================================

        if (
            this.includesAny(
                text,
                [
                    "ayuda",
                    "que puedes hacer",
                    "que haces",
                    "opciones"
                ]
            )
        ) {

            return {

                message:
                    "🤖 Puedo ayudarte a navegar por TechCart, buscar productos, revisar categorías, administrar tu carrito, consultar compras anteriores, descargar recibos PDF, actualizar tu perfil y resolver dudas sobre envíos o pagos."

            };

        }


        // =====================================
        // PRODUCTOS
        // =====================================

        if (
            this.includesAny(
                text,
                [
                    "producto",
                    "productos",
                    "catalogo",
                    "comprar",
                    "tecnologia"
                ]
            )
        ) {

            return {

                message:
                    "💻 En Productos puedes consultar todo el catálogo de TechCart y agregar artículos a tu carrito.",

                action:
                    "productos",

                buttonText:
                    "Ver productos"

            };

        }


        // =====================================
        // CATEGORÍAS
        // =====================================

        if (
            this.includesAny(
                text,
                [
                    "categoria",
                    "categorias",
                    "laptop",
                    "smartphone",
                    "audio",
                    "gaming",
                    "smartwatch",
                    "accesorio"
                ]
            )
        ) {

            return {

                message:
                    "🗂️ Puedes explorar el catálogo por categorías: laptops, smartphones, accesorios, smartwatches, audio y gaming.",

                action:
                    "categorias",

                buttonText:
                    "Ver categorías"

            };

        }


        // =====================================
        // CARRITO
        // =====================================

        if (
            this.includesAny(
                text,
                [
                    "carrito",
                    "carro",
                    "cesta"
                ]
            )
        ) {

            const cart =
                StorageService
                    .getCart();


            const quantity =
                cart.reduce(
                    (
                        total,
                        item
                    ) => {

                        return total
                            +
                            Number(
                                item.cantidad
                                ||
                                0
                            );

                    },
                    0
                );


            if (
                quantity === 0
            ) {

                return {

                    message:
                        "🛒 Tu carrito está vacío. Puedes ir al catálogo y agregar productos.",

                    action:
                        "productos",

                    buttonText:
                        "Explorar productos"

                };

            }


            return {

                message:
                    `🛒 Actualmente tienes ${quantity} producto${quantity === 1 ? "" : "s"} en tu carrito. Desde allí puedes cambiar cantidades, eliminar productos o confirmar la compra.`,

                action:
                    "carrito",

                buttonText:
                    "Ir a mi carrito"

            };

        }


        // =====================================
        // CONFIRMAR COMPRA
        // =====================================

        if (
            this.includesAny(
                text,
                [
                    "confirmar compra",
                    "finalizar compra",
                    "pagar compra",
                    "hacer compra"
                ]
            )
        ) {

            return {

                message:
                    "✅ Para confirmar una compra debes ingresar a Mi carrito. Allí encontrarás el total y el botón Confirmar compra.",

                action:
                    "carrito",

                buttonText:
                    "Ir al carrito"

            };

        }


        // =====================================
        // COMPRAS / ÓRDENES
        // =====================================

        if (
            this.includesAny(
                text,
                [
                    "mis compras",
                    "orden",
                    "ordenes",
                    "recibo",
                    "recibos"
                ]
            )
        ) {

            const orders =
                StorageService
                    .getOrders();


            if (
                orders.length === 0
            ) {

                return {

                    message:
                        "📦 Todavía no tienes órdenes registradas. Cuando confirmes una compra aparecerá en Mis compras."

                };

            }


            return {

                message:
                    `📦 Tienes ${orders.length} orden${orders.length === 1 ? "" : "es"} registrada${orders.length === 1 ? "" : "s"}. En Mis compras puedes consultar los recibos y descargar cada orden en PDF.`,

                action:
                    "compras",

                buttonText:
                    "Ver mis compras"

            };

        }


        // =====================================
        // HISTORIAL
        // =====================================

        if (
            this.includesAny(
                text,
                [
                    "historial",
                    "compra anterior",
                    "compras anteriores",
                    "fecha",
                    "filtrar compras"
                ]
            )
        ) {

            return {

                message:
                    "🧾 En Historial puedes consultar órdenes anteriores, filtrarlas por rango de fechas y descargar el comprobante de una compra en PDF.",

                action:
                    "historial",

                buttonText:
                    "Abrir historial"

            };

        }


        // =====================================
        // PDF
        // =====================================

        if (
            this.includesAny(
                text,
                [
                    "pdf",
                    "descargar",
                    "comprobante",
                    "factura"
                ]
            )
        ) {

            return {

                message:
                    "📄 Puedes descargar el comprobante PDF desde Mis compras o desde el Historial. Cada orden tiene su propio botón Descargar PDF.",

                action:
                    "historial",

                buttonText:
                    "Ver historial"

            };

        }


        // =====================================
        // PERFIL
        // =====================================

        if (
            this.includesAny(
                text,
                [
                    "perfil",
                    "datos",
                    "nombre",
                    "correo",
                    "direccion",
                    "usuario"
                ]
            )
        ) {

            return {

                message:
                    "👤 En Mi perfil puedes consultar tus datos. Para modificarlos debes presionar Cambiar datos y verificar tu contraseña actual.",

                action:
                    "perfil",

                buttonText:
                    "Ir a mi perfil"

            };

        }


        // =====================================
        // CONTRASEÑA
        // =====================================

        if (
            this.includesAny(
                text,
                [
                    "contraseña",
                    "clave",
                    "password",
                    "olvide"
                ]
            )
        ) {

            return {

                message:
                    "🔐 Puedes cambiar tu contraseña desde Mi perfil. También existe la opción Recuperar contraseña para consultar tu clave mediante la validación de los datos registrados.",

                action:
                    "perfil",

                buttonText:
                    "Abrir perfil"

            };

        }


        // =====================================
        // ENVÍOS
        // =====================================

        if (
            this.includesAny(
                text,
                [
                    "envio",
                    "envios",
                    "domicilio",
                    "entrega",
                    "direccion"
                ]
            )
        ) {

            return {

                message:
                    "🚚 TechCart es una tienda académica simulada. La dirección de envío registrada en tu perfil se utiliza como referencia durante el proceso de compra."

            };

        }


        // =====================================
        // PAGOS
        // =====================================

        if (
            this.includesAny(
                text,
                [
                    "pago",
                    "pagos",
                    "tarjeta",
                    "transferencia",
                    "metodo de pago"
                ]
            )
        ) {

            return {

                message:
                    "💳 TechCart es una aplicación académica y no procesa dinero real. Los métodos de pago mostrados en la interfaz son simulados."

            };

        }


        // =====================================
        // OFERTAS
        // =====================================

        if (
            this.includesAny(
                text,
                [
                    "oferta",
                    "ofertas",
                    "descuento",
                    "promocion"
                ]
            )
        ) {

            return {

                message:
                    "🏷️ TechCart muestra ofertas promocionales dentro de la experiencia de la tienda. Puedes explorar el catálogo para consultar los productos disponibles.",

                action:
                    "productos",

                buttonText:
                    "Explorar productos"

            };

        }


        // =====================================
        // CERRAR SESIÓN
        // =====================================

        if (
            this.includesAny(
                text,
                [
                    "cerrar sesion",
                    "salir",
                    "logout"
                ]
            )
        ) {

            return {

                message:
                    "🚪 Puedes cerrar tu sesión desde el botón Cerrar sesión ubicado en la parte inferior del menú lateral."

            };

        }


        // =====================================
        // DEFAULT
        // =====================================

        return {

            message:
                "🤔 No encontré una respuesta exacta. Puedes preguntarme por productos, categorías, carrito, compras, historial, PDF, perfil, contraseña, envíos, pagos u ofertas."

        };

    }


    // =========================================
    // OPCIONES RÁPIDAS
    // =========================================

    handleAction(action) {

        switch (action) {

            case "productos":

                this.addUserMessage(
                    "Quiero ver productos"
                );

                this.addBotMessage(
                    "💻 Te llevo al catálogo de productos."
                );

                this.navigate(
                    "productos"
                );

                break;


            case "categorias":

                this.addUserMessage(
                    "Quiero ver las categorías"
                );

                this.addBotMessage(
                    "🗂️ Puedes explorar los productos según su categoría."
                );

                this.navigate(
                    "categorias"
                );

                break;


            case "carrito":

                this.showCartInfo();

                break;


            case "compras":

                this.showOrdersInfo();

                break;


            case "historial":

                this.addUserMessage(
                    "Quiero revisar mi historial"
                );

                this.addBotMessage(
                    "🧾 Desde el historial puedes filtrar compras por fecha y descargar comprobantes."
                );

                this.navigate(
                    "historial"
                );

                break;


            case "perfil":

                this.addUserMessage(
                    "Quiero ver mi perfil"
                );

                this.addBotMessage(
                    "👤 Desde tu perfil puedes consultar y actualizar tus datos."
                );

                this.navigate(
                    "perfil"
                );

                break;


            case "envios":

                this.addUserMessage(
                    "¿Cómo funcionan los envíos?"
                );

                this.addBotMessage(
                    "🚚 La dirección registrada en tu perfil se utiliza como referencia de entrega. TechCart es una tienda simulada para fines académicos."
                );

                break;


            case "pagos":

                this.addUserMessage(
                    "¿Qué métodos de pago hay?"
                );

                this.addBotMessage(
                    "💳 Los pagos de TechCart son simulados. La aplicación no procesa transacciones financieras reales."
                );

                break;


            default:

                this.addBotMessage(
                    "🤖 No reconozco esa opción."
                );

        }

    }


    // =========================================
    // INFO CARRITO
    // =========================================

    showCartInfo() {

        const cart =
            StorageService
                .getCart();


        const quantity =
            cart.reduce(
                (
                    total,
                    item
                ) => {

                    return total
                        +
                        Number(
                            item.cantidad
                            ||
                            0
                        );

                },
                0
            );


        this.addUserMessage(
            "Quiero revisar mi carrito"
        );


        if (
            quantity === 0
        ) {

            this.addBotMessage(
                "🛒 Tu carrito está vacío."
            );

            this.addNavigationButton(
                "productos",
                "Agregar productos"
            );


            return;

        }


        this.addBotMessage(
            `🛒 Tienes ${quantity} producto${quantity === 1 ? "" : "s"} en tu carrito.`
        );


        this.addNavigationButton(
            "carrito",
            "Ver carrito"
        );

    }


    // =========================================
    // INFO ÓRDENES
    // =========================================

    showOrdersInfo() {

        const orders =
            StorageService
                .getOrders();


        this.addUserMessage(
            "Quiero revisar mis compras"
        );


        if (
            orders.length === 0
        ) {

            this.addBotMessage(
                "📦 Aún no tienes compras registradas."
            );


            return;

        }


        this.addBotMessage(
            `📦 Tienes ${orders.length} compra${orders.length === 1 ? "" : "s"} registrada${orders.length === 1 ? "" : "s"}.`
        );


        this.addNavigationButton(
            "compras",
            "Ver recibos"
        );

    }


    // =========================================
    // NAVEGACIÓN
    // =========================================

    navigate(view) {

        setTimeout(
            () => {

                this.router.show(
                    view
                );


                this.closeChat();

            },
            500
        );

    }


    // =========================================
    // BOTÓN DE NAVEGACIÓN EN MENSAJE
    // =========================================

    addNavigationButton(
        action,
        text
    ) {

        const wrapper =
            document.createElement(
                "div"
            );


        wrapper.className =
            "bot-message bot-action-message";


        wrapper.innerHTML = `

            <button
                type="button"
                class="chat-navigation-button"
                data-bot-navigation="${action}"
            >
                ${text} →
            </button>

        `;


        const button =
            wrapper.querySelector(
                "[data-bot-navigation]"
            );


        button.addEventListener(
            "click",
            () => {

                this.navigate(
                    action
                );

            }
        );


        this.messagesContainer
            .appendChild(
                wrapper
            );


        this.scrollToBottom();

    }


    // =========================================
    // MENSAJE USUARIO
    // =========================================

    addUserMessage(message) {

        const element =
            document.createElement(
                "div"
            );


        element.className =
            "user-message";


        element.textContent =
            message;


        this.messagesContainer
            .appendChild(
                element
            );


        this.scrollToBottom();

    }


    // =========================================
    // MENSAJE BOT
    // =========================================

    addBotMessage(message) {

        const element =
            document.createElement(
                "div"
            );


        element.className =
            "bot-message";


        element.textContent =
            message;


        this.messagesContainer
            .appendChild(
                element
            );


        this.scrollToBottom();

    }


    // =========================================
    // SCROLL
    // =========================================

    scrollToBottom() {

        this.messagesContainer
            .scrollTop =
            this.messagesContainer
                .scrollHeight;

    }


    // =========================================
    // NORMALIZAR TEXTO
    // =========================================

    normalizeText(text) {

        return String(
            text
        )
            .toLowerCase()
            .normalize(
                "NFD"
            )
            .replace(
                /[\u0300-\u036f]/g,
                ""
            )
            .trim();

    }


    // =========================================
    // BUSCAR PALABRAS
    // =========================================

    includesAny(
        text,
        words
    ) {

        return words.some(
            word =>
                text.includes(
                    this.normalizeText(
                        word
                    )
                )
        );

    }

}


export default Chatbot;