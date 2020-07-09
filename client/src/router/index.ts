import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { LoginRoutes } from '@/router/AccountRoutes'
import { ActivatorRoutes } from '@/router/AccountRoutes'
import SettingsRoutes from '@/router/SettingsRoutes'
import AdminRoutes from '@/router/AdminRoutes'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    LoginRoutes,
    ActivatorRoutes,
    SettingsRoutes,
    AdminRoutes
]

const router = new VueRouter({
    //mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
