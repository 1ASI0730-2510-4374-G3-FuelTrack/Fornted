// src/domains/client/orders/services/orderService.js

import axios from 'axios'
import API from '@/services/api' // ✅ Importar la base común

const API_URL = `${API}/orders`

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
        const res = await axios.post(API_URL, order)
        return res.data
    } catch (error) {
        console.error('Error creando orden:', error)
        throw error
    }
}
