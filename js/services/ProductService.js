import Laptop
    from "../models/Laptop.js";

import Smartphone
    from "../models/Smartphone.js";

import Accesorio
    from "../models/accesorio.js";


class ProductService {

    static async getProductos() {

        try {

            const jsonUrl =
                new URL(
                    "../data/productos.json",
                    import.meta.url
                );


            const response =
                await fetch(
                    jsonUrl,
                    {
                        cache: "no-store"
                    }
                );


            if (!response.ok) {

                throw new Error(
                    `Error HTTP ${response.status}`
                );

            }


            const data =
                await response.json();


            if (!Array.isArray(data)) {

                throw new Error(
                    "productos.json debe contener un arreglo."
                );

            }


            return data
                .map(
                    item =>
                        this.crearProducto(
                            item
                        )
                )
                .filter(Boolean);

        }

        catch (error) {

            console.error(
                "Error cargando productos:",
                error
            );


            return [];

        }

    }


    static crearProducto(
        data
    ) {

        let producto =
            null;


        switch (
            String(data.tipo)
                .toLowerCase()
            ) {

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


            default:

                console.warn(
                    "Tipo desconocido:",
                    data.tipo
                );

                return null;

        }


        /*
         * Estas propiedades son fundamentales
         * para categorías, búsqueda y carrito.
         */

        producto.tipo =
            data.tipo;


        producto.categoria =
            data.categoria;


        producto.imagen =
            data.imagen;


        producto.stock =
            data.stock;


        return producto;

    }

}


export default ProductService;