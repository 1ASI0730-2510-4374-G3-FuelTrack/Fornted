import { createRouter, createWebHistory } from 'vue-router'

// Login
import LoginClient from '@/pages/client/LoginClient.vue'
import DashboardClient from '@/pages/client/DashboardClient.vue'

// Vistas organizadas (Client)
import OrdersList from '@/domains/client/orders/views/OrdersList.vue'
import AnalyticsDashboard from '@/domains/client/analytics/views/AnalyticsDashboard.vue'
import TerminalsDashboard from '@/domains/client/terminals/views/TerminalsDashboard.vue'
import ProviderDashboard from '@/domains/client/provider/views/ProviderDashboard.vue'
import WorkflowsDashboard from '@/domains/client/workflows/views/WorkflowsDashboard.vue' // ✅ NUEVO

const routes = [
    { path: '/', redirect: '/login-client' },

    { path: '/login-client', component: LoginClient },

    {
        path: '/client',
        component: DashboardClient,
        children: [
            { path: 'orders', component: OrdersList },
            { path: 'analytics', component: AnalyticsDashboard },
            { path: 'terminals', component: TerminalsDashboard },
            { path: 'provider', component: ProviderDashboard },
            { path: 'workflows', component: WorkflowsDashboard }, // ✅ ACTUALIZADO
            { path: 'admin', component: { template: '<h2>Admin View</h2>' } }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
