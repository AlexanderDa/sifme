import Vue from 'vue'
import Component from 'vue-class-component'
import DrawerPanel from '@/components/drawer.panel.vue'
import ImageUploader from '@/components/image.uploader.vue'
import Delete from '@/components/delete.vue'
import Roles from '@/components/roles.vue'
//import profileService from '@/services/ProfileService'
//import userService from '@/services/UserService'
import { ProfileModel, createProfile } from '@/models'
import validate from '@/utils/validations'
//import alert from '@/utils/alert'

@Component({
    name: 'view-profile',
    components: { DrawerPanel, ImageUploader, Delete, Roles }
})
export default class ProfileController extends Vue {
    /********************************************************
     *                      Attributes                       *
     ********************************************************/

    // GUI
    private isValidFormInfo = false
    private isValidFormPass = false

    // Data
    private password = ''
    private confirmation = ''
    private profile: ProfileModel = createProfile()

    // Validations
    private rules: object = {
        password: [(v: string) => validate.minLength(v, 8)],
        required: [(v: string) => validate.required(v)],
        email: [(v: string) => validate.required(v), (v: string) => validate.isEmail(v)],
        dni: [(v: string) => validate.isDni(v)],
        passport: [],
        telephone: [(v: string) => validate.isTelephone(v)],
        mobile: [(v: string) => validate.isMobile(v)]
    }

    /********************************************************
     *                     Initializable                    *
     ********************************************************/

    async created(): Promise<void> {
        this.profile = this.$store.state.session.profile
    }

    /********************************************************
     *                    API Services                      *
     ********************************************************/

    async updateInfo(): Promise<void> {
        // eslint-disable-next-line
        //@ts-expect-error
        await this.$refs.formInfo.validate()
        /* if (this.isValidFormInfo === true){

        }*/
    }

    async changePass(): Promise<void> {
        // eslint-disable-next-line
        //@ts-expect-error
        await this.$refs.formPass.validate()
        /*if (this.isValidFormPass === true){
            
        }*/
    }
}
