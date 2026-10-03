class Sidebar {

    constructor(router) {

        this.router = router;

        this.sidebar =
            document.getElementById("sidebar");

        this.menuToggle =
            document.getElementById("menuToggle");

        this.sidebarClose =
            document.getElementById("sidebarClose");

        this.sidebarOverlay =
            document.getElementById("sidebarOverlay");

        this.menuItems =
            document.querySelectorAll(".menu-item");

        this.viewButtons =
            document.querySelectorAll(
                "[data-view-target]"
            );

        this.logoutButton =
            document.getElementById(
                "logoutButton"
            );

    }


    // =========================================
    // INICIALIZAR
    // =========================================

    init() {

        this.initMenu();

        this.initResponsiveSidebar();

        this.initViewButtons();

        this.initLogout();

    }


    // =========================================
    // MENÚ PRINCIPAL
    // =========================================

    initMenu() {

        this.menuItems.forEach((item) => {

            item.addEventListener(
                "click",
                () => {

                    const viewName =
                        item.dataset.view;


                    if (!viewName) {
                        return;
                    }


                    this.setActiveMenu(
                        viewName
                    );


                    this.router.show(
                        viewName
                    );


                    this.close();

                }
            );

        });

    }


    // =========================================
    // BOTONES INTERNOS
    // =========================================

    initViewButtons() {

        this.viewButtons.forEach(
            (button) => {

                button.addEventListener(
                    "click",
                    () => {

                        const viewName =
                            button.dataset.viewTarget;


                        if (!viewName) {
                            return;
                        }


                        this.setActiveMenu(
                            viewName
                        );


                        this.router.show(
                            viewName
                        );


                        this.close();

                    }
                );

            }
        );

    }


    // =========================================
    // CAMBIAR ESTADO ACTIVO
    // =========================================

    setActiveMenu(viewName) {

        this.menuItems.forEach(
            (item) => {

                item.classList.remove(
                    "active"
                );


                if (
                    item.dataset.view ===
                    viewName
                ) {

                    item.classList.add(
                        "active"
                    );

                }

            }
        );

    }


    // =========================================
    // RESPONSIVE
    // =========================================

    initResponsiveSidebar() {

        if (this.menuToggle) {

            this.menuToggle.addEventListener(
                "click",
                () => {

                    this.open();

                }
            );

        }


        if (this.sidebarClose) {

            this.sidebarClose.addEventListener(
                "click",
                () => {

                    this.close();

                }
            );

        }


        if (this.sidebarOverlay) {

            this.sidebarOverlay.addEventListener(
                "click",
                () => {

                    this.close();

                }
            );

        }

    }


    // =========================================
    // ABRIR SIDEBAR
    // =========================================

    open() {

        if (this.sidebar) {

            this.sidebar.classList.add(
                "open"
            );

        }


        if (this.sidebarOverlay) {

            this.sidebarOverlay.classList.add(
                "active"
            );

        }

    }


    // =========================================
    // CERRAR SIDEBAR
    // =========================================

    close() {

        if (this.sidebar) {

            this.sidebar.classList.remove(
                "open"
            );

        }


        if (this.sidebarOverlay) {

            this.sidebarOverlay.classList.remove(
                "active"
            );

        }

    }


    // =========================================
    // CERRAR SESIÓN
    // =========================================

    initLogout() {

        if (!this.logoutButton) {

            return;

        }


        this.logoutButton.addEventListener(
            "click",
            () => {

                Swal.fire({

                    icon: "question",

                    title:
                        "¿Cerrar sesión?",

                    text:
                        "Saldrás de tu cuenta de TechCart.",

                    showCancelButton:
                        true,

                    confirmButtonText:
                        "Cerrar sesión",

                    cancelButtonText:
                        "Cancelar",

                    confirmButtonColor:
                        "#d33",

                    cancelButtonColor:
                        "#6c757d"

                }).then((result) => {


                    if (
                        result.isConfirmed
                    ) {

                        localStorage.removeItem(
                            "isLoggedIn"
                        );


                        localStorage.removeItem(
                            "techCartSesion"
                        );


                        sessionStorage.removeItem(
                            "techCartLoginAttempts"
                        );


                        window.location.href =
                            "../index.html";

                    }

                });

            }
        );

    }

}


export default Sidebar;