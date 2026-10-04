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
                                    6. Modificación de datos
                                </h3>

                                <p>
                                    El usuario podrá modificar sus datos
                                    personales después de verificar su
                                    contraseña actual.
                                </p>


                                <h3>
                                    7. Almacenamiento
                                </h3>

                                <p>
                                    La información de esta aplicación
                                    académica se almacena localmente
                                    mediante LocalStorage en el navegador.
                                </p>


                                <h3>
                                    8. Aceptación
                                </h3>

                                <p>
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


                    const acceptedTerms =
                        document
                            .getElementById(
                                "acceptTerms"
                            )
                            .checked;


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


                    if (
                        !emailRegex.test(correo)
                    ) {

                        await Swal.fire({

                            icon:
                                "warning",

                            title:
                                "Correo no válido",

                            text:
                                "Ingresa una dirección de correo válida.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }


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

                        });


                        return;

                    }


                    // =================================
                    // CONFIRMAR CONTRASEÑA
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
                                "Verifica nuevamente las contraseñas ingresadas.",

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
                                "Debes aceptar los términos y condiciones y la política de privacidad para crear tu cuenta.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }


                    // =================================
                    // VERIFICAR USUARIO DUPLICADO
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
                    // VERIFICAR CORREO DUPLICADO
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
                                "Ya existe una cuenta asociada a ese correo electrónico.",

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


                    // =================================
                    // GUARDAR CLIENTE
                    // =================================

                    nuevoCliente.registrar();


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

                    });


                    window.location.href =
                        "login.html";

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


                    // =================================
                    // MÁXIMO DE INTENTOS
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
                                "Has alcanzado el máximo de 3 intentos permitidos durante esta sesión.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }


                    // =================================
                    // OBTENER DATOS
                    // =================================

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


                    // =================================
                    // VALIDAR CAMPOS
                    // =================================

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
                                "Ingresa tu usuario o correo y tu contraseña.",

                            confirmButtonColor:
                            COLOR_PRINCIPAL

                        });


                        return;

                    }


                    // =================================
                    // AUTENTICAR
                    // =================================

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
                                "Has iniciado sesión correctamente.",

                            timer:
                                1500,

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
                                `Usuario, correo o contraseña incorrectos. Te quedan ${restantes} intento(s).`,

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
                                "Máximo de intentos alcanzado",

                            text:
                                "Has realizado 3 intentos fallidos. El acceso quedó bloqueado durante esta sesión.",

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