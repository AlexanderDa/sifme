export default function help(args: string[]) {
  // show help
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
          -h  --help      Show all help
          -m  --migrate   Migrate the database
          `);
  }

  // if there are no arguments
  if (
    !args.includes('-h') &&
    !args.includes('--help') &&
    !args.includes('-m') &&
    !args.includes('--migrate')
  ) {
    console.log(`Try with:
          \x1b[36mnpm:\x1b[0m     npm run cli -- [option]
          \x1b[36myarn:\x1b[0m    yarn cli [option]
          `);
  }
}
