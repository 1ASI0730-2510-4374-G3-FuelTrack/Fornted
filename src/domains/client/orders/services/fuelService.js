// src/domains/client/orders/services/fuelService.js

import axios from 'axios'

const API_URL = 'http://localhost:3000/fuels'

/**
 * Obtiene la lista de combustibles desde la API
 * @returns {Promise<Array>} Lista de objetos Fuel
 */
export async function getFuels() {
    try {
        const response = await axios.get(API_URL)
        return response.data
    } catch (error) {
        console.error('Error al obtener combustibles:', error)
        return []
    }
}
