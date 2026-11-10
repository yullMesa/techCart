class GlobalSearch {
    constructor(router, productsView) {
        this.router = router;
        this.productsView = productsView;
        this.input = null;
        this.button = null;
        this.timer = null;
        this.searchId = 0;
        this.dropdown = null;
    }

    // =========================================
    // INIT
    // =========================================
    init() {
        this.input = document.getElementById("globalSearchInput");
        this.button = document.getElementById("globalSearchButton");

        if (!this.input) {
            console.error("No existe #globalSearchInput");
            return;
        }

        console.log("Buscador global iniciado");
        this.buildDropdown();
        this.bindEvents();
    }

    // =========================================
    // EVENTOS
    // =========================================
    bindEvents() {
        // El input se mantiene responsivo mientras el debounce espera.
        this.input.addEventListener("input", () => this.scheduleSuggestions());
        this.input.addEventListener("keydown", event => {
            if (event.key === "Escape") this.closeSuggestions();
        });
        document.addEventListener("click", event => {
            if (!event.target.closest(".topbar-search")) this.closeSuggestions();
        });
        this.dropdown.addEventListener("click", event => {
            const product = event.target.closest("[data-suggest-name]");
            if (!product) return;
            this.clearDebounce();
            this.search(product.dataset.suggestName);
            this.closeSuggestions();
        });
        // ENTER
        this.input.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                event.preventDefault();
                this.executeSearch();
            }
        });

        // CLIC EN LUPA
        this.button?.addEventListener("click", () => {
            this.executeSearch();
        });
    }

    log(phase, message) {
        window.dispatchEvent(new CustomEvent("techcart-async-event", {
            detail: {phase, message}
        }));
    }

    buildDropdown() {
        const host = this.input.closest(".topbar-search");
        if (!host) return;
        host.classList.add("async-search-host");
        this.dropdown = document.createElement("div");
        this.dropdown.className = "async-search-suggestions";
        this.dropdown.hidden = true;
        this.dropdown.setAttribute("role", "status");
        host.appendChild(this.dropdown);
    }

    clearDebounce() {
        clearTimeout(this.timer);
        this.searchId++;
    }

    closeSuggestions() {
        if (this.dropdown) this.dropdown.hidden = true;
    }

    scheduleSuggestions() {
        if (!this.dropdown) return;
        clearTimeout(this.timer);
        const query = this.input.value.trim();
        const id = ++this.searchId;
        if (!query) {
            this.closeSuggestions();
            return;
        }
        this.log("Call Stack", "Evento input: nueva búsqueda '" + query + "'");
        this.log("Web API", "clearTimeout + setTimeout(350): debounce");
        this.dropdown.hidden = false;
        this.dropdown.textContent = "Esperando pausa al escribir…";
        this.timer = setTimeout(() => {
            this.log("Task Queue", "Terminó debounce, inicia búsqueda simulada");
            this.showSuggestionsAsync(query, id);
        }, 350);
    }

    async showSuggestionsAsync(query, id) {
        this.dropdown.textContent = "Buscando productos…";
        // Una Promesa simula latencia sin hacer solicitudes externas.
        const items = await new Promise(resolve => {
            this.log("Web API", "setTimeout(180): búsqueda local no bloqueante");
            setTimeout(() => {
                this.log("Task Queue", "El temporizador devuelve resultados locales");
                const products = this.productsView.productos || [];
                const q = this.normalize(query);
                resolve(products.filter(p =>
                    this.normalize([p.nombre, p.descripcion, p.categoria,
                        p.procesador, p.memoriaRAM, p.almacenamiento,
                        p.sistemaOperativo, p.tipoAccesorio].filter(Boolean).join(" ")).includes(q)
                ).slice(0, 6));
            }, 180);
        });
        this.log("Microtask Queue", "La Promise se resolvió; continúa async/await");
        // Evita que una consulta vieja sobrescriba una nueva.
        if (id !== this.searchId || this.input.value.trim() !== query) return;
        this.dropdown.replaceChildren();
        if (!items.length) {
            this.dropdown.textContent = "No hay coincidencias; prueba otra palabra.";
            return;
        }
        for (const product of items) {
            const button = document.createElement("button");
            button.type = "button";
            button.dataset.suggestName = product.nombre;
            const name = document.createElement("strong");
            name.textContent = product.nombre;
            const price = document.createElement("span");
            price.textContent = new Intl.NumberFormat("es-CO", {style: "currency", currency: "COP", maximumFractionDigits: 0}).format(product.precio);
            button.append(name, price);
            this.dropdown.appendChild(button);
        }
    }

    // =========================================
    // EJECUTAR BÚSQUEDA
    // =========================================
    executeSearch() {
        this.clearDebounce();
        this.closeSuggestions();
        const query = this.input.value.trim();
        console.log("Buscando:", query);

        if (!query) {
            Swal.fire({
                icon: "info",
                title: "Escribe algo",
                text: "Ingresa una palabra para buscar en TechCart.",
                confirmButtonColor: "#0875ec"
            });
            return;
        }

        this.search(query);
    }

    // =========================================
    // BUSCAR
    // =========================================
    search(query) {
        const text = this.normalize(query);

        // =====================================
        // INICIO
        // =====================================
        if (this.matches(text, ["inicio", "home", "principal"])) {
            this.goTo("inicio");
            return;
        }

        // =====================================
        // CARRITO
        // =====================================
        if (this.matches(text, ["carrito", "carro", "cesta"])) {
            this.goTo("carrito");
            return;
        }

        // =====================================
        // HISTORIAL
        // =====================================
        if (this.matches(text, ["historial", "anteriores", "compras anteriores"])) {
            this.goTo("historial");
            return;
        }

        // =====================================
        // PERFIL
        // =====================================
        if (this.matches(text, ["perfil", "mi perfil", "datos personales", "cuenta"])) {
            this.goTo("perfil");
            return;
        }

        // =====================================
        // MIS COMPRAS
        // =====================================
        if (this.matches(text, ["mis compras", "compras", "orden", "ordenes", "recibo", "recibos"])) {
            this.goTo("compras");
            return;
        }

        // =====================================
        // CATEGORÍAS
        // =====================================
        if (this.matches(text, ["categoria", "categorias"])) {
            this.goTo("categorias");
            return;
        }

        // =====================================
        // PRODUCTOS
        // =====================================
        const resultados = this.productsView.buscarPorTexto(query);
        console.log("Resultados encontrados:", resultados);

        if (Array.isArray(resultados) && resultados.length > 0) {
            this.router.show("productos");
            this.clearDebounce();
            this.closeSuggestions();
            this.clear();
            return;
        }

        // =====================================
        // SIN RESULTADOS
        // =====================================
        Swal.fire({
            icon: "info",
            title: "Sin resultados",
            text: `No encontramos coincidencias para "${query}".`,
            confirmButtonColor: "#0875ec"
        });
    }

    // =========================================
    // IR A VISTA
    // =========================================
    goTo(view) {
        console.log("Navegando a:", view);
        this.router.show(view);
        this.clearDebounce();
        this.closeSuggestions();
        this.clear();
    }

    // =========================================
    // COINCIDENCIA
    // =========================================
    matches(text, words) {
        return words.some(word => {
            const normalizedWord = this.normalize(word);
            return text === normalizedWord || text.includes(normalizedWord);
        });
    }

    // =========================================
    // NORMALIZAR
    // =========================================
    normalize(text) {
        return String(text || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    // =========================================
    // LIMPIAR
    // =========================================
    clear() {
        if (this.input) {
            this.input.value = "";
        }
    }
}

export default GlobalSearch;