// ─── Datos reales de La Mano Negra ──────────────────────────────────────────
// Fuentes: Google Maps (Places), Booksy (servicios y precios), webs del negocio.

export const BUSINESS = {
  name: "La Mano Negra",
  tagline: "Barbería & Peluquería Unisex · A Coruña",
  category: "Peluquería unisex",
  address: "Rúa Cordonería, 8",
  postalCode: "15001",
  city: "A Coruña",
  country: "España",
  phone: "684 23 40 53",
  phoneIntl: "+34684234053",
  plusCode: "9JC2+Q3 A Coruña",
  googleRating: 4.9,
  googleReviews: 231,
  booksyRating: 5.0,
  booksyReviews: 1028,
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=La%20Mano%20Negra&query_place_id=ChIJj_Z2KH98Lg0RRhNaLtUP5Bs",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4025.59922041275!2d-8.399820000000002!3d43.37192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd2e7c7f2876f68f%3A0x1be40fd52e5a1346!2sLa%20Mano%20Negra!5e1!3m2!1ses!2ses!4v1793437052334!5m2!1ses!2ses",
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=La+Mano+Negra&destination_place_id=ChIJj_Z2KH98Lg0RRhNaLtUP5Bs",
  booksyUrl: "https://booksy.com/es-es/1778_la-mano-negra-barberia_barberia_60813_a-coruna",
  instagram: "https://www.instagram.com/lamanonegraestudio/",
  facebook: "https://www.facebook.com/LAMANONEGRAbarbershop/?locale=es_ES",
  instagramHandle: "@lamanonegraestudio",
  facebookHandle: "LAMANONEGRAbarbershop",
  description:
    "La claridad, el trato directo y la implicación son fundamentales en nuestra forma de trabajar. Queremos ser tu servicio de peluquería unisex. Ofrecemos las mejores técnicas y los procedimientos más actuales.",
} as const;

export const SCHEDULE: { day: string; ranges: string[]; jsDay: number }[] = [
  { day: "Lunes", ranges: ["Cerrado"], jsDay: 1 },
  { day: "Martes", ranges: ["10:00 – 15:00", "16:00 – 20:30"], jsDay: 2 },
  { day: "Miércoles", ranges: ["10:00 – 15:00", "16:00 – 20:30"], jsDay: 3 },
  { day: "Jueves", ranges: ["10:00 – 15:00", "16:00 – 20:30"], jsDay: 4 },
  { day: "Viernes", ranges: ["10:00 – 15:00", "16:00 – 20:30"], jsDay: 5 },
  { day: "Sábado", ranges: ["9:00 – 16:00"], jsDay: 6 },
  { day: "Domingo", ranges: ["Cerrado"], jsDay: 0 },
];

export interface Service {
  name: string;
  price: string;
  duration: string;
  desc: string;
  tag?: string;
}

// Servicios y precios reales de Booksy
export const SERVICES: { group: string; items: Service[] }[] = [
  {
    group: "Corte",
    items: [
      {
        name: "Corte de pelo",
        price: "20 €",
        duration: "30 min",
        desc: "A máquina y tijera, adaptado a tu estilo. Desde looks clásicos y modernos, trabajamos con precisión para realzar tu esencia. Incluye lavado y peinado.",
        tag: "Más reservado",
      },
      {
        name: "Corte semanal",
        price: "17 €",
        duration: "20 min",
        desc: "Servicio de mantenimiento semanal para que tu corte siempre luzca fresco. Incluye lavado y peinado.",
      },
      {
        name: "Corte medio / largo",
        price: "28 €",
        duration: "45 min",
        desc: "Corte personalizado para cabello medio o largo, en tijera y/o máquina. Sin etiquetas. Incluye lavado y secado.",
      },
      {
        name: "Corte fuera de hora",
        price: "30 €",
        duration: "30 min",
        desc: "Fuera del horario habitual. Consulta disponibilidad vía Instagram o teléfono.",
      },
    ],
  },
  {
    group: "Barba",
    items: [
      {
        name: "Corte de barba",
        price: "15 €",
        duration: "20 min",
        desc: "Arreglo y perfilado con máquina y tijera. Definimos contornos, equilibramos volúmenes y acabamos con productos específicos para la barba.",
      },
    ],
  },
  {
    group: "Packs",
    items: [
      {
        name: "Corte pelo + barba",
        price: "30 €",
        duration: "45 min",
        desc: "Pack completo adaptado a tu estilo y acabado con productos específicos. Precisión en cada detalle para un look impecable. Incluye lavado y peinado.",
        tag: "Pack completo",
      },
      {
        name: "Corte + barba semanal",
        price: "20 €",
        duration: "30 min",
        desc: "Mantenimiento semanal para lucir siempre fresco. Incluye lavado, secado y retoque de barba.",
      },
    ],
  },
  {
    group: "Extras",
    items: [
      {
        name: "Peinado expres",
        price: "9 €",
        duration: "30 min",
        desc: "Secado del cabello únicamente con secador.",
      },
    ],
  },
];

// Reseñas reales de Google Maps (solo nombre de pila)
export interface Review {
  name: string;
  rating: number;
  text: string;
  initial: string;
  hue: number;
}

export const REVIEWS: Review[] = [
  {
    name: "Andrés",
    rating: 5,
    text: "Ofrecen un servicio de 10. Llevo meses yendo y siempre salgo encantado con el corte, son muy profesionales. Me corta Gaby y me dejo llevar por sus sugerencias: cada vez es un acierto. Dejan el cabello muy bien y con mucho estilo.",
    initial: "A",
    hue: 12,
  },
  {
    name: "Lorena",
    rating: 5,
    text: "Ayer fui con mi hijo Alejandro a cortarle el pelo y debo decir que una maravilla. Daros las gracias porque quedó encantado.",
    initial: "L",
    hue: 340,
  },
  {
    name: "Gatien",
    rating: 5,
    text: "¡Experiencia 10/10! Muy good vibe y el corte de pelo espectacular. ¡Volveré! Muchas gracias.",
    initial: "G",
    hue: 40,
  },
];

export const NAV_LINKS = [
  { href: "#inicio", label: "Inicio" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#galeria", label: "Galería" },
  { href: "#opiniones", label: "Opiniones" },
  { href: "#horario", label: "Horario" },
  { href: "#contacto", label: "Contacto" },
] as const;

export const MARQUEE_WORDS = [
  "Corte de pelo",
  "Barba",
  "Estilo",
  "Peluquería unisex",
  "A Coruña",
  "Cita previa",
  "La Mano Negra",
];
