import ComparadorProductos from '../models/ComparadorProductos.js';
import ComparadorService from '../services/ComparadorService.js';
import StorageService from '../services/StorageService.js';
const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
class ComparadorView {
    constructor(router, productsView) {
        this.router = router;
        this.productsView = productsView;
        this.comparador = new ComparadorProductos();
        this.tipoActual = 'laptop';
        this.busqueda = '';
    }
    init() {
        this.container = document.getElementById('comparisonContent');
        if (!this.container) return;
        document.addEventListener('click', e => {
            const desdeCatalogo = e.target.closest('[data-compare-product]');
            if (desdeCatalogo) {
                const p=this.obtener(desdeCatalogo.dataset.compareProduct);
                if (!p) return;
                if (this.comparador.productos.length && this.comparador.productos[0].tipo !== p.tipo) {
                    this.comparador.limpiar();
                }
                this.tipoActual=p.tipo;
                this.agregar(p);
                this.router.show('comparador');
                return;
            }
            const tipo=e.target.closest('[data-comparison-category]');
            if (tipo && this.container.contains(tipo)) {
                const siguiente=tipo.dataset.comparisonCategory;
                if (siguiente!==this.tipoActual) {this.comparador.limpiar();this.busqueda='';}
                this.tipoActual=siguiente;
                this.render();return;
            }
            const agregar=e.target.closest('[data-comparison-add]');
            if (agregar && this.container.contains(agregar)) {this.agregar(this.obtener(agregar.dataset.comparisonAdd));return;}
            const comprar=e.target.closest('[data-compare-cart]');
            if (comprar && this.container.contains(comprar)) {this.agregarCarrito(comprar.dataset.compareCart);return;}
            const quitar=e.target.closest('[data-compare-remove]');
            if (quitar && this.container.contains(quitar)) {this.comparador.quitar(quitar.dataset.compareRemove);this.render();return;}
            if (e.target.closest('[data-compare-clear]') && this.container.contains(e.target)) {this.comparador.limpiar();this.render();}
        });
        this.container.addEventListener('input',e=>{
            if (e.target.matches('[data-comparison-search]')) {
                this.busqueda=e.target.value;
                this.renderOpciones();
            }
        });
        this.render();
    }
    obtener(id) {return this.productsView.productos.find(p=>String(p.idProducto)===String(id));}
    agregar(p) {
        try {this.comparador.agregar(p);this.tipoActual=p.tipo;this.render();}
        catch(error) {if(window.Swal) Swal.fire({icon:'info',text:error.message,confirmButtonColor:'#0875ec'});else alert(error.message);}
    }
    agregarCarrito(id) {
        const p = this.obtener(id);
        if (!p) return;
        const stock = Number(p.stock);
        if (!Number.isFinite(stock) || stock < 1) {
            this.notificar('Este producto no tiene unidades disponibles.', 'warning');
            return;
        }
        const carrito = StorageService.getCart();
        const item = carrito.find(x => String(x.producto?.idProducto) === String(p.idProducto));
        if (item) {
            if (Number(item.cantidad) >= stock) {
                this.notificar('Ya tienes el máximo de unidades disponibles en el carrito.', 'warning');
                return;
            }
            item.cantidad = Number(item.cantidad) + 1;
        } else {
            carrito.push({
                producto: {
                    idProducto: p.idProducto,
                    nombre: p.nombre,
                    descripcion: p.descripcion,
                    precio: Number(p.precio),
                    stock: stock,
                    imagen: p.imagen,
                    categoria: p.categoria
                },
                cantidad: 1
            });
        }
        StorageService.saveCart(carrito);
        window.dispatchEvent(new CustomEvent('cart-updated'));
        const cantidad = carrito.reduce((n, x) => n + Number(x.cantidad || 0), 0);
        ['sidebarCartCount', 'topbarCartCount', 'dashboardCartCount'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.textContent = cantidad;
        });
        this.notificar(`${p.nombre} se agregó al carrito.`, 'success');
    }
    notificar(mensaje, icon='success') {
        if (window.Swal) window.Swal.fire({icon, text:mensaje, timer:1700, showConfirmButton:false});
        else alert(mensaje);
    }
    tipos() {
        const nombres={laptop:'Laptops',smartphone:'Smartphones',accesorio:'Accesorios y otros'};
        return [...new Set(this.productsView.productos.map(p=>p.tipo))].map(tipo=>({tipo,nombre:nombres[tipo]||tipo,cantidad:this.productsView.productos.filter(p=>p.tipo===tipo).length}));
    }
    render() {
        if(!this.container)return;
        const tipos=this.tipos();
        if (!tipos.some(t=>t.tipo===this.tipoActual))this.tipoActual=tipos[0]?.tipo;
        const ps=this.comparador.productos;
        this.container.innerHTML=`
          <div class="comparison-workspace">
            <div class="comparison-picker">
              <div class="comparison-heading"><h3>1. Selecciona una categoría</h3><p>Elige los productos aquí mismo, sin volver al catálogo.</p></div>
              <div class="comparison-categories" role="group" aria-label="Tipos de producto">
                ${tipos.map(t=>`<button type="button" data-comparison-category="${esc(t.tipo)}" class="comparison-category ${t.tipo===this.tipoActual?'is-active':''}" aria-pressed="${t.tipo===this.tipoActual}">${esc(t.nombre)} <span>${t.cantidad}</span></button>`).join('')}
              </div>
              <div class="comparison-pick-heading"><div><h3>2. Elige hasta 3 productos</h3><p>${ps.length} de 3 seleccionados</p></div><label class="comparison-search-label"><span class="sr-only">Buscar productos</span><input type="search" data-comparison-search placeholder="Buscar por nombre o características..." value="${esc(this.busqueda)}"></label></div>
              <div id="comparisonOptions" class="comparison-options"></div>
            </div>
            <div class="comparison-results">
              <div class="comparison-results-heading"><div><h3>3. Comparación técnica</h3><p>${ps.length<2?'Selecciona al menos dos productos para comparar.':'Diferencias entre los productos seleccionados'}</p></div><button type="button" data-compare-clear ${ps.length?'':'disabled'}>Limpiar selección</button></div>
              ${ps.length ? this.tabla(ps) : '<div class="compare-empty">Selecciona dos o tres productos de arriba para ver sus diferencias aquí.</div>'}
            </div>
          </div>`;
        this.renderOpciones();
    }
    renderOpciones() {
        const destino=this.container?.querySelector('#comparisonOptions');if(!destino)return;
        const normalizar=s=>String(s??'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
        const buscar=normalizar(this.busqueda.trim());
        const productos=this.productsView.productos.filter(p=>p.tipo===this.tipoActual && normalizar([p.nombre,p.descripcion,p.procesador,p.memoriaRAM,p.almacenamiento,p.pantalla,p.camara,p.tipoAccesorio].join(' ')).includes(buscar));
        const seleccionados=new Set(this.comparador.productos.map(p=>String(p.idProducto)));
        destino.innerHTML=productos.length?productos.map(p=>{
          const isSelected=seleccionados.has(String(p.idProducto));
          const disabled=isSelected||seleccionados.size>=3;
          return `<article class="comparison-option"><img src="${esc(p.imagen)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'"><div class="comparison-option-details"><strong>${esc(p.nombre)}</strong><small>${esc(p.mostrarInfo?.().especificaciones||p.descripcion)}</small><b>${new Intl.NumberFormat('es-CO',{style:'currency',currency:'COP',maximumFractionDigits:0}).format(p.precio)}</b></div><button type="button" data-comparison-add="${esc(p.idProducto)}" ${disabled?'disabled':''}>${isSelected?'✓ Seleccionado':seleccionados.size>=3?'Máximo 3':'+ Agregar'}</button></article>`;
        }).join(''):'<p class="comparison-no-results">No hay productos con esa búsqueda.</p>';
    }
    tabla(ps) {
      const filas=ComparadorService.filas(ps);
      return `<div class="compare-scroll"><table class="compare-table"><thead><tr><th>Característica</th>${ps.map(p=>`<th><div class="comparison-table-product"><img src="${esc(p.imagen)}" alt="" onerror="this.style.display='none'"><span>${esc(p.nombre)}</span><button type="button" data-compare-remove="${esc(p.idProducto)}" aria-label="Quitar ${esc(p.nombre)}">✕</button></div></th>`).join('')}</tr></thead><tbody>${filas.map(f=>`<tr><th>${esc(f.etiqueta)}</th>${f.valores.map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}<tr class="compare-cart-row"><th>Tu elección</th>${ps.map(p=>`<td><button type="button" class="compare-add-cart" data-compare-cart="${esc(p.idProducto)}" ${Number(p.stock)<=0?'disabled':''}>🛒 ${Number(p.stock)<=0?'Agotado':'Agregar al carrito'}</button></td>`).join('')}</tr></tbody></table></div>`;
    }
}
export default ComparadorView;
