import { RouteConfig } from 'vue-router'
const AdminRoutes: RouteConfig = {
    path: '/settings',
    name: 'Settings',
    redirect: { name: 'Profile' },
    meta: { auth: true, role: 'all' },
    component: () => import('@/layouts/settings/SettingsLayout.vue'),
    children: [
        {
            path: 'profile',
            name: 'Profile',
            component: () => import('@/views/account/profile/ProfileView.vue')
        }
    ]
}
export default AdminRoutes
