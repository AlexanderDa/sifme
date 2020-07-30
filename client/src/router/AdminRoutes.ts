import { RouteConfig } from 'vue-router'
const AdminRoutes: RouteConfig = {
    path: '/admin',
    name: 'Admin',
    redirect: { name: 'User' },
    meta: { auth: true, role: 'admin' },
    component: () => import('@/layouts/admin/AdminLayout.vue'),
    children: [
        {
            path: 'user',
            name: 'User',
            component: () => import('@/views/admin/user/UserView.vue')
        }
    ]
}
export default AdminRoutes
