import { RouteConfig } from 'vue-router'
const AdminRoutes: RouteConfig = {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/layouts/admin/AdminLayout.vue'),
    meta: { auth: true, role: 'admin' },
    children: []
}
export default AdminRoutes
