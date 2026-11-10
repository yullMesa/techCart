import Resena from '../models/Resena.js';
class ResenaService {
    static KEY = 'techCartResenasV1';
    static todas() {
        try { const d = JSON.parse(localStorage.getItem(this.KEY) || '[]'); return Array.isArray(d) ? d : []; }
        catch { return []; }
    }
    static delProducto(id) { return this.todas().filter(r => Number(r.idProducto) === Number(id)); }
    static resumen(id) {
        const rs = this.delProducto(id);
        return {cantidad:rs.length, promedio:rs.length ? rs.reduce((s,r) => s + Number(r.estrellas),0) / rs.length : 0};
    }
    static guardar(datos) {
        const resena = new Resena(datos);
        const todas = this.todas();
        const indice = todas.findIndex(r => Number(r.idProducto) === resena.idProducto && r.autorId === resena.autorId);
        if (indice < 0) todas.unshift(resena); else todas[indice] = resena;
        localStorage.setItem(this.KEY, JSON.stringify(todas));
        window.dispatchEvent(new CustomEvent('reviews-updated', {detail:{idProducto:resena.idProducto}}));
        return resena;
    }
}
export default ResenaService;
