import Vue from 'vue'
import Component from 'vue-class-component'
import service from '@/services/AccountService'

@Component({ name: 'view-root' })
export default class LoginView extends Vue {
    created() {
        service
            .me()
            .then(me => {
                switch (me.roleId) {
                    case 1:
                        this.$router.push({ name: 'Admin' })
                        break
                    case 2:
                        console.log('medico')
                        break
                    case 3:
                        console.log('enfermeria')
                        break
                    default:
                        this.$router.push({ name: 'Login' })
                        break
                }
            })
            .catch(() => {
                this.$router.push({ name: 'Login' })
            })
    }
}
