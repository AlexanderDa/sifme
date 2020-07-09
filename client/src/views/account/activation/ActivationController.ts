import Vue from 'vue'
import Component from 'vue-class-component'
import Password from '@/components/password.vue'

@Component({ name: 'view-login', components: { Password } })
export default class LoginView extends Vue {
    public password = ''
    public confirmation = ''

    public activate(): void {
        this.$router.push({ name: 'Admin' })
    }
}
