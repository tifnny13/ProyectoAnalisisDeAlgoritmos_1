function Estadisticas({ pedidosProcesados, pedidosSeleccionados, capacidad, pesoActual, gananciaTotal, tiempoEjecucion, operaciones, onVolver }) {
    const porcentajeOcupacion = (pesoActual / capacidad) * 100;
    return ( 
        <div>
            <h1>Estadísticas de la carga</h1>
            <p>
                <strong>Pedidos procesados:</strong> {pedidosProcesados}
            </p>

            <p>
                <strong>Pedidos seleccionados:</strong> {pedidosSeleccionados}
            </p>

            <p>
                <strong>Capacidad del vehículo:</strong> {capacidad} kg 
            </p>

            <p>
                <strong>Peso utilizado:</strong> {pesoActual} kg
            </p>

            <p>
                <strong>Ocupación de la capacidad:</strong> {porcentajeOcupacion.toFixed(2)}% 
            </p> 

            <p>
                <strong>Ganancia total:</strong> ${gananciaTotal}
            </p>

            <p>
                <strong>Tiempo de ejecución:</strong> {tiempoEjecucion.toFixed(4)} ms
            </p>

            <p>
                <strong>Operaciones realizadas:</strong> {operaciones}
            </p>

            <button onClick={onVolver}> Volver a pedidos </button>
        </div>
  );
}

export default Estadisticas;