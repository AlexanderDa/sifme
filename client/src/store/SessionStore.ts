import { VuexModule, Action, Mutation, Module } from 'vuex-module-decorators'
import { ProfileModel, createProfile } from '@/models'
import accountService from '@/services/AccountService'
import profileService from '@/services/ProfileService'

@Module
export default class SessionStore extends VuexModule {
    private profile: ProfileModel = createProfile()
    private duration!: number

    @Mutation
    setProfile(profile: ProfileModel) {
        this.profile = profile
    }
    @Mutation
    setDuration(duration: number) {
        this.duration = duration
    }

    @Action({ commit: 'setProfile' })
    async loadProfile(): Promise<ProfileModel> {
        const me = await accountService.me()
        const profile = await profileService.findFromUserId(me.id)
        return profile
    }
}
