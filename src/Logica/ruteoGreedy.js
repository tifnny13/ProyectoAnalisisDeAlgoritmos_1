/**
 * Calcula la distancia euclidiana entre dos puntos de entrega.
 * @param {Object} pedido1 - Primer punto con coordenadas
 * @param {number} pedido1.x - Posición en el eje X del primer punto
 * @param {number} pedido1.y - Posición en el eje Y del primer punto
 * @param {Object} pedido2 - Segundo punto con coordenadas
 * @param {number} pedido2.x - Posición en el eje X del segundo punto
 * @param {number} pedido2.y - Posición en el eje Y del segundo punto
 * @returns {number} La distancia euclidiana entre ambos puntos
 */

function calcularDistancia(pedido1, pedido2) {
    const dx = pedido1.x - pedido2.x;
    const dy = pedido1.y - pedido2.y;
    return Math.sqrt(dx * dx + dy * dy); //Distancia Euclidiana eleva al cuadrado cada distancia, lo suma y saca raiz con Math.sqrt
  }

/**
 * Determina una ruta aproximada de entrega iniciando en la bodega continuamente entregando los pedidos y al final regresando a la bodega, utilizando el método del vecino más cercano. 
 
 
 * @param {Array<Object>} [pedidos=[]] - Lista de pedidos seleccionados para la entrega
 * @param {string|number} pedidos[].id - Identificador único del pedido
 * @param {number} pedidos[].x - Coordenada X de entrega
 * @param {number} pedidos[].y - Coordenada Y de entrega
 * @returns {{ ruta: Array<Object>, distanciaTotal: number }} Objeto que contiene la lista ordenada de paradas y la distancia total recorrida
 */
export function vecinoMasCercano(pedidos=[]){
    if (pedidos.length === 0) {
        return { ruta: [], distanciaTotal: 0 };

    }

const pedidosPendientes = [...pedidos];
const bodega = { id: 'Bodega', x: 0, y: 0 }; // Coordenadas de la bodega
const ruta = [bodega]; //Inicia en bodega
let rutaActual = bodega;
let distanciaTotal = 0;

  while (pedidosPendientes.length > 0) {
    let indiceMasCercano = 0;
    let menorDistancia = calcularDistancia(rutaActual, pedidosPendientes[0]);
    
    //Recorre los pedidos pendientes para encontrar el más cercano a la ruta actual
    for (let i = 1; i < pedidosPendientes.length; i++) {
      const distancia = calcularDistancia(rutaActual, pedidosPendientes[i]); 
      if (distancia < menorDistancia) {
        menorDistancia = distancia;
        indiceMasCercano = i;
      }
    }

    const siguienteLugar = pedidosPendientes.splice(indiceMasCercano, 1)[0]; //Elimina el pedido más cercano de la lista de pendientes y lo asigna a siguienteLugar
    ruta.push(siguienteLugar); //Agrega el pedido más cercano a la ruta
    distanciaTotal += menorDistancia;
    rutaActual = siguienteLugar;

  }

  //Volver a bodega al final de la ruta

  const regresoABodega = calcularDistancia(rutaActual, bodega);
  distanciaTotal += regresoABodega;
  ruta.push(bodega);

return { ruta, distanciaTotal: Number(distanciaTotal.toFixed(2)) };
}