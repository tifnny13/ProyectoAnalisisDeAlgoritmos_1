/**
 * Muestra la pantalla de estadísticas con los resultados del camión
 * 
 * @param {Object} props  Datos que recibe el componente
 * @param {number} props.pedidosProcesados  Total de pedidos en bodega
 * @param {number} props.pedidosSeleccionados  Pedidos que entraron en el camión
 * @param {number} props.capacidad  Capacidad máxima del camión 
 * @param {number} props.pesoActual  Peso total cargado 
 * @param {number} props.gananciaTotal  Dinero total ganado
 * @param {number} props.tiempoEjecucion  Tiempo que tardó el cálculo en ms
 * @param {number} props.operaciones Operaciones que hizo el algoritmo
 * @param {Function} props.onVolver  Acción para volver hacia atrás
 * @returns {JSX.Element} La pantalla con las tarjetas de estadísticas
 */
function Estadisticas({ pedidosProcesados, pedidosSeleccionados, capacidad, pesoActual, gananciaTotal, tiempoEjecucion, operaciones, onVolver }) {
    const porcentajeOcupacion = (pesoActual / capacidad) * 100;
    return ( 
        <div className ="contenedor"> 
            <h1 className="Titulo-proyecto">Estadísticas de la Carga</h1>
            <div className="card">

        <p>
          <strong>Ocupación del Camión:</strong> {porcentajeOcupacion.toFixed(1)}%
        </p>
        <div className="grid-estadisticas">
          <div className="tarjeta-metrica">
            <span className="metrica-etiqueta">Pedidos Procesados</span>
            <span className="metrica-valor">{pedidosProcesados}</span>
          </div>

          <div className="tarjeta-metrica">
            <span className="metrica-etiqueta">Pedidos Seleccionados</span>
            <span className="metrica-valor">{pedidosSeleccionados}</span>
          </div>

          <div className="tarjeta-metrica">
            <span className="metrica-etiqueta">Capacidad Total</span>
            <span className="metrica-valor">{capacidad} kg</span>
          </div>

          <div className="tarjeta-metrica">
            <span className="metrica-etiqueta">Peso Utilizado</span>
            <span className="metrica-valor">{pesoActual} kg</span>
          </div>

          <div className="tarjeta-metrica">
            <span className="metrica-etiqueta">Tiempo de Ejecución</span>
            <span className="metrica-valor">{tiempoEjecucion.toFixed(4)} ms</span>
          </div>

          <div className="tarjeta-metrica">
            <span className="metrica-etiqueta">Operaciones Realizadas</span>
            <span className="metrica-valor">{operaciones}</span>
          </div>
        </div>
      </div>

      <button className="btn-primario" onClick={onVolver}>
        Volver a la planificación
      </button>
    
    </div>
  );
}

export default Estadisticas;