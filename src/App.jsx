import { useState } from 'react';
import { pedidosPrueba, generarPedidos } from './Logica/pedidos'; //Importa desde Logica los pedidos
import {problemaMochila} from './Logica/mochilaGreedy';
import Estadisticas from './Estadisticas';

function App() {
  const [capacidadMochila, setCapacidadMochila] = useState(50); // guarda y nos permite cambiar el valor 
  const [pedidos, setPedidos] = useState(pedidosPrueba);
  const [cantidadPedidos, setCantidadPedidos] = useState(10);
  const [mostrarEstadisticas, setMostrarEstadisticas] = useState(false);

  const inicio = performance.now();

  const resultado = problemaMochila(pedidos, capacidadMochila);

  const fin = performance.now(); //tiempo actual

  const tiempoEjecucion = fin - inicio; 

  const { pedidosEscogidos, pesoActual, gananciaTotal, operaciones } = resultado;  //Algoritmo voraz 

  return (
    <>
      {mostrarEstadisticas ? (
        <Estadisticas 
          pedidosProcesados={pedidos.length}
          pedidosSeleccionados={pedidosEscogidos.length}
          capacidad={capacidadMochila}
          pesoActual={pesoActual}
          gananciaTotal={gananciaTotal}
          tiempoEjecucion={tiempoEjecucion}
          operaciones={operaciones}
          onVolver={() => setMostrarEstadisticas(false)}onChange
        />
      ) : (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
          <h1>Planificación de Cargas y Ruteo</h1>

          <label>
            Capacidad del vehículo: <input type="number" value={capacidadMochila} onChange={(e) => setCapacidadMochila(Number(e.target.value))}/> kg
          </label>

          <label>
            Cantidad de pedidos:<input type="number" value={cantidadPedidos} onChange={(e) => setCantidadPedidos(Number(e.target.value))} />
          </label>

          <br />

          <button onClick={() => setPedidos(generarPedidos(cantidadPedidos))}>
            Generar pedidos aleatorios
          </button>
          
          {/* 1. TABLA DISPONIBLES */}
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
              {pedidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.peso} kg</td>
                  <td>${pedido.ganancia}</td>
                  <td>({pedido.x}, {pedido.y})</td>
                </tr>
              ))}
            </tbody>

          </table>

          {/* 2. TABLA SELECCIONADOS */}
          <h2>Pedidos Seleccionados para el Camión</h2>
            <p>
              <strong>Capacidad Máxima:</strong> {capacidadMochila} kg |{' '}
              <strong>Peso Actual:</strong> {pesoActual} kg |{' '}
              <strong>Ganancia Total:</strong> ${gananciaTotal}
            </p>

          <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#d4edda', color: '#155724' }}>
                <th>ID</th>
                <th>Peso</th>
                <th>Ganancia</th>
                <th>Ganancia / Peso</th>
              </tr>
            </thead>
            <tbody>
              {pedidosEscogidos.map((pedido) => (
                <tr key={pedido.id}>
                  <td>{pedido.id}</td>
                  <td>{pedido.peso} kg</td>
                  <td>${pedido.ganancia}</td>
                  <td>${pedido.gananciaPorPeso.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button onClick={() => setMostrarEstadisticas(true)}>
            Ver estadísticas
          </button>
        </div>
      )}
    </>
  );

}
export default App;
