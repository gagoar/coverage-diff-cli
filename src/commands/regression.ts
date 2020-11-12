import ora from 'ora';
import diff from 'coverage-diff';
import { NO_REGRESSION_COPY, REGRESSION_COPY, SUCCESS_SYMBOL } from '../utils/constants';
import { Command, getOptionsFromCommand } from '../utils/getOptionsFromCommand';
import { logger } from '../utils/debug';
import { readCoverageFiles } from '../utils/readCoverageFiles';

const debug = logger('diff');

export const command = async (options: Command): Promise<void> => {
  debug('input:', options);

  const { baseLocation, headLocation } = getOptionsFromCommand(options);

  const loader = ora('processing summaries...').start();

  try {
    const [base, head] = await readCoverageFiles(baseLocation, headLocation);

    const output = diff(base, head);

    loader.stopAndPersist({ text: output.regression ? REGRESSION_COPY : NO_REGRESSION_COPY, symbol: SUCCESS_SYMBOL });

    if (output.regression) {
      process.exit(1);
    }
  } catch (e) {
    loader.fail(`We encountered an error: ${e}`);
    process.exit(1);
  }
};
