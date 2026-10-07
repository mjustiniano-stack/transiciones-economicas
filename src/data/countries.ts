export interface CountryData {
  id: string;
  name: string;
  region: string;
  period: string;
  characteristics: string[];
  works: string[];
  coordinates: [number, number]; // [lat, lng]
  color: string;
}

export const countriesData: CountryData[] = [
  {
    id: "russia",
    name: "Rusia y ex-URSS",
    region: "Rusia y ex-URSS",
    period: "1991 – 2000",
    characteristics: [
      "Aplicación de la terapia de choque.",
      "Privatizaciones masivas mediante cupones (vouchers) y privatizaciones por préstamos (loans-for-shares).",
      "Periodo marcado por hiperinflación y contracción económica prolongada.",
    ],
    works: [
      "Globalization and Its Discontents (2002) – Joseph Stiglitz",
      "Economic Transition in Russia (2000) – Anders Åslund",
      "Sale of the Century: Russia's Wild Ride from Communism to Capitalism (2000) – Chrystia Freeland",
    ],
    coordinates: [55.75, 37.62], // Moscú
    color: "#dc2626",
  },
  {
    id: "poland",
    name: "Polonia",
    region: "Polonia",
    period: "1989 – 1995",
    characteristics: [
      "Implementación del Plan Balcerowicz (terapia de choque rápida).",
      "Liberalización inmediata de precios y apertura al comercio internacional.",
      "Rápida estabilización macroeconómica y temprano retorno al crecimiento económico.",
    ],
    works: [
      "From Shock to Therapy: The Political Economy of Postsocialist Transformation (2000) – Grzegorz W. Kolodko",
      "Poland's Jump to the Market Economy (1993) – Jeffrey Sachs",
      "Post-Communist Reform: Pain and Progress (1993) – Olivier Blanchard et al.",
    ],
    coordinates: [52.23, 21.01], // Varsovia
    color: "#2563eb",
  },
  {
    id: "hungary",
    name: "Hungría",
    region: "Hungría",
    period: "1989 – 1998",
    characteristics: [
      'Proceso gradual apoyado en el antecedente del "Socialismo del Goulash" (Nuevo Mecanismo Económico de 1968).',
      "Privatización directa a inversores extranjeros (FDI) en lugar de vouchers masivos.",
    ],
    works: [
      "The Socialist System: The Political Economy of Communism (1992) – János Kornai",
      "Highway and Byways: Studies on Reform and Post-Communist Transition (1995) – János Kornai",
    ],
    coordinates: [47.5, 19.04], // Budapest
    color: "#16a34a",
  },
  {
    id: "china",
    name: "China",
    region: "China",
    period: "1978 – Presente",
    characteristics: [
      'Reformas graduadas bajo el principio de "Cruzar el río sintiendo las piedras" lideradas por Deng Xiaoping.',
      "Sistema de responsabilidad familiar en agricultura, Zonas Económicas Especiales (ZEE) y sistema de precios dual.",
    ],
    works: [
      "How China Became Capitalist (2012) – Ronald Coase y Ning Wang",
      "China's Great Economic Transformation (2008) – Loren Brandt y Thomas G. Rawski",
      "Markets and Bodies: Do Markets Deliver in China? / The Institutional Foundations of China's Economic Growth – Yasheng Huang",
    ],
    coordinates: [39.9, 116.4], // Pekín
    color: "#ea580c",
  },
  {
    id: "vietnam",
    name: "Vietnam",
    region: "Vietnam",
    period: "1986 – Presente",
    characteristics: [
      'Transición iniciada con las reformas Đổi Mới ("Renovación").',
      "Terapia de choque moderada en estabilización macroeconómica combinada con aperturas agrícolas y comerciales graduales.",
    ],
    works: [
      "Vietnam: Enterprise Law and the Transformation of the Economy – Raymond Mallon",
      "Vietnam's Market Economy in Transition (2006) – Martin Gainsborough",
      "The Economic Emergence of Southeast Asia (2001) – Anne Booth",
    ],
    coordinates: [21.03, 105.85], // Hanói
    color: "#7c3aed",
  },
  {
    id: "east-germany",
    name: "Alemania Oriental (RDA)",
    region: "Alemania Oriental",
    period: "1990 – 1994",
    characteristics: [
      "Integración económica e institucional exprés tras la reunificación.",
      "Absorción por el marco legal de la RFA y privatización masiva a través de la agencia Treuhandanstalt.",
    ],
    works: [
      "The Economic Unification of Germany (1992) – Gerlinde Sinn y Hans-Werner Sinn",
      "The Treuhandanstalt: Privatization in East Germany 1990–1994 (1996) – Wolfgang Seibel",
    ],
    coordinates: [52.52, 13.4], // Berlín Este
    color: "#0891b2",
  },
];

// Área de influencia de la ex URSS (Pacto de Varsovia + Repúblicas Soviéticas)
// Coordenadas aproximadas para dibujar el polígono
export const exUSSRInfluenceArea: [number, number][] = [
  // Frontera occidental (Alemania Oriental)
  [54.5, 9.5],    // Norte de Alemania
  [53.5, 10.0],
  [52.5, 12.0],
  [51.0, 14.5],   // Frontera Polonia-Alemania
  [50.0, 15.0],
  [49.0, 16.0],   // Checoslovaquia
  [48.0, 17.0],
  [47.5, 18.0],   // Hungría
  [46.5, 18.5],
  [45.5, 20.0],   // Yugoslavia/Rumanía
  [44.0, 22.0],
  [43.5, 24.0],   // Bulgaria
  [42.0, 26.0],
  [41.5, 28.0],   // Turquía frontera
  // Frontera sur
  [41.0, 30.0],
  [40.5, 35.0],
  [39.5, 40.0],   // Georgia/Armenia
  [38.5, 45.0],
  [37.5, 50.0],   // Irán frontera
  [37.0, 55.0],
  [37.5, 60.0],   // Afganistán
  [38.0, 65.0],
  [39.0, 70.0],   // Tayikistán
  [40.0, 75.0],   // Kirguistán
  [41.0, 80.0],   // Kazajistán sur
  [43.0, 82.0],
  [45.0, 83.0],
  [48.0, 85.0],
  [50.0, 87.0],
  // Frontera oriental
  [52.0, 87.0],
  [55.0, 85.0],
  [58.0, 80.0],
  [60.0, 75.0],
  [63.0, 70.0],
  [65.0, 75.0],
  [68.0, 80.0],
  [70.0, 85.0],
  [72.0, 100.0],
  [73.0, 120.0],
  [72.0, 140.0],
  [70.0, 160.0],
  [68.0, 170.0],
  [66.0, 175.0],
  // Norte
  [65.0, 178.0],
  [63.0, 175.0],
  [60.0, 170.0],
  [58.0, 165.0],
  [55.0, 160.0],
  // Volver por el norte de Rusia
  [55.0, 140.0],
  [58.0, 120.0],
  [62.0, 100.0],
  [65.0, 80.0],
  [68.0, 60.0],
  [70.0, 50.0],
  [70.0, 40.0],
  [69.0, 35.0],
  [67.0, 32.0],
  [65.0, 30.0],
  [63.0, 28.0],
  [62.0, 25.0],
  [60.0, 22.0],
  [58.0, 20.0],
  [56.0, 18.0],
  [55.0, 15.0],
  [54.5, 12.0],
  [54.5, 9.5],    // Cerrar
];
