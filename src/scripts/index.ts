require('dotenv').config();
import {prompt as Prompt} from 'inquirer';
import {QuestionCollection} from 'inquirer';
import migrateDB from './migrate';
import help from './help';

async function cli(args: string[]) {
  // show help
  help(args);

  // migrate database
  if (args.includes('--migrate') || args.includes('-m')) {
    console.log('\x1b[36m%s\x1b[0m', 'Migrate the database.');
    const questions: QuestionCollection = {
      type: 'confirm',
      name: 'rebuild',
      default: false,
      message: 'rebuild database?',
    };
    const confirm = await Prompt(questions);

    await migrateDB(confirm.rebuild ? ['--rebuild'] : []).catch(err => {
      console.error('Cannot migrate database schema', err);
      process.exit(1);
    });
  }
}

// launch cli
cli(process.argv).catch(err => {
  console.error('Cannot run script', err);
  process.exit(1);
});
