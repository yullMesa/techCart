import ResenaService from '../services/ResenaService.js';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
class ProductDetailView {
 constructor(productsView,router){this.productsView=productsView;this.router=router;this.dialog=null;}
 init(){
  this.dialog=document.createElement('dialog');this.dialog.className='tech-detail-dialog';this.dialog.setAttribute('aria-label','Detalles del producto');document.body.appendChild(this.dialog);
  document.addEventListener('click',e=>{
   const b=e.target.closest('[data-product-details]');if(b){this.open(b.dataset.productDetails);return;}
   if(e.target.closest('[data-close-product-detail]')){this.close();return;}
   if(e.target.closest('[data-detail-cart]')){const id=Number(e.target.closest('[data-detail-cart]').dataset.detailCart);this.productsView.agregarAlCarrito(id);this.close();return;}
   if(e.target.closest('[data-detail-compare]')){const id=e.target.closest('[data-detail-compare]').dataset.detailCompare;this.close();document.querySelector(`[data-compare-product="${id}"]`)?.click();return;}
   if(e.target.closest('[data-detail-review]')){const id=e.target.closest('[data-detail-review]').dataset.detailReview;this.close();document.querySelector(`[data-review-product="${id}"]`)?.click();}
  });
  this.dialog.addEventListener('click',e=>{if(e.target===this.dialog)this.close();});
 }
 open(id){
  const p=this.productsView.productos.find(x=>String(x.idProducto)===String(id));if(!p)return;
  const info=p.mostrarInfo?.()||p;const r=ResenaService.resumen(p.idProducto);
  const specs=p.tipo==='laptop'?[['Procesador',p.procesador],['Memoria RAM',p.memoriaRAM],['Almacenamiento',p.almacenamiento]]:p.tipo==='smartphone'?[['Sistema operativo',p.sistemaOperativo],['Pantalla',p.pantalla],['Cámara',p.camara]]:[['Tipo de accesorio',p.tipoAccesorio]];
  this.dialog.innerHTML=`<div class="tech-detail-head"><h2>${esc(info.nombre)}</h2><button type="button" data-close-product-detail aria-label="Cerrar detalles">✕</button></div>
   <div class="tech-detail-body"><div class="tech-detail-image"><img src="${esc(p.imagen)}" alt="${esc(p.nombre)}" onerror="this.style.display='none'"></div><div class="tech-detail-info"><p>${esc(p.descripcion)}</p><strong class="tech-detail-price">${new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(p.precio)}</strong><p>⭐ ${r.cantidad?r.promedio.toFixed(1):'Sin calificaciones'} (${r.cantidad} reseñas)</p><p>Disponibles: ${esc(p.stock)} unidad(es)</p><h3>Especificaciones</h3><dl>${specs.map(([k,v])=>`<div><dt>${esc(k)}</dt><dd>${esc(v||'No especificado')}</dd></div>`).join('')}</dl><div class="tech-detail-actions"><button type="button" data-detail-cart="${esc(p.idProducto)}" ${Number(p.stock)<=0?'disabled':''}>🛒 Agregar al carrito</button><button type="button" data-detail-compare="${esc(p.idProducto)}">⚖️ Comparar</button><button type="button" data-detail-review="${esc(p.idProducto)}">⭐ Reseñas</button></div></div></div>`;
  if(!this.dialog.open)this.dialog.showModal();
 }
 close(){if(this.dialog?.open)this.dialog.close();}
}
export default ProductDetailView;
