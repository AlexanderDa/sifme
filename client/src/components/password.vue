<template>
    <v-text-field
        color="primary"
        :append-icon="showPwd ? 'visibility_off' : 'visibility'"
        :label="label"
        :type="showPwd ? 'text' : 'password'"
        required
        :value="value"
        @input="input"
        @click:append="onAppendIconClick()"
    />
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'

@Component({ name: 'v-password-field' })
export default class LoginView extends Vue {
    @Prop() value!: number
    @Prop() time!: number
    @Prop({ default: 'Contraseña' }) label!: string

    private showPwd: boolean = false

    onAppendIconClick() {
        this.showPwd = !this.showPwd
        if (this.time && this.showPwd) {
            setTimeout(() => {
                this.showPwd = false
            }, this.time)
        }
    }

    @Emit('input')
    input(value: string): string {
        return value
    }
}
</script>
