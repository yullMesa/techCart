# TechCart 🛒⚡
> Más que un carrito de compras: un puente entre la teoría de la Programación Orientada a Objetos y las soluciones web modernas, dinámicas y centradas en la experiencia de usuario.

---

## 👨‍💻 Autor
* **Yull Sebastián Mesa Tangarife** (Desarrollador Principal)

---

## 🎯 El Propósito y la Intención del Proyecto
**TechCart** nació con una misión clara: **romper la barrera de los típicos ejemplos estáticos y académicos**, construyendo una aplicación web que se comporte como un producto real de software. 

La intención principal de este desarrollo es demostrar cómo los fundamentos de la ingeniería de software —como la modularidad, la reutilización de código mediante POO y la gestión inteligente del estado del lado del cliente— pueden unirse para crear interfaces fluidas, seguras y robustas sin depender inicialmente de un servidor backend complejo. Es un espacio de experimentación donde cada línea de código busca aplicar buenas prácticas, escalabilidad y un diseño limpio pensado tanto para el rendimiento técnico como para la usabilidad humana.

---

## 📋 Descripción General
**TechCart** es una SPA (Single Page Application) interactiva que simula la experiencia integral de un marketplace tecnológico enfocado en dispositivos y accesorios de alta gama[cite: 3, 22]. Permite gestionar un ciclo de vida completo de usuario: desde un registro seguro y autenticación con validaciones estrictas, hasta la exploración dinámica de un catálogo, gestión de carrito y procesamiento de órdenes[cite: 5, 6, 22, 25].

---

## ✨ Características Principales y Alcance
* **Autenticación y Seguridad:** Registro de usuarios, inicio de sesión protegido con límite de 3 intentos fallidos y gestión de perfiles seguros (requiere contraseña actual para modificar datos)[cite: 5, 6, 25].
* **Catálogo Dinámico con POO:** Carga de productos desde un archivo externo `productos.json` transformados en instancias de clases mediante herencia y polimorfismo[cite: 29, 30, 31].
* **Carrito de Compras Persistente:** Agregar, modificar cantidades, eliminar artículos y recalcular totales en tiempo real sincronizado con `LocalStorage`[cite: 5, 6, 22, 26].
* **Generación de Órdenes:** Creación de un resumen detallado de compra con fecha, productos asociados y estado[cite: 6, 22].
* **Navegación SPA (Single Page Application):** Router interno que dinamiza el cambio de vistas sin recargar el navegador[cite: 27].
* **TechBot (Asistente Virtual):** Chatbot flotante integrado para guiar al usuario y resolver dudas frecuentes sobre envíos, pagos y navegación[cite: 6, 22, 37].
* **Diseño Responsive:** Adaptabilidad fluida para escritorios, tablets y dispositivos móviles mediante layouts flexibles y media queries[cite: 3, 14, 38].

---

## 🏛️ Arquitectura del Software
El proyecto está estructurado de forma modular en capas para garantizar un bajo acoplamiento y una alta cohesión[cite: 8, 28]:

```text
📁 techcart/
│
├── 📁 css/                 # Estilos modulares (auth.css, panel.css, style.css)[cite: 39]
├── 📁 data/                # Catálogo externo (productos.json)[cite: 31, 39]
├── 📁 img/                 # Recursos gráficos y multimedia[cite: 39]
├── 📁 models/              # Clases de dominio POO (Cliente, Producto, Laptop, Smartphone, Accesorio, CarritoCompra, Orden)[cite: 39]
├── 📁 panel/               # Vistas de la SPA, Router, Sidebar y Chatbot (TechBot)[cite: 39]
├── 📁 services/            # Servicios de negocio, autenticación y persistencia (AuthService, ClienteService, ProductService, StorageService)[cite: 31, 39]
└── 📄 index.html / app.js  # Punto de entrada de la aplicación[cite: 39]
