import Cliente from "./models/Cliente.js";
import Cliente
    from "./models/Cliente.js";


document.addEventListener(
    "DOMContentLoaded",
    () => {


        // =========================================
        // CONFIGURACIÓN
        // =========================================

        const COLOR_PRINCIPAL =
            "#0875ec";


        const TERMS_VERSION =
            "1.0";

        const TERMS_VERSION =
            "1.0";


        // =========================================
        // MOSTRAR / OCULTAR CONTRASEÑA
        // =========================================

        const passwordButtons =
            document.querySelectorAll(
                ".toggle-password"
            );


        passwordButtons.forEach(
            button => {

                button.addEventListener(
                    "click",
                    () => {


                        const targetId =
                            button.dataset.target;
                        const targetId =
                            button.dataset.target;


                        const input =
                            document.getElementById(
                                targetId
                            );


                        if (!input) {

                        const input =
                            document.getElementById(
                                targetId
                            );


                        if (!input) {

                            return;

                        }


                        if (
                            input.type ===
                            "password"
                        ) {

                            input.type =
                                "text";
                            return;

                        }


                        if (
                            input.type ===
                            "password"
                        ) {

                            input.type =
                                "text";

                            button.textContent =
                                "🙈";

                        }

                        else {

                            input.type =
                                "password";

                            button.textContent =
                                "🙈";

                        }

                        else {

                            input.type =
                                "password";


                            button.textContent =
                                "👁";

                        }

                                "👁";

                        }

                    }
                );

            }
        );


        // =========================================
        // TÉRMINOS Y CONDICIONES
        // =========================================

        // =========================================
        // TÉRMINOS
        // =========================================

        const termsButton =
            document.getElementById(
                "termsButton"
            );


        if (termsButton) {

            termsButton.addEventListener(
                "click",
                () => {
        const termsButton =
            document.getElementById(
                "termsButton"
            );


        if (termsButton) {

            termsButton.addEventListener(
                "click",
                () => {

                    Swal.fire({

                        title:
                            "Términos y condiciones de TechCart",

                    Swal.fire({

                        title:
                            "Términos y condiciones de TechCart",

                        width:
                            760,

                        confirmButtonText:
                            "Entendido",

                        confirmButtonColor:
                        COLOR_PRINCIPAL,

                        html: `

                            <div style="
                                text-align:left;
                                line-height:1.6;
                                max-height:420px;
                                overflow-y:auto;
                                padding-right:12px;
                            ">

                                <h3>
                                    1. Naturaleza del servicio
                                </h3>
                        width:
                            760,

                        confirmButtonText:
                            "Entendido",

                        confirmButtonColor:
                        COLOR_PRINCIPAL,

                        html: `

                            <div style="
                                text-align:left;
                                line-height:1.6;
                                max-height:420px;
                                overflow-y:auto;
                                padding-right:12px;
                            ">

                                <h3>
                                    1. Naturaleza de TechCart
                                </h3>

                                <p>
                                    TechCart es una plataforma ficticia
                                    desarrollada con fines académicos
                                    para simular una tienda tecnológica.
                                </p>


                                <h3>
                                    2. Registro
                                </h3>

                                <p>
                                    Para utilizar las funciones privadas
                                    de la aplicación, el usuario debe
                                    crear una cuenta proporcionando
                                    nombre, usuario, correo electrónico,
                                    dirección y contraseña.
                                </p>

                                <p>
                                    TechCart es una aplicación ficticia
                                    desarrollada exclusivamente con fines
                                    académicos para simular una tienda
                                    tecnológica.
                                </p>


                                <h3>
                                    2. Registro
                                </h3>

                                <p>
                                    El usuario debe crear una cuenta
                                    proporcionando nombre, usuario,
                                    correo, dirección y contraseña.
                                </p>


                                <h3>
                                    3. Productos
                                </h3>

                                <p>
                                    Productos, precios, promociones y
                                    existencias son datos ficticios.
                                </p>


                                <h3>
                                    4. Compras
                                </h3>

                                <p>
                                    TechCart no procesa pagos ni
                                <h3>
                                    3. Cuenta de usuario
                                </h3>

                                <p>
                                    Cada usuario y correo electrónico
                                    deben ser únicos dentro de TechCart.
                                    El usuario es responsable de sus
                                    credenciales de acceso dentro de
                                    esta simulación.
                                </p>


                                <h3>
                                    4. Productos
                                </h3>

                                <p>
                                    Los nombres, precios, existencias,
                                    ofertas y características de los
                                    productos son ficticios y se usan
                                    únicamente para demostrar el
                                    funcionamiento del proyecto.
                                </p>


                                <h3>
                                    5. Compras
                                </h3>

                                <p>
                                    TechCart simula el proceso de compra,
                                    carrito y generación de órdenes.
                                    No se realizan cobros, pagos ni
                                    transacciones financieras reales.
                                </p>


                                <h3>
                                    5. Cuenta
                                </h3>

                                <p>
                                    Cada usuario y correo electrónico
                                    deben ser únicos.
                                </p>


                                <h3>
                                    6. Modificación de datos
                                </h3>

                                <p>
                                    La modificación de información
                                    personal requiere verificar la
                                    El usuario podrá modificar sus datos
                                    personales después de verificar su
                                    contraseña actual.
                                </p>


                                <h3>
                                    7. Almacenamiento
                                </h3>

                                <p>
                                    La información se almacena
                                    localmente mediante LocalStorage.
                                </p>

                                <p>
                                    La información de esta aplicación
                                    académica se almacena localmente
                                    mediante LocalStorage en el navegador.
                                </p>


                                <h3>
                                    8. Aceptación
                                </h3>

                                <p>
                                    Al registrarse, el usuario acepta
                                    estos términos para efectos de
                                    la simulación académica.
                                </p>


                                <strong>
                                    Versión ${TERMS_VERSION}
                                </strong>
                                    Al marcar la casilla de aceptación,
                                    el usuario declara haber leído y
                                    aceptado estos términos y condiciones.
                                </p>


                                <p>
                                    <strong>
                                        Versión de términos:
                                        ${TERMS_VERSION}
                                    </strong>
                                </p>

                            </div>

                        `

                    });

                }
            );

        }


        // =========================================
        // POLÍTICA DE PRIVACIDAD
        // =========================================

        // =========================================
        // PRIVACIDAD
        // =========================================

        const privacyButton =
            document.getElementById(
                "privacyButton"
            );


        if (privacyButton) {

            privacyButton.addEventListener(
                "click",
                () => {
        const privacyButton =
            document.getElementById(
                "privacyButton"
            );


        if (privacyButton) {

            privacyButton.addEventListener(
                "click",
                () => {

                    Swal.fire({

                        title:
                            "Política de privacidad",

                    Swal.fire({

                        title:
                            "Política de privacidad",

                        confirmButtonText:
                            "Entendido",

                        confirmButtonColor:
                        COLOR_PRINCIPAL,

                        html: `

                            <div style="
                                text-align:left;
                                line-height:1.6;
                            ">

                                <h3>
                                    Datos almacenados
                                </h3>

                                <p>
                                    TechCart almacena los datos
                                    necesarios para simular registro,
                                    inicio de sesión, perfil y compras.
                                </p>


                                <h3>
                                    Persistencia
                                </h3>

                                <p>
                                    La información se almacena mediante
                                    LocalStorage del navegador.
                                </p>


                                <h3>
                                    Uso académico
                                </h3>

                                <p>
                                    No deben utilizarse datos personales
                                    sensibles ni contraseñas reales.
                                </p>

                            </div>

                        `

                    });

                }
            );

        }
                        width:
                            720,

                        confirmButtonText:
                            "Entendido",

                        confirmButtonColor:
                        COLOR_PRINCIPAL,

                        html: `

                            <div style="
                                text-align:left;
                                line-height:1.6;
                                max-height:400px;
                                overflow-y:auto;
                                padding-right:12px;
                            ">

                                <h3>
                                    Información almacenada
                                </h3>

                                <p>
                                    TechCart almacena nombre,
                                    usuario, correo electrónico,
                                    dirección de envío y contraseña
                                    para simular las funciones de
                                    registro y autenticación.
                                </p>


                                <h3>
                                    Finalidad
                                </h3>

                                <p>
                                    La información se utiliza únicamente
                                    dentro del proyecto para permitir
                                    iniciar sesión, administrar el perfil,
                                    utilizar el carrito y generar órdenes.
                                </p>


                                <h3>
                                    Persistencia
                                </h3>

                                <p>
                                    Los datos se almacenan en
                                    LocalStorage del navegador.
                                    TechCart no utiliza un servidor
                                    externo ni una base de datos real.
                                </p>


                                <h3>
                                    Uso académico
                                </h3>

                                <p>
                                    Debido a que TechCart es una
                                    aplicación académica, no deben
                                    ingresarse datos personales
                                    sensibles ni contraseñas utilizadas
                                    en servicios reales.
                                </p>


                                <h3>
                                    Eliminación
                                </h3>

                                <p>
                                    Los datos pueden eliminarse limpiando
                                    el almacenamiento local del navegador.
                                </p>


        // =========================================
        // REGISTRO
        // =========================================

        const signupForm =
            document.getElementById(
                "signupForm"
            );
                            </div>

                        `

                    });

                }
            );

        if (signupForm) {

            signupForm.addEventListener(
                "submit",
                async event => {


                    event.preventDefault();
        }


        // =========================================
        // REGISTRO
        // =========================================

        const signupForm =
            document.getElementById(
                "signupForm"
            );


        if (signupForm) {

                    const nombre =
                        document
                            .getElementById(
                                "signupName"
                            )
                            .value
                            .trim();


                    const usuario =
                        document
                            .getElementById(
                                "signupUser"
                            )
                            .value
                            .trim();


                    const correo =
                        document
                            .getElementById(
                                "signupEmail"
                            )
                            .value
                            .trim();


                    const direccion =
                        document
                            .getElementById(
                                "signupAddress"
                            )
                            .value
                            .trim();
            signupForm.addEventListener(
                "submit",
                async event => {


                    event.preventDefault();


                    // =================================
                    // OBTENER DATOS
                    // =================================

                    const nombre =
                        document
                            .getElementById(
                                "signupName"
                            )
                            .value
                            .trim();


                    const usuario =
                        document
                            .getElementById(
                                "signupUser"
                            )
                            .value
                            .trim();

                    const password =
                        document
                            .getElementById(
                                "signupPassword"
                            )
                            .value;

                    const correo =
                        document
                            .getElementById(
                                "signupEmail"
                            )
                            .value
                            .trim();

                    const confirmation =
                        document
                            .getElementById(
                                "confirmPassword"
                            )
                            .value;


                    const termsCheckbox =
                        document.getElementById(
                            "acceptTerms"
                        );


                    const acceptedTerms =
                        termsCheckbox
                            ? termsCheckbox.checked
                            : false;



                    // =================================
                    // CAMPOS
                    // =================================

                    if (
                        !nombre ||
                        !usuario ||
                        !correo ||
                        !direccion ||
                        !password ||
                        !confirmation
                    ) {


                        await Swal.fire({

                            icon:
                                "warning",

                            title:
                                "Completa todos los campos",

                            text:
                                "Todos los datos son obligatorios.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }



                    // =================================
                    // NOMBRE
                    // =================================

                    if (
                        nombre.length < 3
                    ) {


                        await Swal.fire({

                            icon:
                                "warning",

                            title:
                                "Nombre no válido",

                            text:
                                "El nombre debe tener mínimo 3 caracteres.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }



                    // =================================
                    // USUARIO
                    // =================================

                    if (
                        usuario.length < 4
                    ) {


                        await Swal.fire({

                            icon:
                                "warning",

                            title:
                                "Usuario muy corto",

                            text:
                                "El usuario debe tener mínimo 4 caracteres.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }



                    // =================================
                    // CORREO
                    // =================================

                    const emailRegex =
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                    if (
                        !emailRegex.test(
                            correo
                        )
                    ) {


                        await Swal.fire({

                            icon:
                                "warning",

                            title:
                                "Correo inválido",

                            text:
                                "Ingresa un correo válido.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }



                    // =================================
                    // PASSWORD
                    // =================================

                    const passwordRegex =
                        /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;

                    const direccion =
                        document
                            .getElementById(
                                "signupAddress"
                            )
                            .value
                            .trim();


                    const password =
                        document
                            .getElementById(
                                "signupPassword"
                            )
                            .value;

                    if (
                        !passwordRegex.test(
                            password
                        )
                    ) {

                    const confirmation =
                        document
                            .getElementById(
                                "confirmPassword"
                            )
                            .value;

                        await Swal.fire({

                            icon:
                                "warning",

                            title:
                                "Contraseña no válida",

                            text:
                                "Debe tener mínimo 6 caracteres, una letra y un número.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }



                    // =================================
                    // CONFIRMACIÓN
                    // =================================

                    if (
                        password !==
                        confirmation
                    ) {


                        await Swal.fire({

                            icon:
                                "error",

                            title:
                                "Las contraseñas no coinciden",

                            text:
                                "Verifica nuevamente las contraseñas.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }



                    // =================================
                    // TÉRMINOS
                    // =================================

                    if (
                        !acceptedTerms
                    ) {


                        await Swal.fire({

                            icon:
                                "warning",

                            title:
                                "Aceptación requerida",

                            text:
                                "Debes aceptar los términos y la política de privacidad.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }



                    // =================================
                    // DUPLICADOS
                    // =================================

                    if (
                        Cliente.usuarioExiste(
                            usuario
                        )
                    ) {

                    const acceptedTerms =
                        document
                            .getElementById(
                                "acceptTerms"
                            )
                            .checked;

                        await Swal.fire({

                            icon:
                                "error",

                            title:
                                "Usuario no disponible",

                            text:
                                "Ese usuario ya está registrado.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }
                    // =================================
                    // VALIDAR CAMPOS
                    // =================================

                    if (
                        !nombre ||
                        !usuario ||
                        !correo ||
                        !direccion ||
                        !password ||
                        !confirmation
                    ) {

                        await Swal.fire({

                            icon:
                                "warning",

                            title:
                                "Completa todos los campos",

                            text:
                                "Todos los datos son obligatorios para crear tu cuenta.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    if (
                        Cliente.correoExiste(
                            correo
                        )
                    ) {


                        await Swal.fire({

                            icon:
                                "error",

                            title:
                                "Correo registrado",

                            text:
                                "Ya existe una cuenta con ese correo.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }


                    }


                    // =================================
                    // VALIDAR NOMBRE
                    // =================================

                    if (
                        nombre.length < 3
                    ) {

                        await Swal.fire({

                            icon:
                                "warning",

                            title:
                                "Nombre no válido",

                            text:
                                "El nombre debe tener al menos 3 caracteres.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }

                    // =================================
                    // CREAR CLIENTE
                    // =================================

                    const nuevoCliente =
                        new Cliente(

                            Date.now(),

                            nombre,

                            correo,

                            direccion,

                            usuario,

                            password,

                            true,

                            new Date()
                                .toISOString(),

                            TERMS_VERSION

                        );


                    nuevoCliente.registrar();



                    await Swal.fire({

                        icon:
                            "success",

                        title:
                            "¡Cuenta creada!",

                        html: `

                            Bienvenido,
                            <strong>
                                ${nombre}
                            </strong>.

                            <br><br>

                            Ahora puedes iniciar sesión.

                        `,

                        confirmButtonText:
                            "Iniciar sesión",

                        confirmButtonColor:
                        COLOR_PRINCIPAL,

                        allowOutsideClick:
                            false
                    // =================================
                    // VALIDAR USUARIO
                    // =================================

                    if (
                        usuario.length < 4
                    ) {

                        await Swal.fire({

                            icon:
                                "warning",

                            title:
                                "Usuario muy corto",

                            text:
                                "El nombre de usuario debe tener al menos 4 caracteres.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }


                    // =================================
                    // VALIDAR CORREO
                    // =================================

                    const emailRegex =
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                    window.location.href =
                        "login.html";

                }
            );

        }

                    if (
                        !emailRegex.test(correo)
                    ) {

                        await Swal.fire({

                            icon:
                                "warning",


        // =========================================
        // RECUPERAR CONTRASEÑA
        // =========================================

        const forgotPasswordButton =
            document.getElementById(
                "forgotPasswordButton"
            );

                            title:
                                "Correo no válido",

                            text:
                                "Ingresa una dirección de correo válida.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });

        if (forgotPasswordButton) {

            forgotPasswordButton
                .addEventListener(
                    "click",
                    async () => {
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

                                        Ingresa el usuario y correo
                                        asociados a tu cuenta.

                                    </p>


                                    <div style="
                                        text-align:left;
                                    ">
                    // =================================
                    // VALIDAR CONTRASEÑA
                    // =================================

                    const passwordRegex =
                        /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;


                    if (
                        !passwordRegex.test(
                            password
                        )
                    ) {

                        await Swal.fire({

                            icon:
                                "warning",

                            title:
                                "Contraseña poco segura",

                            text:
                                "La contraseña debe tener mínimo 6 caracteres e incluir al menos una letra y un número.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                                        <label style="
                                            display:block;
                                            margin-bottom:6px;
                                            font-weight:bold;
                                        ">

                                            Usuario

                                        </label>
                        });


                        return;

                    }

                                        <input
                                            id="recoveryUser"
                                            class="swal2-input"
                                            placeholder="Ingresa tu usuario"
                                            style="
                                                width:100%;
                                                margin:0 0 15px 0;
                                            "
                                        >

                    // =================================
                    // CONFIRMAR CONTRASEÑA
                    // =================================

                                        <label style="
                                            display:block;
                                            margin-bottom:6px;
                                            font-weight:bold;
                                        ">

                                            Correo electrónico

                                        </label>


                                        <input
                                            id="recoveryEmail"
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
                    if (
                        password !==
                        confirmation
                    ) {

                        await Swal.fire({

                            icon:
                                "error",

                            title:
                                "Las contraseñas no coinciden",

                            text:
                                "Verifica nuevamente las contraseñas ingresadas.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }

                                confirmButtonText:
                                    "Verificar cuenta",

                                cancelButtonText:
                                    "Cancelar",

                                confirmButtonColor:
                                COLOR_PRINCIPAL,

                                focusConfirm:
                                    false,


                                preConfirm: () => {


                                    const usuario =
                                        document
                                            .getElementById(
                                                "recoveryUser"
                                            )
                                            .value
                                            .trim();


                                    const correo =
                                        document
                                            .getElementById(
                                                "recoveryEmail"
                                            )
                                            .value
                                            .trim();

                    // =================================
                    // TÉRMINOS
                    // =================================

                    if (
                        !acceptedTerms
                    ) {

                        await Swal.fire({

                            icon:
                                "warning",

                            title:
                                "Aceptación requerida",

                            text:
                                "Debes aceptar los términos y condiciones y la política de privacidad para crear tu cuenta.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }

                                    if (
                                        !usuario ||
                                        !correo
                                    ) {

                    // =================================
                    // VERIFICAR USUARIO DUPLICADO
                    // =================================

                                        Swal
                                            .showValidationMessage(
                                                "Debes ingresar usuario y correo."
                                            );


                                        return false;

                                    }


                                    return {

                                        usuario:
                                        usuario,

                                        correo:
                                        correo

                                    };

                                }

                            });

                    if (
                        Cliente.usuarioExiste(
                            usuario
                        )
                    ) {

                        await Swal.fire({

                            icon:
                                "error",

                            title:
                                "Usuario no disponible",

                            text:
                                "Ese nombre de usuario ya está registrado.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }


                    // =================================
                    // VERIFICAR CORREO DUPLICADO
                    // =================================

                    if (
                        Cliente.correoExiste(
                            correo
                        )
                    ) {

                        if (
                            !result.isConfirmed
                        ) {

                            return;

                        }
                        await Swal.fire({

                            icon:
                                "error",

                            title:
                                "Correo registrado",

                            text:
                                "Ya existe una cuenta asociada a ese correo electrónico.",


                        const cliente =
                            Cliente
                                .recuperarPassword(

                                    result.value
                                        .usuario,

                                    result.value
                                        .correo

                                );



                        if (!cliente) {


                            await Swal.fire({

                                icon:
                                    "error",

                                title:
                                    "Cuenta no encontrada",

                                text:
                                    "El usuario y correo no corresponden a una cuenta registrada.",

                                confirmButtonColor:
                                COLOR_PRINCIPAL

                            });
                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }


                    // =================================
                    // CREAR CLIENTE
                    // =================================

                    const nuevoCliente =
                        new Cliente(

                            Date.now(),

                            nombre,

                            correo,

                            direccion,

                            usuario,

                            password,

                            true,

                            new Date()
                                .toISOString(),

                            return;

                        }



                        await Swal.fire({
                            TERMS_VERSION

                        );


                    // =================================
                    // GUARDAR CLIENTE
                    // =================================

                    nuevoCliente.registrar();

                            icon:
                                "success",

                            title:
                                "Cuenta verificada",

                            html: `

                                <p>
                                    Tu contraseña registrada es:
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
                    // =================================
                    // CONFIRMACIÓN
                    // =================================

                    await Swal.fire({

                        icon:
                            "success",

                        title:
                            "¡Cuenta creada correctamente!",

                        html: `

                            <p>
                                Bienvenido a TechCart,
                                <strong>
                                    ${nombre}
                                </strong>.
                            </p>

                            <p style="
                                margin-top:8px;
                            ">
                                Tu cuenta está lista.
                                Ahora puedes iniciar sesión.
                            </p>

                        `,

                        confirmButtonText:
                            "Ir a iniciar sesión",

                        confirmButtonColor:
                        COLOR_PRINCIPAL,

                        allowOutsideClick:
                            false

                                    ${cliente.password}

                                </div>

                            `,

                            confirmButtonText:
                                "Volver al inicio de sesión",

                            confirmButtonColor:
                            COLOR_PRINCIPAL,
                    window.location.href =
                        "login.html";

                }
            );

        }

                            allowOutsideClick:
                                false

                        });



                        const loginUser =
                            document.getElementById(
                                "loginUser"
                            );


                        if (loginUser) {

                            loginUser.value =
                                cliente.usuario;

                        }



                        const loginPassword =
                            document.getElementById(
                                "loginPassword"
                            );


                        if (loginPassword) {

                            loginPassword.focus();

                        }

                    }
                );

        }


        // =========================================
        // LOGIN
        // =========================================

        const loginForm =
            document.getElementById(
                "loginForm"
            );


        if (loginForm) {


            let intentos =
                Number(
                    sessionStorage.getItem(
                        "techCartLoginAttempts"
                    )
                ) || 0;


            const submitButton =
                loginForm.querySelector(
                    ".auth-submit"
                );


            // =====================================
            // SI YA ESTÁ BLOQUEADO
            // =====================================

            if (
                intentos >= 3 &&
                submitButton
            ) {

                bloquearLogin(
                    submitButton
                );

            }


            loginForm.addEventListener(
                "submit",
                async event => {


                    event.preventDefault();

        // =========================================
        // LOGIN
        // =========================================

        const loginForm =
            document.getElementById(
                "loginForm"
            );


        if (loginForm) {
                    // =================================
                    // MÁXIMO DE INTENTOS
                    // =================================

                    if (
                        intentos >= 3
                    ) {

                        await Swal.fire({

                            icon:
                                "error",

            let intentos =
                Number(

                    sessionStorage
                        .getItem(
                            "techCartLoginAttempts"
                        )

                ) || 0;

                        });


            const submitButton =
                loginForm
                    .querySelector(
                        ".auth-submit"
                    );

                    }


            if (
                intentos >= 3 &&
                submitButton
            ) {

                bloquearLogin(
                    submitButton
                );

            }



            loginForm.addEventListener(
                "submit",
                async event => {


                    event.preventDefault();


                            title:
                                "Completa los campos",

                    // =================================
                    // BLOQUEADO
                    // =================================

                    if (
                        intentos >= 3
                    ) {


                        await Swal.fire({

                            icon:
                                "error",

                            title:
                                "Acceso bloqueado",

                            text:
                                "Has alcanzado el máximo de 3 intentos permitidos.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }



                    // =================================
                    // DATOS
                    // =================================

                    const usuarioOCorreo =
                        document
                            .getElementById(
                                "loginUser"
                            )
                            .value
                            .trim();

                        sessionStorage.removeItem(
                            "techCartLoginAttempts"
                        );

                    const password =
                        document
                            .getElementById(
                                "loginPassword"
                            )
                            .value;


                            id:
                            cliente.id,

                    if (
                        !usuarioOCorreo ||
                        !password
                    ) {


                        await Swal.fire({

                            icon:
                                "warning",

                            title:
                                "Completa los campos",

                            text:
                                "Ingresa usuario o correo y contraseña.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }



                    // =================================
                    // VALIDAR
                    // =================================

                    const cliente =
                        Cliente.iniciarSesion(

                            usuarioOCorreo,

                            password

                        );



                    // =================================
                    // CORRECTO
                    // =================================

                    if (cliente) {


                        sessionStorage
                            .removeItem(
                                "techCartLoginAttempts"
                            );



                        const sesion = {

                            id:
                            cliente.id,

                            nombre:
                            cliente.nombre,

                            usuario:
                            cliente.usuario,

                            correo:
                            cliente.correo,

                            direccionEnvio:
                            cliente.direccionEnvio,

                            loginTime:
                                new Date()
                                    .toISOString()

                        };



                        localStorage.setItem(

                            "techCartSesion",

                            JSON.stringify(
                                sesion
                            )

                        );


                    sessionStorage.setItem(
                        "techCartLoginAttempts",
                        intentos.toString()
                    );

                        localStorage.setItem(
                            "isLoggedIn",
                            "true"
                        );

                    const restantes =
                        3 - intentos;


                        await Swal.fire({

                            icon:
                                "success",

                            title:
                                `¡Bienvenido, ${cliente.nombre}!`,

                            text:
                                "Inicio de sesión correcto.",

                            timer:
                                1400,

                            showConfirmButton:
                                false

                        });



                        window.location.href =
                            "../panel/index.html";


                        return;

                    }



                    // =================================
                    // INCORRECTO
                    // =================================

                    intentos++;


                        await Swal.fire({

                    sessionStorage.setItem(

                        "techCartLoginAttempts",

                        intentos.toString()

                    );



                    const restantes =
                        3 - intentos;



                    if (
                        restantes > 0
                    ) {


                        await Swal.fire({

                            icon:
                                "error",

                            title:
                                "Credenciales incorrectas",

                            text:
                                `Te quedan ${restantes} intento(s).`,

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });

                    }

                    else {


                        if (
                            submitButton
                        ) {

                            bloquearLogin(
                                submitButton
                            );

                        }



                        await Swal.fire({

                            icon:
                                "error",

                            title:
                                "Acceso bloqueado",

                            text:
                                "Has alcanzado los 3 intentos fallidos.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });

                    }

                }
            );

        }


        // =========================================
        // BLOQUEAR LOGIN
        // =========================================

        function bloquearLogin(
            button
        ) {

            button.disabled =
                true;


            button.textContent =
                "Acceso bloqueado";

        // =========================================
        // BLOQUEAR LOGIN
        // =========================================

        function bloquearLogin(
            button
        ) {

            button.disabled =
                true;


            button.textContent =
                "Acceso bloqueado";


            button.style.opacity =
                "0.6";

            button.style.opacity =
                "0.6";

            button.style.cursor =
                "not-allowed";

        }


    }
);