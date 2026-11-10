// Tarifas académicas ficticias, no son cotizaciones de transportadoras.
class EnvioService {
 static destinos(){return [
  {id:'medellin',nombre:'Medellín y área metropolitana',base:9000,dias:2},
  {id:'bogota',nombre:'Bogotá',base:15000,dias:3},
  {id:'cali',nombre:'Cali',base:16500,dias:4},
  {id:'barranquilla',nombre:'Barranquilla',base:21000,dias:5},
  {id:'resto',nombre:'Otras ciudades de Colombia',base:26000,dias:6}
 ];}
 static calcular(subtotal,destinoId,modalidad='estandar'){
  const destino=this.destinos().find(d=>d.id===destinoId);
  if(!destino)throw new Error('Selecciona un destino válido.');
  if(!['estandar','expres'].includes(modalidad))throw new Error('Modalidad no válida.');
  const productos=Number(subtotal);
  if(!Number.isFinite(productos)||productos<0)throw new Error('Subtotal inválido.');
  const costoEnvio= modalidad==='expres' ? Math.round(destino.base*1.8) : destino.base;
  const diasEstimados=modalidad==='expres'?Math.max(1,destino.dias-2):destino.dias;
  return {destino:destino.nombre,destinoId,modalidad,costoEnvio,subtotal:productos,total:productos+costoEnvio,diasEstimados,simulado:true};
 }
}
export default EnvioService;
