import { createRouter, createWebHistory } from 'vue-router'

// Login
import LoginClient from '@/pages/client/LoginClient.vue'
import DashboardClient from '@/pages/client/DashboardClient.vue'

// Vistas organizadas (Client)
import OrdersList from '@/domains/client/orders/views/OrdersList.vue'
import AnalyticsDashboard from '@/domains/client/analytics/views/AnalyticsDashboard.vue' // <-- Importamos

const routes = [
    { path: '/', redirect: '/login-client' },

    { path: '/login-client', component: LoginClient },

    {
        path: '/client',
        component: DashboardClient,
        children: [
            { path: 'orders', component: OrdersList },
            { path: 'analytics', component: AnalyticsDashboard }, // <-- Usamos componente real
            { path: 'admin', component: { template: '<h2>Admin View</h2>' } },
            { path: 'terminals', component: { template: '<h2>Terminals View</h2>' } },
            { path: 'provider', component: { template: '<h2>Provider View</h2>' } },
            { path: 'workflows', component: { template: '<h2>Workflows View</h2>' } }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
