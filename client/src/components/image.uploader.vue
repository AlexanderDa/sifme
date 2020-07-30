<template>
    <div>
        <v-avatar size="100px">
            <v-img :src="src" />
        </v-avatar>
        <v-file-input
            style="margin-top: -40px; margin-left: 90px;"
            @change="selected"
            prepend-icon="camera_alt"
            accept="image/png, image/jpeg"
            hide-input
            :disabled="disabled"
        ></v-file-input>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Emit } from 'vue-property-decorator'

@Component({ name: 'v-image-uploader' })
export default class ImageUploader extends Vue {
    @Prop() src!: string
    @Prop({ default: false }) disabled!: boolean

    async selected(file: File): Promise<void> {
        if (file) {
            var formData = new FormData()
            formData.append('file', file)
            // eslint-disable-next-line
            // @ts-ignore
            const res = await this.$http.post('/api/storage/image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            const data = await res.json()
            this.onUpload(data.url)
        }
    }

    @Emit('onUpload')
    onUpload(value: string): string {
        return value
    }
}
</script>
