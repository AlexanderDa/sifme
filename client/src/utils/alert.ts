import Vue from 'vue'

class VueAlert {
    private render(message: string, caption?: string): string {
        return `
  ${message && caption ? `<b>${message}</b>` : `<span>${message}</span>`}
  <div class="toast-caption">${caption ? caption : ''}</div>
  `
    }

    public success(message: string, caption?: string): void {
        // eslint-disable-next-line
        // @ts-ignore
        Vue.$toast.success(this.render(message, caption))
    }

    public error(message: string, caption?: string): void {
        // eslint-disable-next-line
        // @ts-ignore
        Vue.$toast.error(this.render(message, caption), { duration: 5000 })
    }

    public warning(message: string, caption?: string): void {
        // eslint-disable-next-line
        // @ts-ignore
        Vue.$toast.warning(this.render(message, caption))
    }

    public info(message: string, caption?: string): void {
        // eslint-disable-next-line
        // @ts-ignore
        Vue.$toast.info(this.render(message, caption))
    }

    private expiredSession(): void {
        throw new Error('Unauthorized')
    }

    public onCreateSuccess(caption?: string): void {
        this.success('Registro exitoso', caption)
    }
    public onUpdateSuccess(caption?: string): void {
        this.success('Actualización exitosa', caption)
    }
    public onDeleteSuccess(caption?: string): void {
        this.success('Eliminación exitosa', caption)
    }

    // eslint-disable-next-line
    public onCreateError(error: any, model?: string): void {
        switch (error.status) {
            case 401:
                this.expiredSession()
                break
            case 409:
                switch (error.body.error.message) {
                    case 'EMAIL_IN_USE':
                        this.warning(
                            'Confictivo',
                            `El correo electrónico ya está en uso.`
                        )
                        break

                    default:
                        this.warning(
                            'Confictivo',
                            `El ${model ?? 'registro'} es duplicado.`
                        )
                        break
                }
                break

            default:
                this.error('Error', 'El registro no se pudo guardar.')
                break
        }
    }

    // eslint-disable-next-line
    public onDeleteError(error: any, model?: string): void {
        switch (error.status) {
            case 401:
                this.expiredSession()
                break
            case 409:
                this.warning('Confictivo', `El ${model ?? 'registro'} está en uso.`)
                break

            default:
                this.error('Error', 'El registro no se pudo eliminar.')
                break
        }
    }
}

export default new VueAlert()
