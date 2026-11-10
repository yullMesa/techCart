import StorageService from "../services/StorageService.js";
import EnvioService from "../services/EnvioService.js";

// TechBot 09: operaciones académicas simuladas, sin conexión bancaria.
class Chatbot {
    constructor(router) {
        this.router = router;
        this.chatButton = null;
        this.chatWindow = null;
        this.closeButton = null;
        this.messagesContainer = null;
        this.optionsContainer = null;
        this.input = null;
        this.sendButton = null;
        this.requestChain = Promise.resolve();
        this.modal = null;
        this.modalMode = null;
        this.modalBusy = false;
        this.operationToken = 0;
    }

    init() {
        this.chatButton = document.getElementById("chatButton");
        this.chatWindow = document.getElementById("chatWindow");
        this.closeButton = document.getElementById("closeChat");
        this.messagesContainer = document.getElementById("chatMessages");
        this.optionsContainer = document.querySelector(".chat-options");
        if (!this.chatButton || !this.chatWindow || !this.messagesContainer) return;
        this.ensureStyles();
        this.createInputArea();
        this.createModal();
        // Remueve el monitor técnico de versiones anteriores, si existe en el DOM.
        this.chatWindow.querySelector("#asyncTracePanel")?.remove();
        this.chatWindow.querySelector(".async-trace-toggle")?.remove();
        this.bindEvents();
    }

    ensureStyles() {
        if (document.getElementById("techbot09-styles")) return;
        const link = document.createElement("link");
        link.id = "techbot09-styles";
        link.rel = "stylesheet";
        link.href = new URL("../../css/techbot09.css", import.meta.url).href;
        document.head.appendChild(link);
    }

    createInputArea() {
        let inputArea = document.getElementById("chatInputArea");
        if (!inputArea) {
            inputArea = document.createElement("div");
            inputArea.id = "chatInputArea";
            inputArea.className = "chat-input-area";
            inputArea.innerHTML = `<input type="text" id="chatInput" placeholder="Escribe tu pregunta..." autocomplete="off"><button type="button" id="chatSendButton" aria-label="Enviar mensaje">➤</button>`;
            this.chatWindow.appendChild(inputArea);
        }
        this.input = document.getElementById("chatInput");
        this.sendButton = document.getElementById("chatSendButton");
    }

    bindEvents() {
        this.chatButton.addEventListener("click", () => this.openChat());
        this.closeButton?.addEventListener("click", () => this.closeChat());
        this.optionsContainer?.addEventListener("click", event => {
            const option = event.target.closest("[data-chat-action]");
            if (option) this.handleAction(option.dataset.chatAction);
        });
        this.sendButton?.addEventListener("click", () => this.processInput());
        this.input?.addEventListener("keydown", event => {
            if (event.key === "Enter") { event.preventDefault(); this.processInput(); }
        });
    }

    openChat() { this.chatWindow.classList.add("open"); this.input?.focus(); }
    closeChat() { this.chatWindow.classList.remove("open"); }

    processInput() {
        const message = this.input?.value.trim();
        if (!message) return;
        this.addUserMessage(message);
        this.input.value = "";
        this.requestChain = this.requestChain.catch(() => {}).then(() => this.respondAsync(message));
    }

    // La espera utiliza Web API setTimeout; su Promise reanuda async/await
    // mediante microtareas. La interfaz queda libre mientras se espera.
    async respondAsync(message) {
        const typing = this.showTyping();
        try {
            const response = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    try { resolve(this.getResponse(message)); }
                    catch (error) { reject(error); }
                }, 500);
            });
            this.addBotMessage(response.message);
            if (response.action) this.addNavigationButton(response.action, response.buttonText);
        } catch (error) {
            console.error("TechBot:", error);
            this.addBotMessage("No pude procesar esa consulta. Inténtalo otra vez.");
        } finally {
            typing.remove();
            this.scrollToBottom();
        }
    }

    showTyping() {
        const node = document.createElement("div");
        node.className = "bot-message async-typing";
        node.textContent = "TechBot está escribiendo…";
        this.messagesContainer.appendChild(node);
        this.scrollToBottom();
        return node;
    }

    createModal() {
        if (document.getElementById("techbotOperationModal")) return;
        const modal = document.createElement("div");
        modal.id = "techbotOperationModal";
        modal.className = "techbot-modal";
        modal.hidden = true;
        modal.innerHTML = `
          <div class="techbot-modal-backdrop" data-operation-close></div>
          <section class="techbot-modal-panel" role="dialog" aria-modal="true" aria-labelledby="techbotModalTitle">
            <header class="techbot-modal-header"><div><small>TECHCART · SIMULACIÓN ACADÉMICA</small><h2 id="techbotModalTitle"></h2></div><button type="button" class="techbot-modal-close" data-operation-close aria-label="Cerrar">✕</button></header>
            <div class="techbot-modal-body" id="techbotOperationContent"></div>
          </section>`;
        document.body.appendChild(modal);
        this.modal = modal;
        modal.addEventListener("click", e => {
            if (e.target.closest("[data-operation-close]")) this.closeOperation();
        });
        modal.addEventListener("submit", e => {
            if (!e.target.matches("#techbotPayForm, #techbotShippingForm")) return;
            e.preventDefault();
            if (e.target.id === "techbotPayForm") this.simulatePayment(e.target);
            else this.simulateShipping(e.target);
        });
        document.addEventListener("keydown", e => {
            if (e.key === "Escape" && !modal.hidden) this.closeOperation();
        });
    }

    openOperation(mode) {
        this.openChat();
        this.modalMode = mode;
        this.operationToken++;
        this.modalBusy = false;
        this.modal.hidden = false;
        document.body.classList.add("techbot-modal-open");
        const content = document.getElementById("techbotOperationContent");
        document.getElementById("techbotModalTitle").textContent = mode === "pagos" ? "Simulador de medios de pago" : "Consulta de entrega";
        if (mode === "pagos") {
            const cart = StorageService.getCart();
            const amount = cart.reduce((sum, item) => sum + Number(item.producto?.precio || 0) * Number(item.cantidad || 0), 0);
            content.innerHTML = `
              <p class="techbot-notice">Este módulo es una <strong>demostración</strong>. No solicita números de tarjeta, claves, CVV ni datos bancarios. <strong>No se realiza ni autoriza ningún cobro real.</strong></p>
              <div class="techbot-summary"><span>Subtotal actual del carrito</span><strong>${this.money(amount)}</strong><small>El importe es informativo. No se descontará de una cuenta.</small></div>
              <form id="techbotPayForm" class="techbot-form">
                <label>Medio de pago de prueba<select name="method" required><option value="">Selecciona una opción</option><option value="credito">Tarjeta de crédito (demo)</option><option value="debito">Tarjeta débito (demo)</option><option value="corriente">Cuenta corriente (demo)</option><option value="ahorros">Cuenta de ahorros (demo)</option></select></label>
                <label>Entidad ficticia<select name="bank" required><option value="">Selecciona una opción</option><option value="Banco Demo Azul">Banco Demo Azul</option><option value="Banco Demo Verde">Banco Demo Verde</option></select></label>
                <label>Referencia de prueba <span>(opcional; no ingreses datos reales)</span><input name="reference" maxlength="20" placeholder="Ej.: PEDIDO-DEMO" autocomplete="off"></label>
                <button type="submit" class="techbot-primary">Simular solicitud</button>
              </form><div id="techbotOperationResult" class="techbot-result" aria-live="polite"></div>`;
        } else {
            const session = StorageService.getSession() || {};
            const address = session.direccionEnvio ? String(session.direccionEnvio) : "No configurada en el perfil";
            const destinationOptions = EnvioService.destinos().map(d => `<option value="${d.id}">${d.nombre}</option>`).join("");
            content.innerHTML = `
              <p class="techbot-notice">Costos y tiempos <strong>estimados y ficticios</strong>. No existe conexión con una transportadora.</p>
              <div class="techbot-summary"><span>Dirección registrada</span><strong id="techbotSavedAddress"></strong><small>Selecciona la zona correspondiente a tu dirección.</small></div>
              <form id="techbotShippingForm" class="techbot-form">
                <label>Destino<select name="destination" required><option value="">Selecciona destino</option>${destinationOptions}</select></label>
                <label>Modalidad<select name="mode" required><option value="estandar">Estándar</option><option value="expres">Exprés</option></select></label>
                <button type="submit" class="techbot-primary">Calcular entrega estimada</button>
              </form><div id="techbotOperationResult" class="techbot-result" aria-live="polite"></div>`;
            content.querySelector("#techbotSavedAddress").textContent = address;
        }
        this.modal.querySelector(".techbot-modal-close").focus();
    }

    closeOperation() {
        if (!this.modal || this.modal.hidden) return;
        this.operationToken++; // Invalida continuaciones asíncronas anteriores.
        this.modal.hidden = true;
        this.modalMode = null;
        this.modalBusy = false;
        document.body.classList.remove("techbot-modal-open");
        this.addBotMessage("La consulta de demostración se cerró. No se ha realizado ningún cobro ni validación bancaria real.");
    }

    delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

    async simulatePayment(form) {
        if (this.modalBusy) return;
        const method = form.elements.namedItem("method").value;
        const bank = form.elements.namedItem("bank").value;
        if (!method || !bank) return;
        const token = this.operationToken;
        this.modalBusy = true;
        const button = form.querySelector("[type=submit]");
        button.disabled = true;
        const result = document.getElementById("techbotOperationResult");
        result.replaceChildren();
        const status = document.createElement("p");
        status.className = "techbot-processing";
        status.textContent = "Procesando datos de demostración…";
        result.appendChild(status);
        try {
            await this.delay(850);
            if (token !== this.operationToken) return;
            status.textContent = "Verificando el formato de la solicitud de prueba…";
            await this.delay(650);
            if (token !== this.operationToken) return;
            result.replaceChildren();
            const title = document.createElement("strong");
            title.textContent = "Solicitud de prueba registrada";
            const explanation = document.createElement("p");
            explanation.textContent = `${bank} · ${this.getMethodName(method)}. Estado: PENDIENTE (SIMULADO). TechCart no tiene acceso al banco; no se puede validar ni descontar dinero real.`;
            result.append(title, explanation);
            this.addBotMessage(`💳 Solicitud de pago de prueba registrada: ${this.getMethodName(method)}. Sin cobro real ni aprobación bancaria.`);
        } catch (error) {
            console.error("Error en simulador:", error);
            status.textContent = "No se pudo completar la simulación.";
        } finally {
            if (token === this.operationToken) { this.modalBusy = false; button.disabled = false; }
        }
    }

    async simulateShipping(form) {
        if (this.modalBusy) return;
        this.modalBusy = true;
        const token = this.operationToken;
        const button = form.querySelector("[type=submit]");
        button.disabled = true;
        const result = document.getElementById("techbotOperationResult");
        result.replaceChildren();
        const loading = document.createElement("p");
        loading.className = "techbot-processing";
        loading.textContent = "Calculando ruta y tarifa de ejemplo…";
        result.appendChild(loading);
        try {
            const cart = StorageService.getCart();
            const subtotal = cart.reduce((sum, item) => sum + Number(item.producto?.precio || 0) * Number(item.cantidad || 0), 0);
            const destination = form.elements.namedItem("destination").value;
            const mode = form.elements.namedItem("mode").value;
            await this.delay(650);
            if (token !== this.operationToken) return;
            const estimate = EnvioService.calcular(subtotal, destination, mode);
            result.replaceChildren();
            const title = document.createElement("strong");
            title.textContent = "Estimación calculada (simulada)";
            const lines = document.createElement("p");
            lines.textContent = `${estimate.destino} · ${mode === "expres" ? "Exprés" : "Estándar"} · ${estimate.diasEstimados} día(s) hábil(es) estimados · Envío: ${this.money(estimate.costoEnvio)}.`;
            result.append(title, lines);
            this.addBotMessage(`🚚 Envío de demostración a ${estimate.destino}: ${estimate.diasEstimados} día(s) hábil(es), costo estimado ${this.money(estimate.costoEnvio)}.`);
        } catch (error) {
            console.error("Cálculo de envío:", error);
            loading.textContent = "Selecciona un destino válido para calcular el envío.";
        } finally {
            if (token === this.operationToken) { this.modalBusy = false; button.disabled = false; }
        }
    }

    money(n) { return new Intl.NumberFormat("es-CO", {style:"currency",currency:"COP",maximumFractionDigits:0}).format(n); }
    getMethodName(id) { return ({credito:"Tarjeta de crédito",debito:"Tarjeta débito",corriente:"Cuenta corriente",ahorros:"Cuenta de ahorros"})[id] || "Método de prueba"; }

    getResponse(message) {
        const text = this.normalizeText(message);

        // =====================================
        // SALUDOS
        // =====================================
        if (this.includesAny(text, ["hola", "buenas", "hey", "buenos dias", "buenas tardes", "buenas noches"])) {
            return {
                message: "👋 ¡Hola! Soy TechBot. Puedo ayudarte con productos, categorías, carrito, compras, historial, perfil, envíos y métodos de pago."
            };
        }

        // =====================================
        // AYUDA GENERAL
        // =====================================
        if (this.includesAny(text, ["ayuda", "que puedes hacer", "que haces", "opciones"])) {
            return {
                message: "🤖 Puedo ayudarte a navegar por TechCart, buscar productos, revisar categorías, administrar tu carrito, consultar compras anteriores, descargar recibos PDF, actualizar tu perfil y resolver dudas sobre envíos o pagos."
            };
        }

        // =====================================
        // PRODUCTOS
        // =====================================
        if (this.includesAny(text, ["producto", "productos", "catalogo", "comprar", "tecnologia"])) {
            return {
                message: "💻 En Productos puedes consultar todo el catálogo de TechCart y agregar artículos a tu carrito.",
                action: "productos",
                buttonText: "Ver productos"
            };
        }

        // =====================================
        // CATEGORÍAS
        // =====================================
        if (this.includesAny(text, ["categoria", "categorias", "laptop", "smartphone", "audio", "gaming", "smartwatch", "accesorio"])) {
            return {
                message: "🗂️ Puedes explorar el catálogo por categorías: laptops, smartphones, accesorios, smartwatches, audio y gaming.",
                action: "categorias",
                buttonText: "Ver categorías"
            };
        }

        // =====================================
        // CARRITO
        // =====================================
        if (this.includesAny(text, ["carrito", "carro", "cesta"])) {
            const cart = StorageService.getCart();
            const quantity = cart.reduce((total, item) => {
                return total + Number(item.cantidad || 0);
            }, 0);

            if (quantity === 0) {
                return {
                    message: "🛒 Tu carrito está vacío. Puedes ir al catálogo y agregar productos.",
                    action: "productos",
                    buttonText: "Explorar productos"
                };
            }

            return {
                message: `🛒 Actualmente tienes ${quantity} producto${quantity === 1 ? "" : "s"} en tu carrito. Desde allí puedes cambiar cantidades, eliminar productos o confirmar la compra.`,
                action: "carrito",
                buttonText: "Ir a mi carrito"
            };
        }

        // =====================================
        // CONFIRMAR COMPRA
        // =====================================
        if (this.includesAny(text, ["confirmar compra", "finalizar compra", "pagar compra", "hacer compra"])) {
            return {
                message: "✅ Para confirmar una compra debes ingresar a Mi carrito. Allí encontrarás el total y el botón Confirmar compra.",
                action: "carrito",
                buttonText: "Ir al carrito"
            };
        }

        // =====================================
        // COMPRAS / ÓRDENES
        // =====================================
        if (this.includesAny(text, ["mis compras", "orden", "ordenes", "recibo", "recibos"])) {
            const orders = StorageService.getOrders();
            if (orders.length === 0) {
                return {
                    message: "📦 Todavía no tienes órdenes registradas. Cuando confirmes una compra aparecerá en Mis compras."
                };
            }

            return {
                message: `📦 Tienes ${orders.length} orden${orders.length === 1 ? "" : "es"} registrada${orders.length === 1 ? "" : "s"}. En Mis compras puedes consultar los recibos y descargar cada orden en PDF.`,
                action: "compras",
                buttonText: "Ver mis compras"
            };
        }

        // =====================================
        // HISTORIAL
        // =====================================
        if (this.includesAny(text, ["historial", "compra anterior", "compras anteriores", "fecha", "filtrar compras"])) {
            return {
                message: "🧾 En Historial puedes consultar órdenes anteriores, filtrarlas por rango de fechas y descargar el comprobante de una compra en PDF.",
                action: "historial",
                buttonText: "Abrir historial"
            };
        }

        // =====================================
        // PDF
        // =====================================
        if (this.includesAny(text, ["pdf", "descargar", "comprobante", "factura"])) {
            return {
                message: "📄 Puedes descargar el comprobante PDF desde Mis compras o desde el Historial. Cada orden tiene su propio botón Descargar PDF.",
                action: "historial",
                buttonText: "Ver historial"
            };
        }

        // =====================================
        // PERFIL
        // =====================================
        if (this.includesAny(text, ["perfil", "datos", "nombre", "correo", "direccion", "usuario"])) {
            return {
                message: "👤 En Mi perfil puedes consultar tus datos. Para modificarlos debes presionar Cambiar datos y verificar tu contraseña actual.",
                action: "perfil",
                buttonText: "Ir a mi perfil"
            };
        }

        // =====================================
        // CONTRASEÑA
        // =====================================
        if (this.includesAny(text, ["contraseña", "clave", "password", "olvide"])) {
            return {
                message: "🔐 Puedes cambiar tu contraseña desde Mi perfil. Por seguridad, la aplicación no debe mostrar contraseñas guardadas.",
                action: "perfil",
                buttonText: "Abrir perfil"
            };
        }

        // =====================================
        // ENVÍOS
        // =====================================
        if (this.includesAny(text, ["envio", "envios", "domicilio", "entrega", "tiempo de entrega"])) {
            return {
                message: "🚚 Puedo calcular un estimado de entrega y costo para tu dirección. Selecciona Envíos para consultar.", action: "envios", buttonText: "Consultar envío"
            };
        }

        // =====================================
        // PAGOS
        // =====================================
        if (this.includesAny(text, ["pago", "pagos", "tarjeta", "transferencia", "metodo de pago"])) {
            return {
                message: "💳 Puedes explorar medios de pago de prueba. No se solicitan datos reales ni se comunica con bancos.", action: "pagos", buttonText: "Simulador de pagos"
            };
        }

        // =====================================
        // OFERTAS
        // =====================================
        if (this.includesAny(text, ["oferta", "ofertas", "descuento", "promocion"])) {
            return {
                message: "🏷️ TechCart muestra ofertas promocionales dentro de la experiencia de la tienda. Puedes explorar el catálogo para consultar los productos disponibles.",
                action: "productos",
                buttonText: "Explorar productos"
            };
        }

        // =====================================
        // CERRAR SESIÓN
        // =====================================
        if (this.includesAny(text, ["cerrar sesion", "salir", "logout"])) {
            return {
                message: "🚪 Puedes cerrar tu sesión desde el botón Cerrar sesión ubicado en la parte inferior del menú lateral."
            };
        }

        // =====================================
        // DEFAULT
        // =====================================
        return {
            message: "🤔 No encontré una respuesta exacta. Puedes preguntarme por productos, categorías, carrito, compras, historial, PDF, perfil, contraseña, envíos, pagos u ofertas."
        };
    }

    // Opciones rápidas existentes; mantenemos las rutas y el carrito.
    handleAction(action) {
        if (action === "pagos" || action === "envios") {
            this.addUserMessage(action === "pagos" ? "Consultar medios de pago" : "Consultar opciones de envío");
            this.openOperation(action);
            return;
        }
        const actions = {
            productos: ["Quiero ver productos", "Te llevo al catálogo.", "productos"],
            categorias: ["Quiero ver las categorías", "Puedes explorar los productos por categoría.", "categorias"],
            historial: ["Quiero revisar mi historial", "Consulta compras y recibos anteriores.", "historial"],
            perfil: ["Quiero ver mi perfil", "Puedes consultar y actualizar tus datos.", "perfil"]
        };
        if (action === "carrito") return this.showCartInfo();
        if (action === "compras") return this.showOrdersInfo();
        if (actions[action]) {
            const [user,bot,route] = actions[action];
            this.addUserMessage(user);
            this.addBotMessage(bot);
            this.navigate(route);
            return;
        }
        this.addBotMessage("No reconozco esa opción.");
    }

    // =========================================
    // INFO CARRITO
    // =========================================
    showCartInfo() {
        const cart = StorageService.getCart();
        const quantity = cart.reduce((total, item) => {
            return total + Number(item.cantidad || 0);
        }, 0);

        this.addUserMessage("Quiero revisar mi carrito");

        if (quantity === 0) {
            this.addBotMessage("🛒 Tu carrito está vacío.");
            this.addNavigationButton("productos", "Agregar productos");
            return;
        }

        this.addBotMessage(`🛒 Tienes ${quantity} producto${quantity === 1 ? "" : "s"} en tu carrito.`);
        this.addNavigationButton("carrito", "Ver carrito");
    }

    // =========================================
    // INFO ÓRDENES
    // =========================================
    showOrdersInfo() {
        const orders = StorageService.getOrders();
        this.addUserMessage("Quiero revisar mis compras");

        if (orders.length === 0) {
            this.addBotMessage("📦 Aún no tienes compras registradas.");
            return;
        }

        this.addBotMessage(`📦 Tienes ${orders.length} compra${orders.length === 1 ? "" : "s"} registrada${orders.length === 1 ? "" : "s"}.`);
        this.addNavigationButton("compras", "Ver recibos");
    }

    // =========================================
    // NAVEGACIÓN
    // =========================================
    navigate(view) {
        setTimeout(() => {
            this.router.show(view);
            this.closeChat();
        }, 300);
    }

    // =========================================
    // BOTÓN DE NAVEGACIÓN EN MENSAJE
    // =========================================
    addNavigationButton(action, text) {
        const wrapper = document.createElement("div");
        wrapper.className = "bot-message bot-action-message";
        wrapper.innerHTML = `
      <button
          type="button"
          class="chat-navigation-button"
          data-bot-navigation="${action}"
      >
          ${text} →
      </button>
    `;

        const button = wrapper.querySelector("[data-bot-navigation]");
        button.addEventListener("click", () => {
            if (action === "pagos" || action === "envios") this.openOperation(action);
            else this.navigate(action);
        });

        this.messagesContainer.appendChild(wrapper);
        this.scrollToBottom();
    }

    // =========================================
    // MENSAJE USUARIO
    // =========================================
    addUserMessage(message) {
        const element = document.createElement("div");
        element.className = "user-message";
        element.textContent = message;
        this.messagesContainer.appendChild(element);
        this.scrollToBottom();
    }

    // =========================================
    // MENSAJE BOT
    // =========================================
    addBotMessage(message) {
        const element = document.createElement("div");
        element.className = "bot-message";
        element.textContent = message;
        this.messagesContainer.appendChild(element);
        this.scrollToBottom();
    }

    // =========================================
    // SCROLL
    // =========================================
    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    // =========================================
    // NORMALIZAR TEXTO
    // =========================================
    normalizeText(text) {
        return String(text)
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    // =========================================
    // BUSCAR PALABRAS
    // =========================================
    includesAny(text, words) {
        return words.some(word => text.includes(this.normalizeText(word)));
    }
}

export default Chatbot;
