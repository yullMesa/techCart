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


        this.recoverPasswordButton =
            document.getElementById(
                "recoverProfilePasswordButton"
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


        this.recoverPasswordButton
            ?.addEventListener(
                "click",
                () => {

                    this.recoverPassword();

                }
            );

    }


    // =========================================
    // RECUPERAR CONTRASEÑA
    // =========================================

    async recoverPassword() {

        const cliente =
            ClienteService.getClienteById(
                this.session.id
            );


        if (!cliente) {

            await Swal.fire({

                icon:
                    "error",

                title:
                    "Cuenta no encontrada",

                text:
                    "No fue posible encontrar los datos de tu cuenta.",

                confirmButtonColor:
                    "#0875ec"

            });


            return;

        }


        const result =
            await Swal.fire({

                icon:
                    "question",

                title:
                    "Recuperar contraseña",

                html: `

                    <p style="
                        margin-bottom:18px;
                        color:#667389;
                    ">
                        Confirma tu usuario y correo
                        para consultar tu contraseña.
                    </p>


                    <div style="
                        text-align:left;
                    ">

                        <label style="
                            display:block;
                            margin-bottom:6px;
                            font-weight:bold;
                        ">
                            Usuario
                        </label>


                        <input
                            id="profileRecoveryUser"
                            class="swal2-input"
                            placeholder="Ingresa tu usuario"
                            style="
                                width:100%;
                                margin:0 0 15px 0;
                            "
                        >


                        <label style="
                            display:block;
                            margin-bottom:6px;
                            font-weight:bold;
                        ">
                            Correo electrónico
                        </label>


                        <input
                            id="profileRecoveryEmail"
                            type="email"
                            class="swal2-input"
                            placeholder="correo@ejemplo.com"
                            style="
                                width:100%;
                                margin:0;
                            "
                        >

                    </div>

                `,

                showCancelButton:
                    true,

                confirmButtonText:
                    "Verificar",

                cancelButtonText:
                    "Cancelar",

                confirmButtonColor:
                    "#0875ec",

                focusConfirm:
                    false,


                preConfirm: () => {

                    const usuario =
                        document
                            .getElementById(
                                "profileRecoveryUser"
                            )
                            .value
                            .trim()
                            .toLowerCase();


                    const correo =
                        document
                            .getElementById(
                                "profileRecoveryEmail"
                            )
                            .value
                            .trim()
                            .toLowerCase();


                    if (
                        !usuario ||
                        !correo
                    ) {

                        Swal.showValidationMessage(
                            "Debes ingresar usuario y correo."
                        );


                        return false;

                    }


                    return {

                        usuario,
                        correo

                    };

                }

            });


        if (!result.isConfirmed) {
            return;
        }


        const usuarioGuardado =
            String(
                cliente.usuario || ""
            )
                .trim()
                .toLowerCase();


        const nombreGuardado =
            String(
                cliente.nombre || ""
            )
                .trim()
                .toLowerCase();


        const correoGuardado =
            String(
                cliente.correo || ""
            )
                .trim()
                .toLowerCase();


        const coincideUsuario =
            result.value.usuario ===
            usuarioGuardado
            ||
            result.value.usuario ===
            nombreGuardado;


        const coincideCorreo =
            result.value.correo ===
            correoGuardado;


        if (
            !coincideUsuario ||
            !coincideCorreo
        ) {

            await Swal.fire({

                icon:
                    "error",

                title:
                    "Datos incorrectos",

                text:
                    "El usuario y correo no corresponden a tu cuenta.",

                confirmButtonColor:
                    "#0875ec"

            });


            return;

        }


        await Swal.fire({

            icon:
                "success",

            title:
                "Cuenta verificada",

            html: `

                <p>
                    Tu contraseña actual es:
                </p>


                <div style="
                    margin-top:15px;
                    padding:15px;
                    background:#f2f6fb;
                    color:#0875ec;
                    border-radius:8px;
                    font-size:20px;
                    font-weight:bold;
                ">

                    ${cliente.password}

                </div>


                <p style="
                    margin-top:15px;
                    color:#7e899b;
                    font-size:12px;
                ">
                    Recuerda que TechCart es
                    una aplicación académica.
                </p>

            `,

            confirmButtonText:
                "Entendido",

            confirmButtonColor:
                "#0875ec"

        });

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


        inputs.forEach(
            input => {

                if (input) {

                    input.disabled =
                        false;

                }

            }
        );


        if (this.editButton) {

            this.editButton.hidden =
                true;

        }


        if (this.saveButton) {

            this.saveButton.hidden =
                false;

        }


        if (this.cancelButton) {

            this.cancelButton.hidden =
                false;

        }


        this.nameInput?.focus();

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


        inputs.forEach(
            input => {

                if (input) {

                    input.disabled =
                        true;

                }

            }
        );


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
    // GUARDAR CAMBIOS
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
        // CAMPOS
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
            !disponibilidad
                .usuarioDisponible
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
            !disponibilidad
                .correoDisponible
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
        // NUEVA CONTRASEÑA
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


            const passwordRegex =
                /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;


            if (
                !passwordRegex.test(
                    newPassword
                )
            ) {

                Swal.fire({

                    icon:
                        "warning",

                    title:
                        "Contraseña no válida",

                    text:
                        "Debe tener mínimo 6 caracteres e incluir una letra y un número.",

                    confirmButtonColor:
                        "#0875ec"

                });


                return;

            }


            nuevosDatos.password =
                newPassword;

        }


        // =====================================
        // CONFIRMAR
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
            !confirmationAlert
                .isConfirmed
        ) {

            return;

        }


        // =====================================
        // ACTUALIZAR CLIENTE
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
    // ACTUALIZAR INTERFAZ
    // =========================================

    updateInterface() {

        if (!this.session) {
            return;
        }


        const nombre =
            this.session.nombre ||
            "Usuario";


        const correo =
            this.session.correo ||
            "";


        const initial =
            nombre
                .charAt(0)
                .toUpperCase();


        [
            "profileName",
            "sidebarUserName",
            "topbarUserName",
            "welcomeUser"
        ]
            .forEach(
                id => {

                    const element =
                        document.getElementById(
                            id
                        );


                    if (element) {

                        element.textContent =
                            nombre;

                    }

                }
            );


        [
            "profileEmail",
            "sidebarUserEmail"
        ]
            .forEach(
                id => {

                    const element =
                        document.getElementById(
                            id
                        );


                    if (element) {

                        element.textContent =
                            correo;

                    }

                }
            );


        [
            "profileAvatar",
            "userAvatar",
            "topbarAvatar"
        ]
            .forEach(
                id => {

                    const element =
                        document.getElementById(
                            id
                        );


                    if (element) {

                        element.textContent =
                            initial;

                    }

                }
            );

    }

}


export default ProfileView;