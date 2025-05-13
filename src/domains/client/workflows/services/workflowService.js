import axios from 'axios'

const API_URL = 'http://localhost:3000'

/**
 * Obtiene todas las órdenes registradas (con productos y estados).
 * Estas se usarán para simular los workflows de cada orden.
 * @returns {Promise<Array>} Lista de órdenes
 */
export async function getWorkflows() {
    try {
        const response = await axios.get(`${API_URL}/orders`)
        return response.data
    } catch (error) {
        console.error('❌ Error al obtener workflows:', error)
        return []
    }
}

/**
 * Devuelve los estados posibles del flujo en orden lógico.
 * Este helper es útil para simular progresos.
 */
export function getWorkflowSteps() {
    return ['Requested', 'Approved', 'Released', 'Closed']
}
