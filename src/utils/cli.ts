export const cli = {
  error: (msg: string): string => {
    return `\x1b[31m${msg}\x1b[0m`;
  },
  success: (msg: string): string => {
    return `\x1b[32m${msg}\x1b[0m`;
  },
  warning: (msg: string): string => {
    return `\x1b[33m${msg}\x1b[0m`;
  },
  info: (msg: string): string => {
    return `\x1b[36m${msg}\x1b[0m`;
  },
};
