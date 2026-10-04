import Cliente from "./models/Cliente.js";


document.addEventListener(
    "DOMContentLoaded",
    () => {


        const COLOR_PRINCIPAL =
            "#0875ec";


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


                            button.textContent =
                                "🙈";

                        }

                        else {

                            input.type =
                                "password";


                            button.textContent =
                                "👁";

                        }

                    }
                );

            }
        );


        // =========================================
        // TÉRMINOS Y CONDICIONES
        // =========================================

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
                                    correo electrónico, dirección
                                    y contraseña.
                                </p>


                                <h3>
                                    3. Productos
                                </h3>

                                <p>
                                    Los productos, precios,
                                    promociones y existencias
                                    mostrados son ficticios.
                                </p>


                                <h3>
                                    4. Compras
                                </h3>

                                <p>
                                    TechCart no procesa pagos
                                    ni transacciones financieras reales.
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
                                    Para modificar información personal
                                    el usuario deberá verificar
                                    su contraseña.
                                </p>


                                <h3>
                                    7. Almacenamiento
                                </h3>

                                <p>
                                    La información se almacena
                                    localmente mediante LocalStorage.
                                </p>


                                <h3>
                                    8. Aceptación
                                </h3>

                                <p>
                                    Al crear una cuenta y seleccionar
                                    la casilla correspondiente,
                                    el usuario acepta estos términos.
                                </p>


                                <strong>
                                    Versión ${TERMS_VERSION}
                                </strong>

                            </div>

                        `

                    });

                }
            );

        }


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


                    Swal.fire({

                        title:
                            "Política de privacidad",

                        width:
                            700,

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
                                    Información almacenada
                                </h3>

                                <p>
                                    TechCart almacena nombre,
                                    usuario, correo electrónico,
                                    dirección y contraseña.
                                </p>


                                <h3>
                                    Finalidad
                                </h3>

                                <p>
                                    Estos datos se utilizan únicamente
                                    para simular registro, autenticación,
                                    perfil, carrito y compras.
                                </p>


                                <h3>
                                    Persistencia
                                </h3>

                                <p>
                                    La información permanece almacenada
                                    en LocalStorage del navegador.
                                </p>


                                <h3>
                                    Uso académico
                                </h3>

                                <p>
                                    No deben ingresarse datos sensibles
                                    ni contraseñas utilizadas
                                    en servicios reales.
                                </p>

                            </div>

                        `

                    });

                }
            );

        }


        // =========================================
        // REGISTRO
        // =========================================

        const signupForm =
            document.getElementById(
                "signupForm"
            );


        if (signupForm) {

            signupForm.addEventListener(
                "submit",
                async event => {


                    event.preventDefault();


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


                    const password =
                        document
                            .getElementById(
                                "signupPassword"
                            )
                            .value;


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
                    // CAMPOS OBLIGATORIOS
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
                                "Ingresa una dirección de correo válida.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }


                    // =================================
                    // CONTRASEÑA
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
                                "Contraseña no válida",

                            text:
                                "Debe tener mínimo 6 caracteres e incluir una letra y un número.",

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
                    // USUARIO DUPLICADO
                    // =================================

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
                    // CORREO DUPLICADO
                    // =================================

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
                                "Ya existe una cuenta asociada a ese correo.",

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
                            "¡Cuenta creada correctamente!",

                        html: `

                            Bienvenido,
                            <strong>
                                ${nombre}
                            </strong>.

                            <br><br>

                            Ahora puedes iniciar sesión.

                        `,

                        confirmButtonText:
                            "Ir a iniciar sesión",

                        confirmButtonColor:
                        COLOR_PRINCIPAL,

                        allowOutsideClick:
                            false

                    });


                    window.location.href =
                        "login.html";

                }
            );

        }


        // =========================================
        // RECUPERAR CONTRASEÑA
        // =========================================

        const forgotPasswordButton =
            document.getElementById(
                "forgotPasswordButton"
            );


        if (forgotPasswordButton) {

            forgotPasswordButton.addEventListener(
                "click",
                async () => {


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

                                    Ingresa tu usuario o nombre
                                    y el correo asociado a tu cuenta.

                                </p>


                                <div style="
                                    text-align:left;
                                ">


                                    <label style="
                                        display:block;
                                        margin-bottom:6px;
                                        font-weight:bold;
                                    ">

                                        Usuario o nombre

                                    </label>


                                    <input
                                        id="recoveryUser"
                                        class="swal2-input"
                                        placeholder="Usuario o nombre"
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


                                if (
                                    !usuario ||
                                    !correo
                                ) {

                                    Swal.showValidationMessage(
                                        "Debes ingresar usuario o nombre y correo."
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
                        !result.isConfirmed
                    ) {

                        return;

                    }


                    const cliente =
                        Cliente.recuperarPassword(

                            result.value.usuario,

                            result.value.correo

                        );


                    if (!cliente) {

                        await Swal.fire({

                            icon:
                                "error",

                            title:
                                "Cuenta no encontrada",

                            text:
                                "El usuario/nombre y correo no corresponden a una cuenta registrada.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

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

                                ${cliente.password}

                            </div>

                        `,

                        confirmButtonText:
                            "Volver al inicio de sesión",

                        confirmButtonColor:
                        COLOR_PRINCIPAL,

                        allowOutsideClick:
                            false

                    });


                    const loginUser =
                        document.getElementById(
                            "loginUser"
                        );


                    if (loginUser) {

                        loginUser.value =
                            cliente.usuario ||
                            cliente.correo;

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


                    const usuarioOCorreo =
                        document
                            .getElementById(
                                "loginUser"
                            )
                            .value
                            .trim();


                    const password =
                        document
                            .getElementById(
                                "loginPassword"
                            )
                            .value;


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


                    const cliente =
                        Cliente.iniciarSesion(

                            usuarioOCorreo,

                            password

                        );


                    // =================================
                    // LOGIN CORRECTO
                    // =================================

                    if (cliente) {


                        sessionStorage.removeItem(
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


                        localStorage.setItem(
                            "isLoggedIn",
                            "true"
                        );


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
                    // LOGIN INCORRECTO
                    // =================================

                    intentos++;


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


            button.style.opacity =
                "0.6";


            button.style.cursor =
                "not-allowed";

        }


    }
);