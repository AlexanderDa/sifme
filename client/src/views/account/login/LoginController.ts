import Vue from 'vue'
import Component from 'vue-class-component'
import Password from '@/components/password.vue'

@Component({ name: 'view-login', components: { Password } })
export default class LoginView extends Vue {
    public username = ''
    public password = ''

    public login(): void {
        this.$router.push({ name: 'Admin' })
    }
}
