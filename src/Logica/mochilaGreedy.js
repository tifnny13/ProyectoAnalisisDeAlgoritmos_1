/**
 * Resuelve el problema de la mochila utilizando un enfoque greedy
 * @param {Array<{id: string|number, peso: number, ganancia: number}>} pedidos 
 * @param {number} capacidad 
 * @returns {Object} Resultado con los pedidos escogidos y las estadísticas
 */
export function problemaMochila(pedidos, capacidad) {
    let operaciones = 0;

    // Calcular la ganancia por peso de cada pedido
    const pedidosConGanancia = pedidos.map(pedido => {
        operaciones++; // Contar la división

        return {
            ...pedido,
            gananciaPorPeso: pedido.ganancia / pedido.peso
        };
    });

    // Ordenar los pedidos según su ganancia por peso
    let pedidosPorOrdenPeso = pedidosConGanancia.sort((a, b) => {
        operaciones++; // Contar cada comparación del ordenamiento
        return b.gananciaPorPeso - a.gananciaPorPeso;
    });

    let pedidosEscogidos = [];
    let pesoActual = 0;
    let gananciaTotal = 0;

    // Revisar los pedidos para seleccionar los que caben
    for (const pedido of pedidosPorOrdenPeso) {
        operaciones++; // Contar la comprobación de capacidad

        if (pesoActual + pedido.peso <= capacidad) {
            pedidosEscogidos.push(pedido);
            operaciones++; // Contar la selección del pedido

            pesoActual += pedido.peso;
            operaciones++; // Contar la actualización del peso

            gananciaTotal += pedido.ganancia;
            operaciones++; // Contar la actualización de la ganancia
        }
    }

    return {
        pedidosEscogidos,
        pesoActual,
        gananciaTotal,
        operaciones
    };
}
