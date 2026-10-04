import Laptop
    from "../models/Laptop.js";

import Smartphone
    from "../models/Smartphone.js";

import Accesorio
    from "../models/Accesorio.js";


class ProductService {

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
                .map(producto =>
                    this.crearProducto(producto)
                )
                .filter(producto =>
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


    static crearProducto(data) {

        switch (
            data.tipo.toLowerCase()
            ) {


            case "laptop":

                return new Laptop(

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


            case "smartphone":

                return new Smartphone(

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


            case "accesorio":

                return new Accesorio(

                    data.idProducto,
                    data.nombre,
                    data.descripcion,
                    data.precio,
                    data.stock,
                    data.imagen,
                    data.tipoAccesorio

                );


            default:

                console.warn(
                    "Tipo de producto desconocido:",
                    data.tipo
                );

                return null;

        }

    }

}


export default ProductService;