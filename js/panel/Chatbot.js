class Chatbot {

    constructor(router) {

        this.router =
            router;

    }

    init() {
        // listeners chatbot
    }

    goToProducts() {

        this.router.show(
            "productos"
        );

    }

}

export default Chatbot;