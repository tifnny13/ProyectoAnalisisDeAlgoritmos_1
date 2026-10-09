export function problemaMochila(pedidos, capacidad) { //.map crea una nueva lista segun la funcion que se le pase
    const pedidosConGanancia = pedidos.map(pedido => ({
        ...pedido, //copiar y pegar los valores del pedido original
        gananciaPorPeso: pedido.ganancia / pedido.peso
    })); //Realiza el calculo de la ganancia segun el peso y lo guarda en un nuevo array

    let pedidosPorOrdenPeso = pedidosConGanancia.sort((a, b) => b.gananciaPorPeso - a.gananciaPorPeso);

    let pedidosEscogidos = [];
    let pesoActual = 0;
    let gananciaTotal = 0;
    let operaciones = 0;

    for (const pedido of pedidosPorOrdenPeso) {
        operaciones++;
        if (pesoActual + pedido.peso <= capacidad) { 
            pedidosEscogidos.push(pedido);
            pesoActual += pedido.peso;
            gananciaTotal += pedido.ganancia;
        }
    }

    return { pedidosEscogidos, pesoActual, gananciaTotal, operaciones };
}