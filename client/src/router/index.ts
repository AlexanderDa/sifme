import Vue from 'vue'
import { compareDesc } from 'date-fns'
import { add } from 'date-fns'
import VueRouter from 'vue-router'
import { RouteConfig, } from 'vue-router'
import { Route, } from 'vue-router'
import { NavigationGuardNext, } from 'vue-router'
import { RouteRecord } from 'vue-router'
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

/**
 * check if the access token is valid.
 */
function isValidToken(): boolean {
    // load stored values
    const duration: number = Number(sessionStorage.getItem('duration'))
    const accessed: number = Number(sessionStorage.getItem('accessed'))

    // add duration
    const validUntil: Date = add(accessed, { seconds: duration })


    return compareDesc(Date.now(), validUntil) === 1

}


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
