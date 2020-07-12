export const cli = {
    error: (msg: string): string => {
        return `\x1b[31mError\x1b[0m  ${msg} `
    },
    success: (msg: string): string => {
        return `\x1b[32mSuccess\x1b[0m  ${msg} `
    },
    warning: (msg: string): string => {
        return `\x1b[33mWarning\x1b[0m  ${msg} `
    },
    info: (msg: string): string => {
        return `\x1b[36mInfo\x1b[0m  ${msg} `
    },
    noAccess: (msg: string): string => {
        return `\x1b[33mNo access:   \x1b[0m${msg}`
    },
    withAccess: (msg: string): string => {
        return `\x1b[36mWith access: \x1b[0m${msg}`
    }
}
