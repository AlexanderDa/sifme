/**
 * Generate a random character string
 * @param length Number of characters
 * @param date include date
 */
function randomString(length: number, date?: boolean): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$'
    let random = ''
    for (let i = 0; i < length; i++) {
        random += characters.charAt(Math.floor(Math.random() * characters.length))
    }
    return date ? `${random}.${Date.now()}` : random
}

export const random = {
    /**
     * Generate a random string for account verification code
     * @param email
     */
    emailVerifiedCode: (email: string): string => {
        return `${email.split('@')[0]}:${randomString(10, false)}`
    }
}
