import './App.css';
import { useState } from 'react';
import { pedidosPrueba, generarPedidos } from './Logica/pedidos'; //Importa desde Logica los pedidos
import {problemaMochila} from './Logica/mochilaGreedy';
import Estadisticas from './Estadisticas';
import {vecinoMasCercano } from './Logica/ruteoGreedy';
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

  const { ruta, distanciaTotal } = vecinoMasCercano(pedidosEscogidos);
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
          onVolver={() => setMostrarEstadisticas(false)}
        />
      ) : (
        <div className="contenedor"> 
          <h1 className = "Titulo-proyecto">Planificacion de cargas y ruteo</h1>

          {/*1.PANEL DE CONFIGURACION */}
          <div className="panel-configuracion">
            <div className="campo">
              <label>Capacidad del vehiculo (Kg):</label>
              <input
                type="number"
                value={capacidadMochila}
                onChange={(e) => setCapacidadMochila(Number(e.target.value))}
              />
            </div>

          <div className="campo">
            <label>Cantidad de pedidos:</label>
            <input
              type="number"
              value={cantidadPedidos}
              onChange={(e) => setCantidadPedidos(Number(e.target.value))}
            />

          </div>

          <button
            className="btn-primario"
            onClick={() => setPedidos(generarPedidos(cantidadPedidos))}
          >
            Generar pedidos aleatorios
          </button>
        </div>

          {/* 2. TABLA DISPONIBLES EN BODEGA */}
          <div className="card">
            <h2>Pedidos Disponibles en Bodega</h2>
            <div className="tabla-wrapper">
              <table className="tabla-De-Datos">
                <thead>
                  <tr className="tabla-De-Datos-Encabezado">
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
            </div>
          </div>

          {/* 3. TABLA SELECCIONADOS */}
          <div className="card">
            <h2>Pedidos Seleccionados para el Camión</h2>
            <p>
              <strong>Capacidad Máxima:</strong> {capacidadMochila} kg |{' '}
              <strong>Peso Actual:</strong> {pesoActual} kg |{' '}
              <strong>Ganancia Total:</strong> ${gananciaTotal}
            </p>

          <div className="tabla-wrapper">

              <table className="tabla-De-Datos">  
                <thead>
                  <tr className="tabla-De-Datos-Encabezado">
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
        </div>
      </div>
      {/* 4. RUTA DE ENTREGA */}
          <div className="card">
            <h2>Ruta de Entrega </h2>
            <p>
              <strong>Distancia Total de la Ruta:</strong> {distanciaTotal ?? 0} km
            </p>

            <div className="ruta-contenedor">
              {ruta && ruta.length > 0 && ruta.map((parada, index) => ( 
                <div key={index} className="ruta-paso">
                  <span className={parada.id === 'Bodega' ? 'parada-bodega' : 'parada-pedido'}>
                    {parada.id} ({parada.x}, {parada.y})
                  </span>
                  {index < ruta.length - 1 && (
                    <span className="indicador-direccion">➔</span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <button 
            className="btn-primario"
            onClick={() => setMostrarEstadisticas(true)}>
            Ver estadísticas
          </button>
        </div>
      )}
    </>
  );

}
export default App;
