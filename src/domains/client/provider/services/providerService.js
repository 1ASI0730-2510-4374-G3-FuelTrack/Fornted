// src/domains/supplier/analytics/services/providerService.js

import axios from 'axios'
import API from '@/services/api' // ✅ Ruta común para el endpoint base

/**
 * Obtiene todos los proveedores registrados desde el fake API.
 * @returns {Promise<Array>} Lista de proveedores
 */
export async function getProviders() {
    try {
        const response = await axios.get(`${API}/providers`)
        return response.data
    } catch (error) {
        console.error('❌ Error al obtener proveedores:', error)
        return []
    }
}

/**
 * Obtiene todas las órdenes del sistema para cálculo estadístico.
 * @returns {Promise<Array>} Lista de órdenes
 */
export async function getOrders() {
    try {
        const response = await axios.get(`${API}/orders`)
        return response.data
    } catch (error) {
        console.error('❌ Error al obtener órdenes:', error)
        return []
    }
}
