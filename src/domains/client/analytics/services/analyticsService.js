import axios from 'axios'

const API_URL = 'http://localhost:3000/orders'

export async function fetchOrders() {
    try {
        const response = await axios.get(API_URL)
        return response.data
    } catch (error) {
        console.error('Error al cargar órdenes para analytics:', error)
        return []
    }
}
