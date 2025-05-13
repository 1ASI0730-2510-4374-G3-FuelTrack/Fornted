import axios from 'axios'

const API_URL = 'http://localhost:3000/orders'

/**
 * Obtener todas las órdenes con sus productos (y pagos si existen)
 * @returns {Promise<Array>}
 */
export async function getConciliations() {
    try {
        const response = await axios.get(API_URL)

        return response.data.map(order => ({
            id: order.id,
            created: order.created,
            user: order.user || '—',
            terminal: order.terminal || '—',
            amount: parseAmount(order.amount),
            orderId: order.orderId,
            status: order.status,
            products: order.products || [],
            approved: false // campo de control adicional
        }))
    } catch (error) {
        console.error('Error al obtener conciliaciones:', error)
        return []
    }
}

/**
 * Convertir "S/ 5200.00" a número
 * @param {string} str
 * @returns {number}
 */
function parseAmount(str) {
    if (!str) return 0
    const cleaned = str.replace(/[^\d.]/g, '')
    return parseFloat(cleaned)
}
