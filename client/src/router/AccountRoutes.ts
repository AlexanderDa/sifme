import { RouteConfig } from 'vue-router'
export const LoginRoutes: RouteConfig = {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/account/login/LoginView.vue')
}

export const ActivatorRoutes: RouteConfig = {
    path: '/activate',
    name: 'Activator',
    component: () => import('@/views/account/activation/ActivationView.vue')
}
