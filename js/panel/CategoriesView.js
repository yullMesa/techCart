class CategoriesView {

    constructor(router) {

        this.router =
            router;

    }


    init() {

        const categoryCards =
            document.querySelectorAll(
                "[data-category]"
            );


        categoryCards.forEach(
            card => {

                card.addEventListener(
                    "click",
                    () => {

                        const category =
                            card.dataset.category;


                        if (!category) {
                            return;
                        }


                        sessionStorage.setItem(
                            "techCartSelectedCategory",
                            category
                        );


                        window.dispatchEvent(
                            new CustomEvent(
                                "techcart:category-selected",
                                {
                                    detail: {
                                        category
                                    }
                                }
                            )
                        );


                        this.router.show(
                            "productos"
                        );

                    }
                );

            }
        );

    }

}


export default CategoriesView;