import Listr, { ListrTask } from 'listr';
import { isEmpty, List } from 'lodash';
import { Select, Input } from 'enquirer';
import clc from 'cli-color';

export const boldCyan = clc.cyan.bold;

/**
 * Prompt for command name.
 */
export const promptCommand = async (commands: string[]): Promise<string> => {
  const prompt = new Select({
    name: 'command',
    message: 'Select command to run:',
    choices: commands,
  });

  return await prompt.run();
};

/**
 * Prompt for the value for each key.
 *
 * @params {String} command | name of command
 * @params {String[]} keys | list of keys
 *
 * @returns {Object} key to value mapping
 */
export const promptMapping = async (
  command: string,
  keys: string[] = []
): Promise<object> => {
  if (isEmpty(keys)) {
    return {};
  }

  console.log(`\nDictionary for ${boldCyan(command)}:`);
  let mapping = {};

  for (const key of keys) {
    const prompt = new Input({
      message: key,
    });

    const value = await prompt.run();
    mapping = { ...mapping, [key]: value };
  }

  return mapping;
};

/**
 * Run and notify given Listr processes.
 */
export const notifyProcesses = (
  headline: string,
  processes: ListrTask<object>[],
  options = { exitOnError: false }
) => {
  console.log(headline);
  new Listr(processes, options).run().catch((err: Error) => console.error(err));
};
