function calcularDistancia(pedido1, pedido2) {
    const dx = pedido1.x - pedido2.x;
    const dy = pedido1.y - pedido2.y;
    return Math.sqrt(dx * dx + dy * dy); //Distancia Euclidiana eleva al cuadrado cada distancia, lo suma y saca raiz con Math.sqrt
  }
export function vecinoMasCercano(pedidos){
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

    const siguienteLugar = pedidosPendientes.splice(indiceMasCercano, 1)[0];
    ruta.push(siguienteLugar);
    distanciaTotal += menorDistancia;
    rutaActual = siguienteLugar;

  }

  //Volver a bodega al final de la ruta

  const regresoABodega = calcularDistancia(rutaActual, bodega);
  distanciaTotal += regresoABodega;
  ruta.push(bodega);

return { ruta, distanciaTotal };
}