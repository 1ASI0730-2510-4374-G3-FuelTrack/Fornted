import axios from 'axios'

const API_URL = 'http://localhost:3001'

export async function loginClient(email: string, password: string) {
    try {
        const response = await axios.get(`${API_URL}/clients`, {
            params: { email, password }
        })

        if (response.data.length > 0) {
            return { success: true, user: response.data[0] }
        }

        return { success: false, message: 'Credenciales inválidas para cliente.' }
    } catch (error) {
        console.error('Error en loginClient:', error)
        return { success: false, message: 'Error del servidor.' }
    }
}

export async function loginSupplier(ruc: string, email: string, password: string) {
    try {
        const response = await axios.get(`${API_URL}/suppliers`, {
            params: { ruc, email, password }
        })

        if (response.data.length > 0) {
            return { success: true, user: response.data[0] }
        }

        return { success: false, message: 'Credenciales inválidas para proveedor.' }
    } catch (error) {
        console.error('Error en loginSupplier:', error)
        return { success: false, message: 'Error del servidor.' }
    }
}
