/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Dish, Promotion } from '../types';

export const DEFAULT_PLATES: Dish[] = [
  // Entradas
  {
    id: 'e1',
    name: 'Dedos de Mozzarella',
    description: 'Crujientes trozos de mozzarella finamente empanizados acompañados de salsa marinara (6 uds).',
    price: 8.0,
    category: 'Entradas',
    popular: true
  },
  {
    id: 'e2',
    name: 'Chicken Wings',
    description: '8 unidades de alitas glaseadas con salsa BBQ clásica o picante acompañadas con dip de queso azul.',
    price: 9.5,
    category: 'Entradas'
  },
  {
    id: 'e3',
    name: 'Tequeños',
    description: '8 unidades de masa crujiente rellena con doble queso venezolano, acompañados de crema tártara.',
    price: 7.0,
    category: 'Entradas',
    popular: true
  },
  {
    id: 'e4',
    name: 'Papas Bacon',
    description: 'Papas fritas tradicionales crujientes, bañadas con queso cheddar fundido y trocitos de tocineta ahumada.',
    price: 7.5,
    category: 'Entradas'
  },
  {
    id: 'e5',
    name: 'Sams Potato',
    description: 'Papa horneada tierna y dorada, bañada de abundante queso cheddar y crujientes bacon bits.',
    price: 6.5,
    category: 'Entradas'
  },
  {
    id: 'e6',
    name: 'Carpaccio Lomito',
    description: 'Centro de lomito finamente rebanado, ligeramente sellado y aderezado con el toque especial de la casa, parmesano y alcaparras.',
    price: 11.0,
    category: 'Entradas'
  },
  {
    id: 'e7',
    name: 'Carpaccio Lau Lau',
    description: 'Delicado pescado Lau Lau del río Orinoco, ahumado de manera artesanal con el toque especial gourmet de la casa.',
    price: 12.0,
    category: 'Entradas',
    popular: true
  },
  {
    id: 'e8',
    name: 'Nachos Especiales',
    description: 'Crujientes nachos de maíz acompañados de carne molida sazonada, guacamole fresco, pico de gallo, crema agria y queso fundido.',
    price: 10.0,
    category: 'Entradas'
  },
  {
    id: 'e9',
    name: 'Nachos Dips',
    description: 'Ración generosa de nachos crujientes con exquisitos dips de chistorra y quesos fundidos para untar.',
    price: 8.5,
    category: 'Entradas'
  },
  {
    id: 'e10',
    name: 'Bandeja Monalisa',
    description: 'La máxima degustación para compartir. Una selección variada de las mejores entradas de nuestro menú.',
    price: 16.0,
    category: 'Entradas',
    popular: true
  },
  {
    id: 'e11',
    name: 'Tabla de Quesos y Fiambres',
    description: 'Variedad de quesos seleccionados y embutidos premium, acompañada de frutos secos, aceitunas y galletas.',
    price: 15.0,
    category: 'Entradas',
    options: ['Pequeña', 'Grande']
  },

  // Ensaladas
  {
    id: 's1',
    name: 'Ensalada Monalisa',
    description: 'Mezclum fresco de de lechugas seleccionadas de la zona, tomates cherry de estación, cubos de queso amarillo, tiras de jugoso pollo crispy y tocineta crujiente, bañada con aderezo César.',
    price: 10.0,
    category: 'Ensaladas',
    popular: true
  },
  {
    id: 's2',
    name: 'Ensalada Cobb',
    description: 'Cama de lechuga crocante, maíz dulce tostado, aceitunas negras, tomates en cubos, queso Monterrey Jack, aguacate, huevo cocido, trozos de tocineta y pechuga de pollo al grill con aderezo miel mostaza.',
    price: 11.5,
    category: 'Ensaladas'
  },
  {
    id: 's3',
    name: 'Ensalada César Clásica',
    description: 'Hojas frescas de lechuga romana aderezadas con la salsa césar de la casa, crutones crujientes y abundante queso parmesano rallado.',
    price: 8.0,
    category: 'Ensaladas'
  },
  {
    id: 's4',
    name: 'Ensalada César con Pollo',
    description: 'Ensalada César clásica coronada con crujientes tiras de pechuga de pollo empanizadas (crispy).',
    price: 10.0,
    category: 'Ensaladas'
  },

  // Principales
  {
    id: 'p1',
    name: 'Parrilla Monalisa',
    description: 'Centro de lomito jugoso, pechuga de pollo al término, chorizo artesanal de la casa y morcilla importada. Acompañada de papas rústicas crujientes, mini ensalada césar, pico de gallo y salsa picante.',
    price: 22.0,
    category: 'Principales',
    popular: true
  },
  {
    id: 'p2',
    name: 'Risotto Da Vinci',
    description: 'Risotto clásico italiano y cremoso de champiñones seleccionados, coronado por un jugoso medallón de lomito en reducción de vino tinto.',
    price: 19.0,
    category: 'Principales',
    popular: true
  },
  {
    id: 'p3',
    name: 'Lomito al Grill',
    description: 'Jugoso centro de solomo de alta calidad asado a la parrilla, servido con papas rústicas especiadas y ensalada césar de la casa.',
    price: 18.0,
    category: 'Principales'
  },
  {
    id: 'p4',
    name: 'Pollo al Grill',
    description: 'Filet de pechuga de pollo marinado en finas hierbas y asado al grill. Acompañado de papas rústicas doradas y ensalada césar.',
    price: 14.0,
    category: 'Principales'
  },
  {
    id: 'p5',
    name: 'Pollo a la Crema Champiñón',
    description: 'Filet de pechuga de pollo sellado y bañado en salsa cremosa de champiñones frescos y vino blanco. Acompañado de papas rústicas y ensalada césar.',
    price: 15.5,
    category: 'Principales'
  },
  {
    id: 'p6',
    name: 'Fajitas Tejanas',
    description: 'Tu plato favorito servido al mejor estilo mexicano en sartén caliente. Viene acompañado de 6 tortillas de trigo tibias, queso amarillo, queso blanco rayado, pico de gallo, guacamole, crema agria y salsa picante.',
    price: 17.5,
    category: 'Principales',
    options: ['Mixtas (Pollo y Carne)', 'Pechuga de Pollo', 'Carne de Lomito']
  },

  // Pastas
  {
    id: 'pa1',
    name: 'Bianca al Funghi',
    description: 'Pasta linguine servida al dente en salsa rica de crema de leche con champiñones frescos salteados y el carácter del queso azul.',
    price: 12.5,
    category: 'Pastas',
    options: ['Pollo (+ $2.00)', 'Lomito (+ $3.50)', 'Lau Lau (+ $4.50)', 'Vegetariana (Sola)']
  },
  {
    id: 'pa2',
    name: 'Filetto di Pomodoro',
    description: 'Pasta linguine envuelta en una tradicional salsa napolitana cocida a fuego lento con tomates confitados de la huerta.',
    price: 11.0,
    category: 'Pastas',
    options: ['Pollo (+ $2.00)', 'Lomito (+ $3.50)', 'Lau Lau (+ $4.50)', 'Sola']
  },
  {
    id: 'pa3',
    name: 'Pesto Romano',
    description: 'Pasta linguine mezclada con nuestra clásica salsa pesto de albahaca fresca, ajo silvestre, piñones triturados, aceite de oliva virgen extra y queso pecorino.',
    price: 11.5,
    category: 'Pastas',
    options: ['Pollo (+ $2.00)', 'Lomito (+ $3.50)', 'Lau Lau (+ $4.50)', 'Sola']
  },

  // Hamburguesas
  {
    id: 'h1',
    name: 'Hamburguesa Vinci',
    description: 'Filet de pechuga de pollo al grill jugosa, acompañada de queso mozzarella derretido, tocineta ahumada, lechuga, tomates confitados y cebolla caramelizada dulce. Servida con papas fritas rústicas.',
    price: 10.5,
    category: 'Hamburguesas'
  },
  {
    id: 'h2',
    name: 'Hamburguesa Del Giocondo',
    description: 'Filet de pechuga de pollo súper crispy con nuestro empanizado secreto, coronado con tocino ahumado, queso cheddar fundido, lechuga fresca y rodajas de tomate. Con papas fritas.',
    price: 11.5,
    category: 'Hamburguesas'
  },
  {
    id: 'h3',
    name: 'Hamburguesa Louvre',
    description: 'Artesanal con 150gr de jugosa carne de res, queso cheddar fundido, tocino crujiente, vegetales frescos (lechuga, tomate, cebolla) y salsa especial de la casa. Viene con papas fritas.',
    price: 12.0,
    category: 'Hamburguesas',
    options: ['Clásica (1 Carne)', 'Doble Carne (+ $3.00)']
  },
  {
    id: 'h4',
    name: 'Hamburguesa Smash Lisa',
    description: 'La consentida de la casa. 150gr de excelente carne de res smashed crujiente con doble queso cheddar, tocineta ahumada en tiras, pepinillos encurtidos y salsa mayo sriracha picante. Con papas fritas.',
    price: 12.5,
    category: 'Hamburguesas',
    popular: true,
    options: ['Clásica (1 Carne)', 'Doble Smashed (+ $3.00)']
  },
  {
    id: 'h5',
    name: 'Hamburguesa Musée',
    description: 'Sencilla pero espectacular. 150gr de jugosa carne premium asada, queso cheddar, lechuga fresca, tomate, cebolla y aderezo especial. Acompañada de papas fritas.',
    price: 10.0,
    category: 'Hamburguesas'
  },
  {
    id: 'h6',
    name: 'Hamburguesa Gherardini',
    description: '150gr de carne selected con tocino, champiñones salteados en ajo y mantequilla, y doble queso cheddar fundido en pan brioche. Con papas fritas.',
    price: 12.0,
    category: 'Hamburguesas'
  },

  // Menú Infantil
  {
    id: 'k1',
    name: 'Cajita Kids Burger',
    description: 'Mini hamburguesa de carne seleccionada en pan suave con queso, acompañada de porción de papas fritas crujientes y divertido juguete/temática sorpresa.',
    price: 7.0,
    category: 'Infantil'
  },
  {
    id: 'k2',
    name: 'Tender de Pollo con Papas',
    description: 'Pechuga de pollo cortada en tiras y súper empanizadas al estilo sureño, servidas con papitas fritas y aderezo honey mustard o salsa de tomate.',
    price: 6.5,
    category: 'Infantil'
  },
  {
    id: 'k3',
    name: 'Macarron Cheese',
    description: 'Taza caliente y cremosa de coditos de pasta envueltos en una deliciosa y rica salsa cremosa de quesos y cheddar fundido.',
    price: 6.0,
    category: 'Infantil'
  },
  {
    id: 'k4',
    name: 'Papas Fritas Kids',
    description: 'Ración individual mediana de papas fritas, cortadas finas, doradas y crujientes con un toque preciso de sal marina.',
    price: 3.5,
    category: 'Infantil'
  },

  // Postres
  {
    id: 'd1',
    name: 'Triple Choco con Helado',
    description: 'Brownie de chocolate fudge artesanal, súper húmedo por dentro, servido caliente con ganache de chocolate oscuro y una bola gigante de helado de vainilla.',
    price: 6.5,
    category: 'Postres',
    popular: true
  },
  {
    id: 'd2',
    name: 'Shake Flips',
    description: 'Espectacular merengada premium de vainilla y chocolate, mezclada con crujientes cereales Flips, fudge de fudge de chocolate y crema chantilly.',
    price: 7.0,
    category: 'Postres'
  },
  {
    id: 'd3',
    name: 'Postre de Temporada',
    description: 'La creación pastelera inspirada del chef para el día. Pregúntale a tu mesonero por la obra maestra repostera del momento.',
    price: 5.5,
    category: 'Postres'
  },

  // Bebidas
  {
    id: 'b1',
    name: 'Mojito Clásico',
    description: 'Refrescante cóctel tradicional preparado con ron blanco seleccionado, limón fresco, hierbabuena silvestre y un toque de soda.',
    price: 4.5,
    category: 'Bebidas',
    popular: true
  },
  {
    id: 'b2',
    name: 'Sangría Monalisa',
    description: 'Nuestra sangría especial de la casa, elaborada con vino tinto seleccionado, licor cítrico y trozos de frutas frescas.',
    price: 5.0,
    category: 'Bebidas',
    popular: true
  },
  {
    id: 'b3',
    name: 'Cerveza Polarcita',
    description: 'La preferida nacional, fría e ideal para acompañar tus platos favoritos en botella clásica (Polar negra / Polarcita).',
    price: 2.0,
    category: 'Bebidas'
  },
  {
    id: 'b4',
    name: 'Cerveza Zulia',
    description: 'Cerveza premium tipo Pilsen, suave y con carácter refrescante.',
    price: 2.5,
    category: 'Bebidas'
  },
  {
    id: 'b5',
    name: 'Té Frío de Limón (Nestea)',
    description: 'Vaso grande de té frío helado sabor a limón con el dulzor ideal de la casa.',
    price: 2.0,
    category: 'Bebidas'
  },
  {
    id: 'b6',
    name: 'Jugos Naturales',
    description: 'Pulpa de frutas naturales seleccionadas preparadas al instante con hielo picado.',
    price: 3.0,
    category: 'Bebidas',
    options: ['Fresa', 'Mango', 'Guanábana', 'Limón con Menta']
  },
  {
    id: 'b7',
    name: 'Refresco en Lata',
    description: 'Refrescos clásicos surtidos de lata bien fríos.',
    price: 1.5,
    category: 'Bebidas',
    options: ['Coca-Cola', 'Coca-Cola Zero', 'Chinotto', 'Hit de Uva', 'Hit de Naranja']
  },
  {
    id: 'b8',
    name: 'Agua Mineral',
    description: 'Botella individual de agua de manantial natural fría.',
    price: 1.5,
    category: 'Bebidas',
    options: ['Sin Gas', 'Con Gas']
  }
];

export const WEEKLY_PROMS: Promotion[] = [
  {
    day: 'Lunes',
    title: 'TOBO CERVESERO + BANDEJA',
    description: 'Un tobo helado de cervezas nacionales + nuestra clásica Bandeja Monalisa para compartir una tarde de relax.',
    badge: 'Popular',
    price: '$20.00'
  },
  {
    day: 'Martes',
    title: 'HAPPY HOUR SENSACIONAL',
    description: 'De 6:30 PM a 7:30 PM. ¡Mojitos clásicos gratis para todas las chicas! Ven con tu grupo de amigas.',
    badge: 'Solo Ellas',
    price: 'GRATIS'
  },
  {
    day: 'Miércoles',
    title: 'TOBO + DEDOS DE MOZZARELLA',
    description: 'Tobo de cerveza bien fría (Zulia o Polarcita) acompañado de una ración entera de Dedos de Mozzarella.',
    badge: 'Promo Imperdible',
    price: '$10.00'
  },
  {
    day: 'Jueves',
    title: '2X1 MOJITOS CLÁSICOS',
    description: 'De 7:00 PM a 9:00 PM. Pide un mojito para ella y el segundo corre por cuenta de la galería de arte.',
    badge: 'Solo Mujeres',
    price: '2x1'
  }
];

export const LUNCH_MENU = {
  hours: 'Lunes a Domingo • 12:00 PM - 3:00 PM',
  price: '$8.50',
  entradas: ['Bruschettas crujientes con tomate y albahaca', 'Ensalada César clásica con aderezo casero'],
  principales: [
    'Trío de pasta artesanal con salsas de la casa',
    'Pollo al grill marinado con papas rústicas y vegetales salteados',
    'Picata de lomito tierna con papas fritas de la abuela',
    'Lomito al vino en reducción asombrosa con arroz cremoso'
  ],
  bebidas: ['Copa de vino', 'Cerveza nacional de tu preferencia', 'Refresco de lata frío', 'Nestea dulce helado']
};
