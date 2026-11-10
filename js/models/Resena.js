class Resena {
    constructor({idProducto, autorId, autor, estrellas, comentario, fecha = new Date().toISOString()}) {
        const calificacion = Number(estrellas);
        if (!Number.isInteger(calificacion) || calificacion < 1 || calificacion > 5) throw new Error('La calificación debe ser de 1 a 5 estrellas.');
        if (!String(comentario || '').trim() || String(comentario).trim().length > 500) throw new Error('El comentario debe contener entre 1 y 500 caracteres.');
        if (!autorId) throw new Error('Debes iniciar sesión para calificar.');
        this.idProducto = Number(idProducto);
        this.autorId = String(autorId);
        this.autor = String(autor || 'Cliente TechCart');
        this.estrellas = calificacion;
        this.comentario = String(comentario).trim();
        this.fecha = fecha;
    }
}
export default Resena;
