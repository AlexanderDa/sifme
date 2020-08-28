import Vue from 'vue'
import service from '@/services/AccountService'
import Component from 'vue-class-component'
import Password from '@/components/password.vue'

@Component({ name: 'view-login', components: { Password } })
export default class LoginView extends Vue {
    public email = ''
    public password = ''
    public alert = false
    public error = ''

    public login(): void {
        service
            .login(this.email, this.password)
            .then(session => {
                // eslint-disable-next-line
                // @ts-ignore
                Vue.http.headers.common['Authorization'] = session.token
                sessionStorage.setItem('token', session.token)
                sessionStorage.setItem('duration', String(session.duration))
                sessionStorage.setItem('accessed', String(Date.now()))
                this.$router.push({ name: 'Root' })
            })
            .catch(err => {
                this.alert = true
                switch (err.body.error.message) {
                    case 'BAD_ACCOUNT':
                        this.error = 'No existe la cuenta de usuario.'
                        break
                    case 'BAD_PASS':
                        this.error = 'La contraseña es incorrecta.'
                        break

                    case 'INACTIVE_ACCOUNT':
                        this.error = 'La cuenta ya no tiene acceso.'
                        break
                    case 'EMAIL_NOT_VERIFIED':
                        this.error = 'El correo no ha sido verificado.'
                        break

                    default:
                        this.error = 'No se pudo ingresar.'
                        break
                }
            })
    }
}
