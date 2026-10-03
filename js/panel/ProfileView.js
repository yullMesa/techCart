import StorageService
    from "../services/StorageService.js";

import AuthService
    from "../services/AuthService.js";

import ClienteService
    from "../services/ClienteService.js";


class ProfileView {


    constructor() {

        this.session =
            StorageService.getSession();


        this.editing =
            false;

    }



    // =========================================
    // INICIALIZAR
    // =========================================

    init() {

        if (!this.session) {

            return;

        }


        this.cacheElements();

        this.loadCurrentClient();

        this.loadProfile();

        this.disableEdition();

        this.bindEvents();

    }



    // =========================================
    // ELEMENTOS
    // =========================================

    cacheElements() {

        this.nameInput =
            document.getElementById(
                "profileNameInput"
            );


        this.userInput =
            document.getElementById(
                "profileUserInput"
            );


        this.emailInput =
            document.getElementById(
                "profileEmailInput"
            );


        this.addressInput =
            document.getElementById(
                "profileAddressInput"
            );


        this.newPasswordInput =
            document.getElementById(
                "newPasswordInput"
            );


        this.confirmPasswordInput =
            document.getElementById(
                "confirmNewPasswordInput"
            );


        this.editButton =
            document.getElementById(
                "editProfileButton"
            );


        this.saveButton =
            document.getElementById(
                "saveProfileButton"
            );


        this.cancelButton =
            document.getElementById(
                "cancelProfileButton"
            );

    }



    // =========================================
    // OBTENER CLIENTE REAL
    // =========================================

    loadCurrentClient() {

        const cliente =
            ClienteService.getClienteById(
                this.session.id
            );


        if (!cliente) {

            return;

        }


        /*
         Utilizamos los datos guardados
         del cliente como fuente principal.
        */

        this.session = {

            ...this.session,

            id:
            cliente.id,

            nombre:
            cliente.nombre,

            usuario:
            cliente.usuario,

            correo:
            cliente.correo,

            direccionEnvio:
            cliente.direccionEnvio

        };


        StorageService.saveSession(
            this.session
        );

    }



    // =========================================
    // MOSTRAR PERFIL
    // =========================================

    loadProfile() {

        if (!this.session) {

            return;

        }


        this.nameInput.value =
            this.session.nombre || "";


        this.userInput.value =
            this.session.usuario || "";


        this.emailInput.value =
            this.session.correo || "";


        this.addressInput.value =
            this.session.direccionEnvio || "";


        this.newPasswordInput.value =
            "";


        this.confirmPasswordInput.value =
            "";


        this.updateInterface();

    }



    // =========================================
    // EVENTOS
    // =========================================

    bindEvents() {


        this.editButton?.addEventListener(
            "click",
            () => {

                this.requestEditPermission();

            }
        );


        this.saveButton?.addEventListener(
            "click",
            () => {

                this.saveChanges();

            }
        );


        this.cancelButton?.addEventListener(
            "click",
            () => {

                this.cancelEdition();

            }
        );

    }



    // =========================================
    // SOLICITAR PERMISO PARA EDITAR
    // =========================================

    async requestEditPermission() {

        const result =
            await Swal.fire({

                icon:
                    "info",

                title:
                    "Verifica tu identidad",

                text:
                    "Ingresa tu contraseña actual para modificar tus datos.",

                input:
                    "password",

                inputPlaceholder:
                    "Contraseña actual",

                inputAttributes: {

                    autocomplete:
                        "current-password"

                },

                showCancelButton:
                    true,

                confirmButtonText:
                    "Verificar",

                cancelButtonText:
                    "Cancelar",

                confirmButtonColor:
                    "#0875ec",

                inputValidator:
                    value => {

                        if (!value) {

                            return "Debes ingresar tu contraseña.";

                        }

                    }

            });



        if (!result.isConfirmed) {

            return;

        }



        const passwordCorrecta =
            AuthService.verificarPassword(

                this.session.id,

                result.value

            );



        if (!passwordCorrecta) {


            await Swal.fire({

                icon:
                    "error",

                title:
                    "Contraseña incorrecta",

                text:
                    "No tienes autorización para modificar los datos.",

                confirmButtonColor:
                    "#0875ec"

            });


            return;

        }



        this.enableEdition();



        Swal.fire({

            icon:
                "success",

            title:
                "Edición habilitada",

            text:
                "Ahora puedes modificar tus datos.",

            timer:
                1200,

            showConfirmButton:
                false

        });

    }



    // =========================================
    // HABILITAR EDICIÓN
    // =========================================

    enableEdition() {

        this.editing =
            true;


        const inputs = [

            this.nameInput,

            this.userInput,

            this.emailInput,

            this.addressInput,

            this.newPasswordInput,

            this.confirmPasswordInput

        ];


        inputs.forEach(input => {

            input.disabled =
                false;

        });


        this.editButton.hidden =
            true;


        this.saveButton.hidden =
            false;


        this.cancelButton.hidden =
            false;


        this.nameInput.focus();

    }



    // =========================================
    // DESHABILITAR EDICIÓN
    // =========================================

    disableEdition() {

        this.editing =
            false;


        const inputs = [

            this.nameInput,

            this.userInput,

            this.emailInput,

            this.addressInput,

            this.newPasswordInput,

            this.confirmPasswordInput

        ];


        inputs.forEach(input => {

            if (input) {

                input.disabled =
                    true;

            }

        });


        if (this.editButton) {

            this.editButton.hidden =
                false;

        }


        if (this.saveButton) {

            this.saveButton.hidden =
                true;

        }


        if (this.cancelButton) {

            this.cancelButton.hidden =
                true;

        }

    }



    // =========================================
    // CANCELAR
    // =========================================

    cancelEdition() {

        this.loadProfile();

        this.disableEdition();

    }



    // =========================================
    // GUARDAR
    // =========================================

    async saveChanges() {

        if (!this.editing) {

            return;

        }



        const nuevosDatos = {

            nombre:
                this.nameInput
                    .value
                    .trim(),

            usuario:
                this.userInput
                    .value
                    .trim(),

            correo:
                this.emailInput
                    .value
                    .trim(),

            direccionEnvio:
                this.addressInput
                    .value
                    .trim()

        };



        // =====================================
        // CAMPOS OBLIGATORIOS
        // =====================================

        if (
            !nuevosDatos.nombre ||
            !nuevosDatos.usuario ||
            !nuevosDatos.correo ||
            !nuevosDatos.direccionEnvio
        ) {


            Swal.fire({

                icon:
                    "warning",

                title:
                    "Datos incompletos",

                text:
                    "Nombre, usuario, correo y dirección son obligatorios.",

                confirmButtonColor:
                    "#0875ec"

            });


            return;

        }



        // =====================================
        // DUPLICADOS
        // =====================================

        const disponibilidad =
            ClienteService.datosDisponibles(

                this.session.id,

                nuevosDatos.usuario,

                nuevosDatos.correo

            );



        if (
            !disponibilidad.usuarioDisponible
        ) {


            Swal.fire({

                icon:
                    "error",

                title:
                    "Usuario no disponible",

                text:
                    "Ese nombre de usuario pertenece a otra cuenta.",

                confirmButtonColor:
                    "#0875ec"

            });


            return;

        }



        if (
            !disponibilidad.correoDisponible
        ) {


            Swal.fire({

                icon:
                    "error",

                title:
                    "Correo registrado",

                text:
                    "Ese correo pertenece a otra cuenta.",

                confirmButtonColor:
                    "#0875ec"

            });


            return;

        }



        // =====================================
        // CAMBIO CONTRASEÑA
        // =====================================

        const newPassword =
            this.newPasswordInput.value;


        const confirmation =
            this.confirmPasswordInput.value;



        if (
            newPassword ||
            confirmation
        ) {


            if (
                newPassword !==
                confirmation
            ) {


                Swal.fire({

                    icon:
                        "error",

                    title:
                        "Las contraseñas no coinciden",

                    text:
                        "Verifica la nueva contraseña.",

                    confirmButtonColor:
                        "#0875ec"

                });


                return;

            }



            if (
                newPassword.length < 6
            ) {


                Swal.fire({

                    icon:
                        "warning",

                    title:
                        "Contraseña muy corta",

                    text:
                        "La nueva contraseña debe tener al menos 6 caracteres.",

                    confirmButtonColor:
                        "#0875ec"

                });


                return;

            }



            nuevosDatos.password =
                newPassword;

        }



        // =====================================
        // CONFIRMACIÓN FINAL
        // =====================================

        const confirmationAlert =
            await Swal.fire({

                icon:
                    "question",

                title:
                    "¿Guardar cambios?",

                text:
                    "La información de tu cuenta será actualizada.",

                showCancelButton:
                    true,

                confirmButtonText:
                    "Sí, guardar",

                cancelButtonText:
                    "Cancelar",

                confirmButtonColor:
                    "#0875ec"

            });



        if (
            !confirmationAlert.isConfirmed
        ) {

            return;

        }



        // =====================================
        // ACTUALIZAR LOCALSTORAGE
        // =====================================

        const clienteActualizado =
            ClienteService.actualizarCliente(

                this.session.id,

                nuevosDatos

            );



        if (!clienteActualizado) {


            Swal.fire({

                icon:
                    "error",

                title:
                    "No fue posible actualizar",

                text:
                    "Inténtalo nuevamente.",

                confirmButtonColor:
                    "#0875ec"

            });


            return;

        }



        // =====================================
        // ACTUALIZAR SESIÓN
        // =====================================

        this.session = {

            ...this.session,

            nombre:
            clienteActualizado.nombre,

            usuario:
            clienteActualizado.usuario,

            correo:
            clienteActualizado.correo,

            direccionEnvio:
            clienteActualizado.direccionEnvio

        };


        StorageService.saveSession(
            this.session
        );



        this.loadProfile();

        this.disableEdition();



        await Swal.fire({

            icon:
                "success",

            title:
                "Cuenta actualizada",

            text:
                "Tus datos se guardaron correctamente.",

            timer:
                1500,

            showConfirmButton:
                false

        });

    }



    // =========================================
    // ACTUALIZAR TODA LA INTERFAZ
    // =========================================

    updateInterface() {

        if (!this.session) {

            return;

        }


        const nombre =
            this.session.nombre || "Usuario";


        const correo =
            this.session.correo || "";


        const initial =
            nombre
                .charAt(0)
                .toUpperCase();



        // NOMBRES

        [

            "profileName",

            "sidebarUserName",

            "topbarUserName",

            "welcomeUser"

        ].forEach(id => {


            const element =
                document.getElementById(id);


            if (element) {

                element.textContent =
                    nombre;

            }

        });



        // CORREOS

        [

            "profileEmail",

            "sidebarUserEmail"

        ].forEach(id => {


            const element =
                document.getElementById(id);


            if (element) {

                element.textContent =
                    correo;

            }

        });



        // AVATARES

        [

            "profileAvatar",

            "userAvatar",

            "topbarAvatar"

        ].forEach(id => {


            const element =
                document.getElementById(id);


            if (element) {

                element.textContent =
                    initial;

            }

        });

    }

}


export default ProfileView;