import { RouteConfig } from 'vue-router'
const AdminRoutes: RouteConfig = {
    path: '/settings',
    name: 'Settings',
    meta: { auth: true, role: 'all' },
    component: () => import('@/layouts/settings/SettingsLayout.vue'),
    children: []
}
export default AdminRoutes
