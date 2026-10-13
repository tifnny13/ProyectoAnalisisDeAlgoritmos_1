
const calles = [80, 170, 260, 350, 440];

// Coloca cada parada sobre la intersección más cercana
export function calcularCoordenadasRuta(ruta) {
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
export function calcularCaminoPorCalles(coordenadas) {
  const camino = [];

  if (coordenadas.length === 0) {
    return camino;
  }

  camino.push({
    x: coordenadas[0].posicionX,
    y: coordenadas[0].posicionY,
    id: coordenadas[0].id
  });

  coordenadas.forEach((parada, index) => {
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

    if (ultimo.x === parada.posicionX && ultimo.y === parada.posicionY) {
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
