import ora from 'ora';
import diff from 'coverage-diff';
import { SUCCESS_SYMBOL } from '../utils/constants';
import { Command, getOptionsFromCommand } from '../utils/getOptionsFromCommand';
import { logger } from '../utils/debug';
import { readCoverageFiles } from '../utils/readCoverageFiles';
import { copyForRegression } from '../utils/copyForRegression';

const debug = logger('diff');

export const command = async (options: Command): Promise<void> => {
  debug('input:', options);

  const { baseLocation, headLocation } = getOptionsFromCommand(options);

  const loader = ora('processing summaries...\n').start();

  try {
    const [base, head] = await readCoverageFiles(baseLocation, headLocation);

    const output = diff(base, head);

    console.log(output.results);

    loader.stopAndPersist({ text: copyForRegression(output.regression), symbol: SUCCESS_SYMBOL });
  } catch (e) {
    loader.fail(`We encountered an error: ${e}`);
    process.exit(1);
  }
};
