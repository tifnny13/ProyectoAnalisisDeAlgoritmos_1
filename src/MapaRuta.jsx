
import { useState, useEffect } from 'react';
import { calcularCoordenadasRuta, calcularCaminoPorCalles, agruparParadas} from './Logica/mapaRuta';

function MapaRuta({ ruta }) {
  const tamaño = 500;

  const [iniciada, setIniciada] = useState(false);
  const [pausada, setPausada] = useState(false);
  const [posicionCamion, setPosicionCamion] = useState(0);

  const coordenadas = calcularCoordenadasRuta(ruta);
  const camino = calcularCaminoPorCalles(coordenadas);
  const gruposParadas = agruparParadas(coordenadas);

  // Mover el camión mientras la ruta esté iniciada
  useEffect(() => {
    if (!iniciada || pausada || camino.length === 0) {
      return;
    }

    const intervalo = setInterval(() => {
      setPosicionCamion((posicionActual) => {
        if (posicionActual >= camino.length - 1) {
          setIniciada(false);
          return posicionActual;
        }

        return posicionActual + 1;
      });
    }, 500);

    return () => clearInterval(intervalo);
  }, [iniciada, pausada, camino.length]);

  const iniciarRuta = () => {
    if (camino.length > 0) {
      setIniciada(true);
      setPausada(false);
    }
  };

  const pausarRuta = () => {
    setPausada(true);
  };

  const reiniciarRuta = () => {
    setIniciada(false);
    setPausada(false);
    setPosicionCamion(0);
  };

  const calles = [80, 170, 260, 350, 440];

  const camion = camino[posicionCamion];

  return (
    <div className="mapa-ruta">
      <div className="controles-ruta">
        <button onClick={iniciarRuta} disabled={iniciada && !pausada}>
          Iniciar ruta
        </button>

        <button onClick={pausarRuta} disabled={!iniciada || pausada}>
          Pausar
        </button>

        <button onClick={reiniciarRuta}>
          Reiniciar
        </button>
      </div>

      <svg
        viewBox={`0 0 ${tamaño} ${tamaño}`}
        width="100%"
        role="img"
        aria-label="Mapa simulado de calles y ruta de entregas"
      >
        <rect
          x="0"
          y="0"
          width={tamaño}
          height={tamaño}
          fill="#e8eee5"
        />

        {/* Manzanas de edificios */}
        {calles.map((posicionX, index) =>
          calles.map((posicionY, segundoIndex) => (
            <rect
              key={`${index}-${segundoIndex}`}
              x={posicionX - 29}
              y={posicionY - 29}
              width="58"
              height="58"
              rx="5"
              fill="#cbd5c0"
              stroke="#b2bea8"
              strokeWidth="1"
            />
          ))
        )}

        {/* Calles verticales */}
        {calles.map((posicion, index) => (
          <g key={`vertical-${index}`}>
            <rect
              x={posicion - 13}
              y="0"
              width="26"
              height={tamaño}
              fill="#ffffff"
            />
            <line
              x1={posicion}
              y1="0"
              x2={posicion}
              y2={tamaño}
              stroke="#d5d5d5"
              strokeWidth="1"
              strokeDasharray="8 8"
            />
          </g>
        ))}

        {/* Calles horizontales */}
        {calles.map((posicion, index) => (
          <g key={`horizontal-${index}`}>
            <rect
              x="0"
              y={posicion - 13}
              width={tamaño}
              height="26"
              fill="#ffffff"
            />
            <line
              x1="0"
              y1={posicion}
              x2={tamaño}
              y2={posicion}
              stroke="#d5d5d5"
              strokeWidth="1"
              strokeDasharray="8 8"
            />
          </g>
        ))}

        {/* Camino que sigue el camión */}
        {camino.map((punto, index) => {
          const siguiente = camino[index + 1];

          if (!siguiente) {
            return null;
          }

          return (
            <line
              key={`camino-${index}`}
              x1={punto.x}
              y1={punto.y}
              x2={siguiente.x}
              y2={siguiente.y}
              stroke="#2563eb"
              strokeWidth="4"
              strokeLinecap="round"
            />
          );
        })}

        
        {/* Paradas agrupadas */}
        {gruposParadas.map((grupo, index) => {
        const contieneBodega = grupo.pedidos.some(
            (parada) => parada.id === 'Bodega'
        );

        return (
                <g key={`grupo-${index}`}>
                    <circle
                        cx={grupo.posicionX}
                        cy={grupo.posicionY}
                        r={grupo.pedidos.length > 1 ? 15 : 9}
                        fill={contieneBodega ? '#dc2626' : '#2563eb'}
                        stroke="#ffffff"
                        strokeWidth="2"
                    />

                    {grupo.pedidos.length > 1 ? (
                        <text
                            x={grupo.posicionX}
                            y={grupo.posicionY + 4}
                            textAnchor="middle"
                            fontSize="12"
                            fontWeight="bold"
                            fill="#ffffff"
                            >
                            {grupo.pedidos.length}
                        </text>
                     ) : (
                        <text
                            x={grupo.posicionX + 12}
                            y={grupo.posicionY - 12}
                            fontSize="12"
                            fontWeight="bold"
                            fill="#1f2937"
                            >
                            {grupo.pedidos[0].id}
                        </text>
                    )}
                </g>
            );
        })}


        {/* Camión */}
        {camion && (
          <g transform={`translate(${camion.x}, ${camion.y})`}>
            <rect
              x="-12"
              y="-8"
              width="20"
              height="13"
              rx="2"
              fill="#f59e0b"
              stroke="#92400e"
              strokeWidth="1"
            />

            <rect
              x="5"
              y="-5"
              width="10"
              height="10"
              rx="2"
              fill="#ea580c"
              stroke="#92400e"
              strokeWidth="1"
            />

            <circle cx="-6" cy="7" r="3" fill="#1f2937" />
            <circle cx="10" cy="7" r="3" fill="#1f2937" />
          </g>
        )}
      </svg>


      <p>
        {iniciada
          ? 'El camión está recorriendo la ruta.'
          : posicionCamion >= camino.length - 1 && camino.length > 0
            ? '¡Ruta completada!'
            : pausada
              ? 'Ruta pausada.'
              : 'Presiona "Iniciar ruta" para comenzar.'}
      </p>
    </div>
  );
}

export default MapaRuta;
