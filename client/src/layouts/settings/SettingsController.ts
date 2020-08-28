import Vue from 'vue'
import Component from 'vue-class-component'

@Component({ name: 'SettingsLayout' })
export default class SettingsLayout extends Vue {
    async beforeMount(): Promise<void> {
        await this.$store.dispatch('loadProfile')
    }

    private goBack() {
        this.$router.go(-1)
    }
}
