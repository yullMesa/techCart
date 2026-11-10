import ResenaService from '../services/ResenaService.js';
import StorageService from '../services/StorageService.js';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
class ReviewsView {
    constructor(router,productsView){this.router=router;this.productsView=productsView;this.idProducto=null;}
    init(){
        this.container=document.getElementById('reviewsContent');if(!this.container)return;
        document.addEventListener('click',e=>{
            const b=e.target.closest('[data-review-product]');
            if(b){this.idProducto=Number(b.dataset.reviewProduct);this.render();this.router.show('resenas');}
        });
        this.container.addEventListener('submit',e=>{
            if(e.target.id!=='reviewForm')return;
            e.preventDefault();
            const sesion=StorageService.getSession()||{};
            const autorId=sesion.correo||sesion.email||sesion.usuario||sesion.username||sesion.id||sesion.idCliente;
            if(!autorId){this.alerta('No se encontró un usuario en la sesión. Inicia sesión nuevamente.',true);return;}
            const fd=new FormData(e.target);
            try{
                ResenaService.guardar({idProducto:this.idProducto,autorId,autor:sesion.nombre||sesion.usuario||'Cliente',estrellas:Number(fd.get('estrellas')),comentario:fd.get('comentario')});
                this.render();this.alerta('Tu calificación se guardó correctamente.');
            }catch(err){this.alerta(err.message,true);}
        });
        this.render();
    }
    alerta(m,error=false){if(window.Swal)Swal.fire({icon:error?'warning':'success',text:m,confirmButtonColor:'#0875ec'});else alert(m);}
    render(){
        if(!this.container)return;
        const p=this.productsView.productos.find(x=>Number(x.idProducto)===this.idProducto);
        if(!p){this.container.innerHTML='<div class="compare-empty">Selecciona un producto del catálogo para consultar o escribir reseñas.</div>';return;}
        const rs=ResenaService.delProducto(p.idProducto),resumen=ResenaService.resumen(p.idProducto);
        const sesion=StorageService.getSession()||{};
        const autorId=String(sesion.correo||sesion.email||sesion.usuario||sesion.username||sesion.id||sesion.idCliente||'');
        const propia=rs.find(r=>String(r.autorId)===autorId);
        this.container.innerHTML=`<div class="reviews-layout">
            <section class="review-panel"><div class="review-product-header"><img src="${esc(p.imagen)}" alt="${esc(p.nombre)}" onerror="this.style.display='none'"><div><h2>${esc(p.nombre)}</h2><div class="review-score"><strong>★ ${resumen.cantidad?resumen.promedio.toFixed(1):'—'}</strong><span>${resumen.cantidad} calificación(es)</span></div></div></div>
                <form id="reviewForm" class="review-form"><h3>${propia?'Actualizar mi reseña':'Comparte tu experiencia'}</h3><p>Califica el producto de una a cinco estrellas.</p>
                <fieldset class="review-star-field"><legend>Tu calificación</legend><div class="review-star-choices">${[1,2,3,4,5].map(n=>`<label><input type="radio" name="estrellas" value="${n}" ${Number(propia?.estrellas||5)===n?'checked':''} required><span>${n} ★</span></label>`).join('')}</div></fieldset>
                <label for="reviewComment">Tu opinión</label><textarea id="reviewComment" name="comentario" required maxlength="500" rows="4" placeholder="Escribe qué te gustó, qué mejorarías y cómo fue tu experiencia...">${esc(propia?.comentario||'')}</textarea>
                <button type="submit" class="primary-button">${propia?'Actualizar calificación':'Publicar reseña'}</button></form></section>
            <section class="review-panel review-list-panel"><h3>Opiniones de clientes (${rs.length})</h3>${rs.length?rs.map(r=>`<article class="review-item"><div class="review-item-top"><strong>${esc(r.autor)}</strong><span>${'★'.repeat(r.estrellas)}${'☆'.repeat(5-r.estrellas)}</span></div><p>${esc(r.comentario)}</p><small>${esc(new Date(r.fecha).toLocaleDateString('es-CO'))}</small></article>`).join(''):'<p class="review-empty">Aún no hay opiniones. Puedes ser la primera persona en calificar este producto.</p>'}</section>
        </div>`;
    }
}
export default ReviewsView;
