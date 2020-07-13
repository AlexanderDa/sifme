import Vue from 'vue'
import Component from 'vue-class-component'

interface Route {
    icon?: string
    title: string
    routerName?: string
}

interface Item {
    icon: string
    title: string
    routerName?: string
    children?: Route[]
}

@Component({ name: 'admin-view' })
export default class AdminView extends Vue {
    public sideBarItems: Item[] = [{ icon: 'home', title: 'Principal' }]

    public optionItems: Item[] = [
        { icon: 'settings', title: 'Configuraciones', routerName: 'Settings' },
        { icon: 'logout', title: 'Salir', routerName: 'Logout' }
    ]

    private changeRoute(item: Item) {
        if (item.routerName === 'Logout') {
            sessionStorage.removeItem('token')
            // eslint-disable-next-line
            // @ts-ignore
            Vue.http.headers.common['Authorization'] = undefined
            this.$router.push({ name: 'Root' })
        } else {
            this.$router.push({ name: item.routerName })
        }
    }
}