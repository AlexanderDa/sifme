import Vue from 'vue'
import Component from 'vue-class-component'
import Password from '@/components/password.vue'
import service from '../../../services/AccountService'
import validate from '../../../utils/validations'

interface Query {
    username: string
    image?: string
    email: string
    verificationToken: string
}

@Component({ name: 'view-login', components: { Password } })
export default class LoginView extends Vue {
    private password = ''
    private confirmation = ''
    private isValidForm = false
    public alert = false
    public error = ''
    private query: Query = { username: '', email: '', verificationToken: '' }

    // Validations
    private rules: object = {
        password: [(v: string) => validate.minLength(v, 8)]
    }

    beforeMount() {
        if (this.$route.query.query) {
            // eslint-disable-next-line
            // @ts-ignore
            this.query = JSON.parse(this.$route.query.query)
        }
    }

    public async activate(): Promise<void> {
        // eslint-disable-next-line
        //@ts-expect-error
        await this.$refs.form.validate()
        if (this.isValidForm === true) {
            service
                .activate(this.query.email, this.password, this.query.verificationToken)
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
                        case 'BAD_TOKEN':
                            this.error = 'Código de activación no valido.'
                            break

                        case 'ACTIVED_ACCOUNT':
                            this.error = 'La cuenta ya está activada.'
                            break

                        default:
                            this.error = 'No se pudo activar la cuenta.'
                            break
                    }
                })
        }
    }
}
