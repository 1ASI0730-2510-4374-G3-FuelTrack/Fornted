// src/domains/client/orders/services/orderService.js

import axios from 'axios'

const API_URL = 'http://localhost:3000/orders'

/**
 * Obtener todas las órdenes desde la API
 * @returns {Promise<Array>} Lista de órdenes
 */
export async function getOrders() {
    try {
        const response = await axios.get(API_URL)
        return response.data
    } catch (error) {
        console.error('Error al obtener órdenes:', error)
        return []
    }
}

/**
 * Crear una nueva orden en la API
 * @param {Object} order - Objeto de orden a registrar
 * @returns {Promise<void>}
 */
export async function createOrder(order) {
    try {
        await axios.post(API_URL, order)
    } catch (error) {
        console.error('Error al crear orden:', error)
        throw error
    }
}
