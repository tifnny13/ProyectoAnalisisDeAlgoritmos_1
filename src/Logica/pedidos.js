export const pedidosPrueba = [
  { id: "Pedido1", peso: 20, ganancia: 60, x: 10, y: 20 },
  { id: "Pedido2", peso: 30, ganancia: 90, x: 30, y: 40 },
  { id: "Pedido3", peso: 10, ganancia: 40, x: 50, y: 10 },
  { id: "Pedido4", peso: 40, ganancia: 70, x: 80, y: 70 },
];

export function generarPedidos(cantidad){
  let pedidos = []; 

  for (let i = 1; i <= cantidad; i++){
    let peso = Math.floor(Math.random() * 40) + 10;
    let ganancia = Math.floor(Math.random() * 100) + 20;
    let x = Math.floor(Math.random() * 100);
    let y = Math.floor(Math.random() * 100);

    pedidos.push ({id : "Pedido" + i, peso: peso, ganancia: ganancia, x: x, y: y});
  }

  return pedidos
}