import Vue from 'vue'
import VueRouter, {
    RouteConfig,
    Route,
    NavigationGuardNext,
    RouteRecord
} from 'vue-router'
import RootRouter from '@/router/RootRoutes'
import service from '@/services/AccountService'
import { LoginRoutes } from '@/router/AccountRoutes'
import { ActivatorRoutes } from '@/router/AccountRoutes'
import SettingsRoutes from '@/router/SettingsRoutes'
import AdminRoutes from '@/router/AdminRoutes'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
    RootRouter,
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

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
    if (from.name === 'Root') next()
    else
        to.matched.some((record: RouteRecord) => {
            if (record.meta.auth) {
                service
                    .me()
                    // eslint-disable-next-line
                    .then((me: any) => {
                        switch (record.meta.role) {
                            case 'admin':
                                if (me.roleId === 1) next()
                                else next({ name: 'Root' })
                                break

                            case 'medico':
                                if (me.roleId === 2) next()
                                else next({ name: 'Root' })
                                break

                            case 'nursing':
                                if (me.roleId === 3) next()
                                else next({ name: 'Root' })
                                break

                            // all user has access: example settings
                            case 'all':
                                next()
                                break

                            default:
                                next({ name: 'Root' })
                                break
                        }
                    })
                    .catch(() => {
                        next({ name: 'Root' })
                    })
            } else next()
        })
})

export default router
