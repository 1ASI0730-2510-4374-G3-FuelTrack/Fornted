// src/services/api.js
// src/services/api.js
// Base de la API obtenida de las variables de entorno de Vite
// Si no existe la variable se usa la URL de producción por defecto
const API_BASE = import.meta.env.VITE_API_BASE || 'https://fake-api-bsyr.onrender.com'

export default API_BASE
