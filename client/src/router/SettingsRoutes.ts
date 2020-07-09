import { RouteConfig } from 'vue-router'
const AdminRoutes: RouteConfig = {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/layouts/settings/SettingsLayout.vue'),
    children: []
}
export default AdminRoutes
