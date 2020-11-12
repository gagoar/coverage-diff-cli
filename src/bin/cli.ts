#! /usr/bin/env node
import program from 'commander';

import { diffCommand, regressionCommand, resultsCommand } from '../commands';
import packageJSON from '../../package.json';

program
  .name(packageJSON.name)
  .version(packageJSON.version)
  .description(packageJSON.description)
  .requiredOption(
    '-b --baseLocation <path/to/the/base/json-summary.json>',
    'The base summary (frequently on master/main branch), for more details: https://istanbul.js.org/docs/advanced/alternative-reporters/#json-summary'
  )
  .requiredOption(
    '-h --headLocation <path/to/the/head/json-summary.json>',
    'The head summary (frequently coming from changes in a PR), for more details: https://istanbul.js.org/docs/advanced/alternative-reporters/#json-summary'
  );

program
  .command('diff')
  .description('It will return a diff (json format) between base and head summary diffs')
  .action(diffCommand);
program
  .command('regression')
  .description('It will exit with 0 or 1 if was a regression or not')
  .action(regressionCommand);
program
  .command('results')
  .description('It will display a markdown table with the differential and regressions')
  .action(resultsCommand);

program.parse(process.argv);
