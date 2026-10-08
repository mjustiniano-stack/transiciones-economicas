import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from "react-leaflet";
import L from "leaflet";
import { countriesData, exUSSRInfluenceArea, CountryData } from "./data/countries";
import "leaflet/dist/leaflet.css";

// Fix para los iconos de Leaflet con Vite
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Crear iconos personalizados por color
function createCustomIcon(color: string) {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      background-color: ${color};
      width: 28px;
      height: 28px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: transform 0.2s;
      cursor: pointer;
    "><div style="
      width: 10px;
      height: 10px;
      background: white;
      border-radius: 50%;
    "></div></div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -18],
  });
}

function FlyToCountry({ country }: { country: CountryData | null }) {
  const map = useMap();
  if (country) {
    map.flyTo(country.coordinates, 5, { duration: 1.5 });
  }
  return null;
}

function InfoPanel({ country, onClose }: { country: CountryData; onClose: () => void }) {
  return (
    <div className="absolute top-4 right-4 z-[1000] w-[400px] max-h-[calc(100vh-2rem)] overflow-y-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100">
      <div
        className="sticky top-0 text-white p-5 rounded-t-2xl"
        style={{ background: `linear-gradient(135deg, ${country.color}, ${country.color}dd)` }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{country.name}</h2>
            <p className="text-sm text-white/80 mt-1">📅 Período: {country.period}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors text-2xl leading-none p-1 hover:bg-white/20 rounded-lg"
          >
            ×
          </button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        <div>
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-5 h-0.5 rounded" style={{ backgroundColor: country.color }}></span>
            Características Clave de la Transición
          </h3>
          <ul className="space-y-3">
            {country.characteristics.map((char, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                <span
                  className="mt-2 w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: country.color }}
                ></span>
                <span>{char}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-gray-100 pt-5">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-5 h-0.5 bg-gray-300 rounded"></span>
            Obras Históricas y Económicas Fundamentales
          </h3>
          <ul className="space-y-3">
            {country.works.map((work, idx) => (
              <li
                key={idx}
                className="text-sm text-gray-600 italic pl-4 border-l-2 py-1"
                style={{ borderColor: `${country.color}40` }}
              >
                {work}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="absolute bottom-6 left-4 z-[1000] bg-white/95 backdrop-blur-md rounded-xl shadow-lg p-4 border border-gray-100">
      <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-3">Leyenda</h4>
      <div className="space-y-2">
        {countriesData.map((country) => (
          <div key={country.id} className="flex items-center gap-2.5">
            <div
              className="w-3.5 h-3.5 rounded-full border-2 border-white shadow-sm"
              style={{ backgroundColor: country.color }}
            ></div>
            <span className="text-xs text-gray-600">{country.name}</span>
          </div>
        ))}
        <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-gray-100">
          <div className="w-5 h-3 rounded-sm border-2 border-dashed border-red-700 bg-red-100/50"></div>
          <span className="text-xs text-gray-600">Área de influencia ex-URSS</span>
        </div>
      </div>
    </div>
  );
}

function CountryList({
  onSelect,
  selectedId,
}: {
  onSelect: (country: CountryData) => void;
  selectedId: string | null;
}) {
  return (
    <div className="absolute top-20 left-4 z-[1000] bg-white/95 backdrop-blur-md rounded-xl shadow-lg border border-gray-100 w-[240px] max-h-[calc(100vh-12rem)] overflow-y-auto">
      <div className="p-3 border-b border-gray-100">
        <h4 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
          Países / Regiones
        </h4>
      </div>
      <div className="p-2">
        {countriesData.map((country) => (
          <button
            key={country.id}
            onClick={() => onSelect(country)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 hover:bg-gray-50 ${
              selectedId === country.id ? "bg-gray-100 shadow-sm" : ""
            }`}
          >
            <span
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: country.color }}
            ></span>
            <div>
              <span className="font-medium text-gray-800 block text-xs">{country.name}</span>
              <span className="text-[10px] text-gray-400">{country.period}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);

  const handleSelectCountry = (country: CountryData) => {
    setSelectedCountry(country);
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[999] bg-gradient-to-b from-gray-900/80 via-gray-900/40 to-transparent pointer-events-none">
        <div className="px-6 py-4">
          <h1 className="text-white text-xl md:text-2xl font-bold tracking-tight flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            Transiciones Económicas Post-Socialistas
          </h1>
          <p className="text-gray-300 text-xs md:text-sm mt-1 max-w-xl">
            Mapa interactivo de las reformas de transición del socialismo al capitalismo.
            Haz clic en los marcadores o en la lista para explorar cada caso.
          </p>
        </div>
      </div>

      {/* Mapa */}
      <MapContainer
        center={[48, 30]}
        zoom={3}
        className="w-full h-full"
        minZoom={2}
        maxZoom={10}
        worldCopyJump={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Área de influencia de la ex URSS */}
        <Polygon
          positions={exUSSRInfluenceArea}
          pathOptions={{
            color: "#991b1b",
            weight: 2,
            fillColor: "#fecaca",
            fillOpacity: 0.1,
            dashArray: "10, 6",
          }}
        />

        {/* Marcadores de países */}
        {countriesData.map((country) => (
          <Marker
            key={country.id}
            position={country.coordinates}
            icon={createCustomIcon(country.color)}
            eventHandlers={{
              click: () => handleSelectCountry(country),
            }}
          >
            <Popup>
              <div className="min-w-[180px]">
                <h3 className="font-bold text-base text-gray-800">{country.name}</h3>
                <p className="text-xs text-gray-500 mb-2">📅 {country.period}</p>
                <button
                  onClick={() => handleSelectCountry(country)}
                  className="text-xs text-white px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: country.color }}
                >
                  Ver detalles completos →
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        <FlyToCountry country={selectedCountry} />
      </MapContainer>

      {/* Lista de países */}
      <CountryList onSelect={handleSelectCountry} selectedId={selectedCountry?.id ?? null} />

      {/* Panel de información */}
      {selectedCountry && (
        <div className="info-panel-enter">
          <InfoPanel country={selectedCountry} onClose={() => setSelectedCountry(null)} />
        </div>
      )}

      {/* Leyenda */}
      <Legend />
    </div>
  );
}
