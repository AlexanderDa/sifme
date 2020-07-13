import { RouteConfig } from 'vue-router'
const RootRoutes: RouteConfig = {
    path: '/',
    name: 'Root',
    component: () => import('@/views/root/RootView.vue')
}
export default RootRoutes
