// src/domains/client/terminals/services/terminalService.js

import axios from 'axios'

const BASE_URL = 'http://localhost:3000'

/**
 * Obtiene la lista de terminales disponibles
 * @returns {Promise<Array<{id: number, name: string}>>}
 */
export async function getTerminals() {
    try {
        const response = await axios.get(`${BASE_URL}/terminals`)
        return response.data
    } catch (error) {
        console.error('Error al obtener terminales:', error)
        return []
    }
}

/**
 * Obtiene todas las órdenes desde el backend (para estadísticas de terminales)
 * @returns {Promise<Array>}
 */
export async function getOrders() {
    try {
        const response = await axios.get(`${BASE_URL}/orders`)
        return response.data
    } catch (error) {
        console.error('Error al obtener órdenes:', error)
        return []
    }
}

/**
 * Obtiene camiones (puede ser datos simulados para el mapa)
 * @returns {Promise<Array<{id: number, driver: string, plate: string, fuelType: string, quantity: number, lat: number, lng: number, terminal: string, status: string}>>}
 */
export async function getTrucks() {
    try {
        const response = await axios.get(`${BASE_URL}/trucks`)
        return response.data
    } catch (error) {
        console.error('Error al obtener camiones:', error)
        return []
    }
}
