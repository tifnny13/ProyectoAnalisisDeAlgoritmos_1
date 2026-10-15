/**
 * Array con las coordenadas de las calles en el eje X
 */
const calles = [80, 170, 260, 350, 440];

// Coloca cada parada sobre la intersección más cercana
/**
 * Calcula las coordenadas de cada parada en la ruta, colocándola sobre la intersección más cercana
 * @param {Array<{id: string|number, x: number, y: number}>} ruta Lista de paradas
 * @returns {Array<Object>} Lista de paradas con coordenadas según la intersección más cercana
 */
export function calcularCoordenadasRuta(ruta) {
/**
   * Encuentra el valor de calle más cercano a una posición dada
   * @param {number} posicion  Posición en píxeles en el lienzo
   * @returns {number} Coordenada de la calle más cercana
   */
  function calleCercana(posicion) {
    return calles.reduce((cercana, calle) => {
      return Math.abs(calle - posicion) < Math.abs(cercana - posicion)
        ? calle
        : cercana;
    });
  }

  return ruta.map((parada) => {
    const posicionX = 35 + (parada.x / 100) * 430;
    const posicionY = 465 - (parada.y / 100) * 430;

    return {
      ...parada,
      posicionX: calleCercana(posicionX),
      posicionY: calleCercana(posicionY)
    };
  });
}

// Construye un recorrido usando únicamente las calles
/**
 * Calcula el camino por las calles entre las paradas
 * @param {Array<{id: string|number, posicionX: number, posicionY: number}>} coordenadas Lista de coordenadas de las paradas
 * @returns {Array<{x: number, y: number, id: string|number}>} Lista de puntos del camino por calles
 */
export function calcularCaminoPorCalles(coordenadas) {
  const camino = [];


  if (coordenadas.length === 0) {
    return camino;
  }

  camino.push({ // Agrega la primera parada al camino
    x: coordenadas[0].posicionX,
    y: coordenadas[0].posicionY,
    id: coordenadas[0].id
  });

  coordenadas.forEach((parada, index) => {  // Recorre cada parada para calcular el camino hacia ella
    if (index === 0) {
      return;
    }

    const anterior = coordenadas[index - 1];
    const xInicio = calles.indexOf(anterior.posicionX);
    const xFinal = calles.indexOf(parada.posicionX);
    const yInicio = calles.indexOf(anterior.posicionY);
    const yFinal = calles.indexOf(parada.posicionY);

    // Avanza horizontalmente por la calle
    const pasoX = xFinal >= xInicio ? 1 : -1;

    for (let i = xInicio + pasoX;
      xInicio !== xFinal && (pasoX === 1 ? i <= xFinal : i >= xFinal);
      i += pasoX) {
      camino.push({
        x: calles[i],
        y: anterior.posicionY,
        id: ''
      });
    }

    // Después gira y avanza verticalmente
    const pasoY = yFinal >= yInicio ? 1 : -1;

    for (let i = yInicio + pasoY;
      yInicio !== yFinal && (pasoY === 1 ? i <= yFinal : i >= yFinal);
      i += pasoY) {
      camino.push({
        x: parada.posicionX,
        y: calles[i],
        id: ''
      });
    }

    // Identifica la parada de destino
    const ultimo = camino[camino.length - 1];

    if (ultimo.x === parada.posicionX && ultimo.y === parada.posicionY) { // Si la última posición coincide con la parada, asigna el id de la parada
      ultimo.id = parada.id;
    } else {
      camino.push({ 
        x: parada.posicionX,
        y: parada.posicionY,
        id: parada.id
      });
    }
  });

  return camino;
}

/**
 * Agrupa las paradas por su ubicación en el mapa
 * @param {Array<{id: string|number, posicionX: number, posicionY: number}>} coordenadas Lista de coordenadas de las paradas
 * @returns {Array<{posicionX: number, posicionY: number, pedidos: Array<{id: string|number, posicionX: number, posicionY: number}>}>} Lista de grupos de paradas
 */
export function agruparParadas(coordenadas) {
  const grupos = [];

  coordenadas.forEach((parada) => {
    let grupoEncontrado = null;

    grupos.forEach((grupo) => {
      if (
        grupo.posicionX === parada.posicionX &&
        grupo.posicionY === parada.posicionY
      ) {
        grupoEncontrado = grupo;
      }
    });

    if (grupoEncontrado) {
      grupoEncontrado.pedidos.push(parada);
    } else {
      grupos.push({
        posicionX: parada.posicionX,
        posicionY: parada.posicionY,
        pedidos: [parada]
      });
    }
  });

  return grupos;
}
