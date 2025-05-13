import { createRouter, createWebHistory } from 'vue-router'

// Páginas Cliente
import LoginClient from '../pages/client/LoginClient.vue'
import DashboardClient from '../pages/client/DashboardClient.vue'
import OrdersList from '../pages/client/orders/OrdersList.vue'
import SupplierOrders from '@/pages/supplier/orders/SupplierOrders.vue'

// Páginas Proveedor (cuando estén listas)
 import LoginSupplier from '../pages/supplier/LoginSupplier.vue'
 import DashboardSupplier from '../pages/supplier/DashboardSupplier.vue'

const routes = [
    // Redirección inicial
    { path: '/', redirect: '/login-client' },

    // Autenticación
    { path: '/login-client', component: LoginClient },
    { path: '/login-supplier', component: LoginSupplier },

    // Dashboard Cliente con rutas anidadas
    {
        path: '/client',
        component: DashboardClient,
        children: [
            { path: 'orders', component: OrdersList },
            { path: 'admin', component: { template: '<h2>Admin View</h2>' } },
            { path: 'analytics', component: { template: '<h2>Analytics View</h2>' } },
            { path: 'terminals', component: { template: '<h2>Terminals View</h2>' } },
            { path: 'provider', component: { template: '<h2>Provider View</h2>' } },
            { path: 'workflows', component: { template: '<h2>Workflows View</h2>' } }
        ]
    },

    {
        path: '/supplier',
        component: DashboardSupplier,
        children: [
            { path: 'orders-management', component: SupplierOrders },
            { path: 'dispatch', component: { template: '<h2>Dispatch View</h2>' } }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
