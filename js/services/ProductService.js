import Laptop
    from "../models/Laptop.js";

import Smartphone
    from "../models/Smartphone.js";

import Accesorio
    from "../models/Accesorio.js";


class ProductService {


    // =========================================
    // OBTENER TODOS LOS PRODUCTOS
    // =========================================

    static async getProductos() {

        try {

            const jsonUrl =
                new URL(
                    "../data/productos.json",
                    import.meta.url
                );


            const response =
                await fetch(jsonUrl);


            if (!response.ok) {

                throw new Error(
                    `Error HTTP: ${response.status}`
                );

            }


            const data =
                await response.json();


            return data
                .map(
                    producto =>
                        this.crearProducto(
                            producto
                        )
                )
                .filter(
                    producto =>
                        producto !== null
                );

        }

        catch (error) {

            console.error(
                "Error cargando productos:",
                error
            );


            return [];

        }

    }


    // =========================================
    // CREAR OBJETO PRODUCTO
    // =========================================

    static crearProducto(data) {

        if (
            !data ||
            !data.tipo
        ) {

            console.warn(
                "Producto inválido:",
                data
            );


            return null;

        }


        let producto =
            null;


        switch (
            data.tipo
                .toLowerCase()
            ) {


            // =================================
            // LAPTOP
            // =================================

            case "laptop":

                producto =
                    new Laptop(

                        data.idProducto,

                        data.nombre,

                        data.descripcion,

                        data.precio,

                        data.stock,

                        data.imagen,

                        data.procesador,

                        data.memoriaRAM,

                        data.almacenamiento

                    );

                break;


            // =================================
            // SMARTPHONE
            // =================================

            case "smartphone":

                producto =
                    new Smartphone(

                        data.idProducto,

                        data.nombre,

                        data.descripcion,

                        data.precio,

                        data.stock,

                        data.imagen,

                        data.sistemaOperativo,

                        data.pantalla,

                        data.camara

                    );

                break;


            // =================================
            // ACCESORIO
            // =================================

            case "accesorio":

                producto =
                    new Accesorio(

                        data.idProducto,

                        data.nombre,

                        data.descripcion,

                        data.precio,

                        data.stock,

                        data.imagen,

                        data.tipoAccesorio

                    );

                break;


            // =================================
            // DESCONOCIDO
            // =================================

            default:

                console.warn(
                    "Tipo de producto desconocido:",
                    data.tipo
                );


                return null;

        }


        // =========================================
        // DATOS COMUNES ADICIONALES
        // =========================================

        producto.categoria =
            data.categoria || "";


        /*
         Guardamos también el tipo original.
         Esto puede servir después para filtros,
         búsqueda o depuración.
        */

        producto.tipo =
            data.tipo;


        return producto;

    }


    // =========================================
    // OBTENER PRODUCTOS POR CATEGORÍA
    // =========================================

    static async getProductosPorCategoria(
        categoria
    ) {

        const productos =
            await this.getProductos();


        if (!categoria) {

            return productos;

        }


        const categoriaBuscada =
            String(categoria)
                .trim()
                .toLowerCase();


        return productos.filter(
            producto =>

                String(
                    producto.categoria || ""
                )
                    .trim()
                    .toLowerCase() ===
                categoriaBuscada
        );

    }


    // =========================================
    // BUSCAR PRODUCTOS
    // =========================================

    static async buscarProductos(
        termino
    ) {

        const productos =
            await this.getProductos();


        const busqueda =
            String(
                termino || ""
            )
                .trim()
                .toLowerCase();


        if (!busqueda) {

            return productos;

        }


        return productos.filter(
            producto => {


                const contenido = [

                    producto.nombre,

                    producto.descripcion,

                    producto.categoria,

                    producto.tipo,

                    producto.procesador,

                    producto.memoriaRAM,

                    producto.almacenamiento,

                    producto.sistemaOperativo,

                    producto.pantalla,

                    producto.camara,

                    producto.tipoAccesorio

                ]
                    .filter(Boolean)
                    .join(" ")
                    .toLowerCase();


                return contenido.includes(
                    busqueda
                );

            }
        );

    }

}


export default ProductService;