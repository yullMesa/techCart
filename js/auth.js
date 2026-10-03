document.addEventListener("DOMContentLoaded", () => {


    // =========================================
    // CLASE CLIENTE
    // =========================================

    class Cliente {

        constructor(
            id,
            nombre,
            correo,
            direccionEnvio,
            usuario,
            password
        ) {

            this.id = id;
            this.nombre = nombre;
            this.correo = correo;
            this.direccionEnvio = direccionEnvio;
            this.usuario = usuario;
            this.password = password;

        }


        // =====================================
        // REGISTRAR
        // =====================================

        registrar() {

            const clientes =
                Cliente.obtenerClientes();


            clientes.push(this);


            localStorage.setItem(
                "techCartClientes",
                JSON.stringify(clientes)
            );

        }


        // =====================================
        // INICIAR SESIÓN
        // =====================================

        static iniciarSesion(usuarioOCorreo, password) {

            const clientes =
                Cliente.obtenerClientes();


            return clientes.find((cliente) => {

                const coincideUsuario =
                    cliente.usuario.toLowerCase() ===
                    usuarioOCorreo.toLowerCase();


                const coincideCorreo =
                    cliente.correo.toLowerCase() ===
                    usuarioOCorreo.toLowerCase();


                const coincidePassword =
                    cliente.password === password;


                return (
                    (coincideUsuario || coincideCorreo)
                    &&
                    coincidePassword
                );

            });

        }


        // =====================================
        // MODIFICAR DATOS
        // =====================================

        static modificarDatos(idCliente, nuevosDatos) {

            const clientes =
                Cliente.obtenerClientes();


            const index =
                clientes.findIndex(
                    cliente =>
                        cliente.id === idCliente
                );


            if (index === -1) {

                return false;

            }


            clientes[index] = {

                ...clientes[index],

                ...nuevosDatos

            };


            localStorage.setItem(
                "techCartClientes",
                JSON.stringify(clientes)
            );


            return true;

        }


        // =====================================
        // OBTENER CLIENTES
        // =====================================

        static obtenerClientes() {

            const datos =
                localStorage.getItem(
                    "techCartClientes"
                );


            return datos
                ? JSON.parse(datos)
                : [];

        }

    }



    // =========================================
    // MOSTRAR / OCULTAR CONTRASEÑA
    // =========================================

    const passwordButtons =
        document.querySelectorAll(
            ".toggle-password"
        );


    passwordButtons.forEach((button) => {


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


                if (input.type === "password") {

                    input.type = "text";

                    button.textContent = "🙈";

                }

                else {

                    input.type = "password";

                    button.textContent = "👁";

                }


            }
        );


    });



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
            (event) => {


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



                // =================================
                // VALIDAR CAMPOS
                // =================================

                if (
                    !nombre ||
                    !usuario ||
                    !correo ||
                    !direccion ||
                    !password
                ) {


                    Swal.fire({

                        icon: "warning",

                        title:
                            "Completa todos los campos",

                        text:
                            "Todos los datos son obligatorios.",

                        confirmButtonColor:
                            "#0875ec"

                    });


                    return;

                }



                // =================================
                // VALIDAR CONTRASEÑAS
                // =================================

                if (
                    password !== confirmation
                ) {


                    Swal.fire({

                        icon: "error",

                        title:
                            "Las contraseñas no coinciden",

                        text:
                            "Verifica nuevamente las contraseñas.",

                        confirmButtonColor:
                            "#0875ec"

                    });


                    return;

                }



                // =================================
                // LONGITUD DE CONTRASEÑA
                // =================================

                if (password.length < 6) {


                    Swal.fire({

                        icon: "warning",

                        title:
                            "Contraseña muy corta",

                        text:
                            "La contraseña debe tener al menos 6 caracteres.",

                        confirmButtonColor:
                            "#0875ec"

                    });


                    return;

                }



                // =================================
                // VERIFICAR DUPLICADOS
                // =================================

                const clientes =
                    Cliente.obtenerClientes();


                const usuarioExiste =
                    clientes.some(
                        cliente =>
                            cliente.usuario
                                .toLowerCase()
                            ===
                            usuario.toLowerCase()
                    );


                const correoExiste =
                    clientes.some(
                        cliente =>
                            cliente.correo
                                .toLowerCase()
                            ===
                            correo.toLowerCase()
                    );



                if (usuarioExiste) {


                    Swal.fire({

                        icon: "error",

                        title:
                            "Usuario no disponible",

                        text:
                            "Ese nombre de usuario ya está registrado.",

                        confirmButtonColor:
                            "#0875ec"

                    });


                    return;

                }



                if (correoExiste) {


                    Swal.fire({

                        icon: "error",

                        title:
                            "Correo registrado",

                        text:
                            "Ya existe una cuenta asociada a ese correo.",

                        confirmButtonColor:
                            "#0875ec"

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

                        password

                    );



                // =================================
                // GUARDAR
                // =================================

                nuevoCliente.registrar();



                // =================================
                // MENSAJE
                // =================================

                Swal.fire({

                    icon: "success",

                    title:
                        "¡Cuenta creada!",

                    text:
                        `Bienvenido a TechCart, ${nombre}. Ahora puedes iniciar sesión.`,

                    confirmButtonText:
                        "Iniciar sesión",

                    confirmButtonColor:
                        "#0875ec"

                }).then(() => {


                    window.location.href =
                        "login.html";


                });


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


        // =====================================
        // INTENTOS FALLIDOS
        // =====================================

        let intentos =
            Number(
                sessionStorage.getItem(
                    "techCartLoginAttempts"
                )
            ) || 0;



        loginForm.addEventListener(
            "submit",
            (event) => {


                event.preventDefault();



                // =================================
                // VERIFICAR INTENTOS
                // =================================

                if (intentos >= 3) {


                    Swal.fire({

                        icon: "error",

                        title:
                            "Acceso bloqueado",

                        text:
                            "Has alcanzado el máximo de 3 intentos permitidos.",

                        confirmButtonColor:
                            "#0875ec"

                    });


                    return;

                }



                // =================================
                // DATOS LOGIN
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



                if (
                    !usuarioOCorreo ||
                    !password
                ) {


                    Swal.fire({

                        icon: "warning",

                        title:
                            "Completa los campos",

                        text:
                            "Ingresa tu usuario o correo y contraseña.",

                        confirmButtonColor:
                            "#0875ec"

                    });


                    return;

                }



                // =================================
                // VALIDAR CLIENTE
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


                    // Reiniciar intentos

                    sessionStorage.removeItem(
                        "techCartLoginAttempts"
                    );



                    // Guardar sesión

                    const sesion = {

                        id: cliente.id,

                        nombre: cliente.nombre,

                        usuario: cliente.usuario,

                        correo: cliente.correo,

                        direccionEnvio:
                        cliente.direccionEnvio,

                        loginTime:
                            new Date().toISOString()

                    };


                    localStorage.setItem(
                        "techCartSesion",
                        JSON.stringify(sesion)
                    );


                    localStorage.setItem(
                        "isLoggedIn",
                        "true"
                    );



                    Swal.fire({

                        icon: "success",

                        title:
                            `¡Bienvenido, ${cliente.nombre}!`,

                        text:
                            "Has iniciado sesión correctamente.",

                        timer: 1700,

                        showConfirmButton:
                            false

                    }).then(() => {


                        window.location.href =
                            "../panel/index.html";


                    });


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



                if (restantes > 0) {


                    Swal.fire({

                        icon: "error",

                        title:
                            "Credenciales incorrectas",

                        text:
                            `Usuario, correo o contraseña incorrectos. Te quedan ${restantes} intento(s).`,

                        confirmButtonColor:
                            "#0875ec"

                    });


                }

                else {


                    Swal.fire({

                        icon: "error",

                        title:
                            "Máximo de intentos alcanzado",

                        text:
                            "Has realizado 3 intentos fallidos. El acceso ha sido bloqueado durante esta sesión.",

                        confirmButtonColor:
                            "#0875ec"

                    });


                    const submitButton =
                        loginForm.querySelector(
                            ".auth-submit"
                        );


                    if (submitButton) {

                        submitButton.disabled =
                            true;


                        submitButton.textContent =
                            "Acceso bloqueado";


                        submitButton.style.opacity =
                            "0.6";


                        submitButton.style.cursor =
                            "not-allowed";

                    }


                }


            }
        );


    }


});