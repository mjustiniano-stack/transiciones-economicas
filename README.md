# 🌍 Transiciones Económicas Post-Socialistas — Mapa Interactivo

Aplicación web interactiva que visualiza las transiciones económicas de países post-socialistas hacia economías de mercado, con un mapa geolocalizado que despliega las características de cada caso de estudio.

![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwindcss)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-1f78b4?logo=leaflet)

## 📋 Descripción

Esta aplicación presenta un mapa interactivo de Europa (y el mundo) que muestra las diferentes trayectorias de transición económica desde el socialismo al capitalismo. Cada país está geolocalizado y al hacer clic se despliegan:

- **Período de transición**
- **Características clave** de la reforma económica
- **Obras fundamentales** de referencia académica
- **Área de influencia de la ex-URSS** delimitada en el mapa

## 🗺️ Países / Regiones incluidos

| País / Región | Período | Enfoque |
|---|---|---|
| 🇷🇺 Rusia y ex-URSS | 1991–2000 | Terapia de choque, privatizaciones masivas |
| 🇵🇱 Polonia | 1989–1995 | Plan Balcerowicz, liberalización rápida |
| 🇭🇺 Hungría | 1989–1998 | Proceso gradual, "Socialismo del Goulash" |
| 🇨🇳 China | 1978–Presente | Reformas graduadas, Zonas Económicas Especiales |
| 🇻🇳 Vietnam | 1986–Presente | Đổi Mới, apertura gradual |
| 🇩🇪 Alemania Oriental (RDA) | 1990–1994 | Integración exprés, Treuhandanstalt |

## 🛠️ Tecnologías

- **React 18** + **TypeScript**
- **Vite** (bundler)
- **Tailwind CSS 4**
- **Leaflet** + **React-Leaflet** (mapas interactivos)
- **CartoDB** (tiles del mapa)

## 🚀 Instalación y uso

```bash
# Clonar el repositorio
git clone https://github.com/TU-USUARIO/transiciones-economicas.git
cd transiciones-economicas

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build
```

## 📂 Estructura del proyecto

```
├── index.html
├── package.json
├── vite.config.js
├── tsconfig.json
├── src/
│   ├── main.tsx          # Punto de entrada
│   ├── App.tsx           # Componente principal con el mapa
│   ├── index.css         # Estilos globales
│   ├── vite-env.d.ts     # Declaraciones de tipos
│   └── data/
│       └── countries.ts  # Datos de países y área ex-URSS
└── public/
```

## 📚 Referencias académicas

El proyecto incluye referencias a obras fundamentales de economía comparada:

- Stiglitz, J. (2002). *Globalization and Its Discontents*
- Åslund, A. (2000). *Economic Transition in Russia*
- Freeland, C. (2000). *Sale of the Century*
- Kolodko, G.W. (2000). *From Shock to Therapy*
- Sachs, J. (1993). *Poland's Jump to the Market Economy*
- Kornai, J. (1992). *The Socialist System*
- Coase, R. y Wang, N. (2012). *How China Became Capitalist*
- Sinn, G. y Sinn, H-W. (1992). *The Economic Unification of Germany*

## 📄 Licencia

Este proyecto es de uso educativo y académico.

---

Desarrollado como herramienta de visualización para el estudio de las transiciones económicas post-socialistas.
