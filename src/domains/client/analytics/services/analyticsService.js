// src/domains/supplier/analytics/services/analyticsService.js

import axios from 'axios'
import API from '@/services/api' // importa la base centralizada

const API_URL = `${API}/orders`

export async function fetchOrders() {
    try {
        const response = await axios.get(API_URL)
        return response.data
    } catch (error) {
        console.error('Error al cargar órdenes para analytics:', error)
        return []
    }
}
