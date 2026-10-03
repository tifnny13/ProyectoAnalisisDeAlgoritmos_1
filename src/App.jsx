import { pedidosPrueba } from './Logica/pedidos'; //Importa desde Logica los pedidos

function App() {
  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Planificación de Cargas y Ruteo</h1>
      
      <h2>Pedidos Disponibles en Bodega</h2>

      <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#eee' }}>
            <th>ID</th>
            <th>Peso</th>
            <th>Ganancia</th>
            <th>Coordenadas</th>
          </tr>
        </thead>
        <tbody>
          {pedidosPrueba.map((pedido) => (
            <tr key={pedido.id}>
              <td>{pedido.id}</td>
              <td>{pedido.peso} kg</td>
              <td>${pedido.ganancia}</td>
              <td>({pedido.x}, {pedido.y})</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
