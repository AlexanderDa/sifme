import Vue from 'vue'
import Component from 'vue-class-component'
import DrawerPanel from '@/components/drawer.panel.vue'
import ImageUploader from '@/components/image.uploader.vue'
import Delete from '@/components/delete.vue'
import Roles from '@/components/roles.vue'
import profileService from '@/services/ProfileService'
import userService from '@/services/UserService'
import emailService from '@/services/EmailService'
import { ProfileModel, createProfile } from '@/models'
import { UserModel, createUser } from '@/models'
import validate from '@/utils/validations'
import Search from '@/utils/search'
import alert from '@/utils/alert'
import { Filter } from '@/utils/query'

@Component({
    name: 'view-admin-user',
    components: { DrawerPanel, ImageUploader, Delete, Roles }
})
export default class LoginView extends Vue {
    /********************************************************
     *                      Attributes                       *
     ********************************************************/

    // GUI
    private isValidForm = false

    // Element data
    private elements: ProfileModel[] = []
    private elementIndex = -1
    private element: ProfileModel = createProfile()
    private user: UserModel = createUser()

    // Validations
    private rules: object = {
        required: [(v: string) => validate.required(v)],
        email: [(v: string) => validate.required(v), (v: string) => validate.isEmail(v)],
        dni: [(v: string) => validate.isDni(v)],
        passport: [],
        telephone: [(v: string) => validate.isTelephone(v)],
        mobile: [(v: string) => validate.isMobile(v)]
    }

    /********************************************************
     *                     Initializable                     *
     ********************************************************/

    async created(): Promise<void> {
        await this.findProfiles()
    }

    /********************************************************
     *                    API Services                       *
     ********************************************************/
    async findProfiles(search?: Search): Promise<void> {
        if (this.elements.length > 0) {
            this.clear()
        }

        const filter: Filter<ProfileModel> = { limit: 10, where: { deleted: false } }
        if (search) {
            filter.where = {
                and: [
                    // undefined to find all profiles and false to find not deleted profiles.
                    { deleted: search.includeRemoveds ? undefined : false },
                    {
                        or: [
                            { firstName: { ilike: `%${search.value}%` } },
                            { lastName: { ilike: `%${search.value}%` } },
                            { dni: { ilike: `%${search.value}%` } },
                            { passport: { ilike: `%${search.value}%` } }
                        ]
                    }
                ]
            }
        }
        profileService.find(filter).then(res => (this.elements = res))
    }

    async findUserByProfile(profileId?: number): Promise<void> {
        if (profileId)
            userService.findByProfileId(profileId).then(user => {
                this.user = user
            })
    }

    async createElement(): Promise<void> {
        profileService
            .create({
                lastName: this.element.lastName,
                firstName: this.element.firstName,
                dni: this.element.dni?.replace('-', ''),
                passport: this.element.passport,
                telephone: this.element.telephone,
                mobile: this.element.mobile,
                email: this.element.email,
                address: this.element.address
            })
            .then(async created => {
                this.element = created
                this.elements.push(created)
                await this.createUser()
                alert.onCreateSuccess('El perfil de usuario fue creado.')
            })
    }

    async createUser(): Promise<void> {
        userService
            .create({
                email: this.element.email,
                roleId: this.user.roleId,
                profileId: this.element.id
            })
            .then(async user => {
                this.user = user
            })
    }

    async updateUser(): Promise<void> {
        userService.updateById(this.user.id, {
            email: this.element.email,
            roleId: this.user.roleId,
            profileId: this.element.id,
            isActive: this.user.isActive
        })
    }

    async updateImage(url: string): Promise<void> {
        profileService.updateById(this.element.id, { image: url }).then(() => {
            this.element.image = url
            Object.assign(this.elements[this.elementIndex], this.element)
            alert.success('Imagen cargada')
        })
    }

    async updateElement(): Promise<void> {
        profileService
            .updateById(this.element.id, {
                lastName: this.element.lastName,
                firstName: this.element.firstName,
                dni: this.element.dni?.replace('-', ''),
                passport: this.element.passport,
                telephone: this.element.telephone,
                mobile: this.element.mobile,
                email: this.element.email,
                address: this.element.address
            })
            .then(async updated => {
                if (updated) {
                    Object.assign(this.elements[this.elementIndex], this.element)
                    await this.updateUser()
                    alert.onUpdateSuccess('El perfil de usuario actualizado')
                }
            })
    }

    async deleteElement(): Promise<void> {
        await userService.deleteById(this.user.id).then(async () => {
            await profileService.deleteById(this.element.id).then(() => {
                this.elements.splice(this.elementIndex, 1)
                alert.onDeleteSuccess('Cuenta de usuario desactivada')
                this.clear()
            })
        })
    }

    async sendWelcomeEmail(): Promise<void> {
        if (this.element.email)
            emailService
                .welcome(this.element.email)
                .then(() =>
                    alert.success(
                        'Correo enviado',
                        'El correo electrónico de activación se envió correctamente'
                    )
                )
                .catch(() => {
                    alert.warning(
                        'Ups, algo salió mal',
                        'El correo electrónico de activación no se pudo enviar correctamente.'
                    )
                })
    }

    async submit(): Promise<void> {
        // eslint-disable-next-line
        //@ts-expect-error
        await this.$refs.form.validate()
        if (this.isValidForm === true) {
            if (this.elementIndex > -1) await this.updateElement()
            else await this.createElement()
        }
    }

    /********************************************************
     *                       Methods                         *
     ********************************************************/

    async toShowElement(element: ProfileModel): Promise<void> {
        this.elementIndex = this.elements.indexOf(element)
        this.element = Object.assign({}, element)
        await this.findUserByProfile(this.element.id)
    }

    clear(): void {
        this.elementIndex = -1
        this.element = createProfile()
        // eslint-disable-next-line
        //@ts-expect-error
        this.$refs.form.reset()
    }
}
