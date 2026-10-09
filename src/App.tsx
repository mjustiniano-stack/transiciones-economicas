import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap } from "react-leaflet";
import L from "leaflet";
import {
  countriesData,
  ussr1989,
  warsawPact1989,
  yugoslavia1989,
  postSovietStates1991,
  germany1991,
  yugoslavia1991,
  CountryData,
} from "./data/countries";
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

// Crear iconos personalizados por color - MÁS GRANDES Y VISIBLES
function createCustomIcon(color: string) {
  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div style="
        position: relative;
        width: 36px;
        height: 36px;
      ">
        <div style="
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
          border-left: 8px solid transparent;
          border-right: 8px solid transparent;
          border-top: 12px solid ${color};
        "></div>
        <div style="
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 28px;
          height: 28px;
          background-color: ${color};
          border-radius: 50% 50% 50% 0;
          transform: translateX(-50%) rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 3px 10px rgba(0,0,0,0.5);
        ">
          <div style="
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(45deg);
            width: 10px;
            height: 10px;
            background: white;
            border-radius: 50%;
          "></div>
        </div>
      </div>
    `,
    iconSize: [36, 44],
    iconAnchor: [18, 44],
    popupAnchor: [0, -44],
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
    <div className="info-panel-enter absolute top-20 right-4 z-[1000] w-[400px] max-h-[calc(100vh-6rem)] overflow-y-auto bg-white rounded-2xl shadow-2xl border-2 border-gray-200">
      <div
        className="sticky top-0 text-white p-5 rounded-t-2xl z-10"
        style={{ background: `linear-gradient(135deg, ${country.color}, ${country.color}dd)` }}
      >
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{country.name}</h2>
            <p className="text-sm text-white/90 mt-1">📅 Período: {country.period}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/30 transition-colors text-3xl leading-none p-1 rounded-lg w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>
      </div>

      <div className="p-5 space-y-5">
        <div>
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-5 h-1 rounded" style={{ backgroundColor: country.color }}></span>
            Características Clave de la Transición
          </h3>
          <ul className="space-y-3">
            {country.characteristics.map((char, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                <span
                  className="mt-2 w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: country.color }}
                ></span>
                <span>{char}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t-2 border-gray-100 pt-5">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <span className="w-5 h-1 bg-gray-300 rounded"></span>
            Obras Históricas y Económicas Fundamentales
          </h3>
          <ul className="space-y-3">
            {country.works.map((work, idx) => (
              <li
                key={idx}
                className="text-sm text-gray-600 italic pl-4 border-l-4 py-1"
                style={{ borderColor: `${country.color}60` }}
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

function Legend({ selectedMoment }: { selectedMoment: "1989" | "1991" }) {
  return (
    <div className="absolute bottom-6 left-4 z-[1000] bg-white rounded-xl shadow-lg p-4 border-2 border-gray-200 max-w-[280px]">
      <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">
        🗺️ Leyenda - {selectedMoment}
      </h4>
      <div className="space-y-2">
        {countriesData.map((country) => (
          <div key={country.id} className="flex items-center gap-2.5">
            <div
              className="w-4 h-4 rounded-full border-2 border-white shadow-md"
              style={{ backgroundColor: country.color }}
            ></div>
            <span className="text-xs text-gray-700 font-medium">{country.name}</span>
          </div>
        ))}
        <div className="mt-3 pt-3 border-t-2 border-gray-100 space-y-2">
          {selectedMoment === "1989" ? (
            <>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-3 rounded-sm border-2 border-dashed border-red-600 bg-red-200/50"></div>
                <span className="text-xs text-gray-700 font-medium">URSS (15 repúblicas)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-3 rounded-sm border-2 border-dashed border-red-900 bg-red-300/40"></div>
                <span className="text-xs text-gray-700 font-medium">Pacto de Varsovia</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-3 rounded-sm border-2 border-dashed border-orange-600 bg-orange-200/40"></div>
                <span className="text-xs text-gray-700 font-medium">Yugoslavia (no alineada)</span>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-3 rounded-sm border-2 border-dashed border-red-600 bg-red-200/50"></div>
                <span className="text-xs text-gray-700 font-medium">Estados post-soviéticos</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-3 rounded-sm border-2 border-dashed border-blue-600 bg-blue-200/40"></div>
                <span className="text-xs text-gray-700 font-medium">Alemania reunificada</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-3 rounded-sm border-2 border-dashed border-orange-600 bg-orange-200/40"></div>
                <span className="text-xs text-gray-700 font-medium">Yugoslavia (en desintegración)</span>
              </div>
            </>
          )}
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
    <div className="absolute top-20 left-4 z-[1000] bg-white rounded-xl shadow-lg border-2 border-gray-200 w-[260px]">
      <div className="p-3 border-b-2 border-gray-100 bg-gray-50 rounded-t-xl">
        <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider">
          📍 Países / Regiones
        </h4>
        <p className="text-[10px] text-gray-500 mt-1">Haz clic para ver detalles</p>
      </div>
      <div className="p-2">
        {countriesData.map((country) => (
          <button
            key={country.id}
            onClick={() => onSelect(country)}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-all flex items-center gap-3 hover:bg-gray-100 ${
              selectedId === country.id ? "bg-gray-100 shadow-inner" : ""
            }`}
          >
            <span
              className="w-4 h-4 rounded-full flex-shrink-0 border-2 border-white shadow"
              style={{ backgroundColor: country.color }}
            ></span>
            <div>
              <span className="font-semibold text-gray-800 block text-xs">{country.name}</span>
              <span className="text-[10px] text-gray-500">{country.period}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function MomentSelector({
  selectedMoment,
  onMomentChange,
}: {
  selectedMoment: "1989" | "1991";
  onMomentChange: (moment: "1989" | "1991") => void;
}) {
  return (
    <div className="absolute top-20 right-4 z-[1000] bg-white rounded-xl shadow-lg border-2 border-gray-200 p-4">
      <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">
        📅 Momento Histórico
      </h4>
      <div className="flex gap-2">
        <button
          onClick={() => onMomentChange("1989")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            selectedMoment === "1989"
              ? "bg-red-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          1989
        </button>
        <button
          onClick={() => onMomentChange("1991")}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            selectedMoment === "1991"
              ? "bg-blue-600 text-white shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          1991
        </button>
      </div>
      <p className="text-[10px] text-gray-500 mt-2 leading-tight">
        {selectedMoment === "1989"
          ? "URSS intacta, Pacto de Varsovia activo"
          : "Disolución de la URSS, Alemania reunificada"}
      </p>
    </div>
  );
}

export default function App() {
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(null);
  const [selectedMoment, setSelectedMoment] = useState<"1989" | "1991">("1989");

  const handleSelectCountry = (country: CountryData) => {
    setSelectedCountry(country);
  };

  return (
    <div className="w-full h-screen relative overflow-hidden bg-gray-100">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-[999] bg-gradient-to-b from-gray-900/90 via-gray-900/60 to-transparent pointer-events-none">
        <div className="px-6 py-4">
          <h1 className="text-white text-xl md:text-2xl font-bold tracking-tight flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            Transiciones de economías planificadas a economías de mercado
          </h1>
          <p className="text-gray-200 text-xs md:text-sm mt-1 max-w-xl">
            Mapa interactivo de las reformas de transición del socialismo al capitalismo
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
        style={{ height: "100vh", width: "100%" }}
      >
        {/* Usar Esri World Street Map - texto en inglés legible */}
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
        />

        {/* Renderizar polígonos según el momento seleccionado */}
        {selectedMoment === "1989" ? (
          <>
            {/* URSS 1989 */}
            <Polygon
              positions={ussr1989}
              pathOptions={{
                color: "#dc2626",
                weight: 2.5,
                fillColor: "#fecaca",
                fillOpacity: 0.2,
                dashArray: "8, 4",
              }}
            />

            {/* Pacto de Varsovia 1989 */}
            {warsawPact1989.map((polygon, idx) => (
              <Polygon
                key={`warsaw-${idx}`}
                positions={polygon}
                pathOptions={{
                  color: "#991b1b",
                  weight: 2,
                  fillColor: "#fca5a5",
                  fillOpacity: 0.15,
                  dashArray: "6, 3",
                }}
              />
            ))}

            {/* Yugoslavia 1989 (no alineada) */}
            <Polygon
              positions={yugoslavia1989}
              pathOptions={{
                color: "#ea580c",
                weight: 2,
                fillColor: "#fed7aa",
                fillOpacity: 0.15,
                dashArray: "6, 3",
              }}
            />
          </>
        ) : (
          <>
            {/* Estados post-soviéticos 1991 */}
            {postSovietStates1991.map((polygon, idx) => (
              <Polygon
                key={`post-soviet-${idx}`}
                positions={polygon}
                pathOptions={{
                  color: "#dc2626",
                  weight: 2,
                  fillColor: "#fecaca",
                  fillOpacity: 0.15,
                  dashArray: "6, 3",
                }}
              />
            ))}

            {/* Alemania reunificada 1991 */}
            <Polygon
              positions={germany1991}
              pathOptions={{
                color: "#2563eb",
                weight: 2,
                fillColor: "#bfdbfe",
                fillOpacity: 0.2,
                dashArray: "6, 3",
              }}
            />

            {/* Yugoslavia en desintegración 1991 */}
            <Polygon
              positions={yugoslavia1991}
              pathOptions={{
                color: "#ea580c",
                weight: 2,
                fillColor: "#fed7aa",
                fillOpacity: 0.15,
                dashArray: "6, 3",
              }}
            />
          </>
        )}

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
              <div style={{ minWidth: "200px" }}>
                <h3 className="font-bold text-base text-gray-800 mb-1">{country.name}</h3>
                <p className="text-xs text-gray-500 mb-3">📅 {country.period}</p>
                <button
                  onClick={() => handleSelectCountry(country)}
                  className="text-xs text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity font-semibold"
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

      {/* Selector de momento histórico */}
      <MomentSelector selectedMoment={selectedMoment} onMomentChange={setSelectedMoment} />

      {/* Panel de información */}
      {selectedCountry && (
        <div className="info-panel-enter">
          <InfoPanel country={selectedCountry} onClose={() => setSelectedCountry(null)} />
        </div>
      )}

      {/* Leyenda */}
      <Legend selectedMoment={selectedMoment} />
    </div>
  );
}
