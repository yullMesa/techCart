class ComparadorProductos {
    constructor() { this.productos = []; }
    agregar(producto) {
        if (!producto?.idProducto) throw new Error('Producto inválido.');
        if (this.productos.some(p => String(p.idProducto) === String(producto.idProducto))) return false;
        if (this.productos.length >= 3) throw new Error('Puedes comparar máximo 3 productos.');
        if (this.productos.length && this.productos[0].tipo !== producto.tipo) {
            throw new Error('Selecciona productos del mismo tipo para una comparación útil.');
        }
        this.productos.push(producto);
        return true;
    }
    quitar(id) { this.productos = this.productos.filter(p => String(p.idProducto) !== String(id)); }
    limpiar() { this.productos = []; }
}
export default ComparadorProductos;
