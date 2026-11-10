class ComparadorService {
    static atributos(producto) {
        const comunes = {
            'Precio (COP)': new Intl.NumberFormat('es-CO', {style:'currency',currency:'COP',maximumFractionDigits:0}).format(producto.precio),
            'Disponibilidad': Number(producto.stock) > 0 ? `${producto.stock} unidades` : 'Agotado'
        };
        if (producto.tipo === 'laptop') return {...comunes, 'Procesador': producto.procesador, 'Memoria RAM': producto.memoriaRAM, 'Almacenamiento': producto.almacenamiento};
        if (producto.tipo === 'smartphone') return {...comunes, 'Sistema operativo': producto.sistemaOperativo, 'Pantalla': producto.pantalla, 'Cámara': producto.camara};
        return {...comunes, 'Tipo de accesorio': producto.tipoAccesorio};
    }
    static filas(productos) {
        const atributos = productos.map(p => this.atributos(p));
        return [...new Set(atributos.flatMap(a => Object.keys(a)))].map(etiqueta => ({etiqueta, valores: atributos.map(a => a[etiqueta] ?? 'No especificado')}));
    }
}
export default ComparadorService;
