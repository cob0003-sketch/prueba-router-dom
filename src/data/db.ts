export const contenedorMamparas = [
  {
    id: '1',
    titulo: 'Tokyo frontal',
    imagen: `${import.meta.env.BASE_URL}/img/tokyo-frontal.png`,
    descripcion: 'La opción más economica y popular',
    promocion: true
  },
  {
    id: '2',
    titulo: 'Tokyo angular',
    imagen: `${import.meta.env.BASE_URL}/img/tokyo-angular.png`,
    descripcion: 'Solución completa para esquinas',
    promocion: true
  },
  {
    id: '3',
    titulo: 'Tokyo vertice',
    imagen: `${import.meta.env.BASE_URL}/img/tokyo-vertice.png`,
    descripcion: 'Diseño especial para vértices', 
    promocion: true
  }
]

export const contenedorPlatos = [
  {
    id: '1',
    titulo: 'Plato rampa ',
    imagen: `${import.meta.env.BASE_URL}/img/blanco-rampa.png`,
    descripcion:'Diseño con rampa para fácil acceso y funcionalidad',
    promocion: true
  },
  {
    id: '2',
    titulo: 'Plato cuadrado',
    imagen: `${import.meta.env.BASE_URL}/img/cuadrado-blanco.png`,
    descripcion:'Diseño cuadrado clásico para espacios equilibrados',
    promocion: true
  },
  {
    id: '3',
    titulo: 'Plato semicircular',
    imagen: `${import.meta.env.BASE_URL}/img/semicircular-blanco.png`,
    descripcion:'Perfecto para pequeños espacios con diseño curvo',
    promocion: true
  },
]


// array de enlaces
export const enlacesNav = [
  {
    nombre: 'Inicio',
    path: 'inicio',
    componente: true
  },
  {
    nombre: 'Contacto',
    path: 'contacto',
    componente: true
  },
  {
    nombre: 'Desarrollo',
    path: '/desarrollo',
    componente: true
  },
  {
    nombre: 'Formación',
    path: 'formacion',
    componente: true
  },
]