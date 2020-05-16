import path from 'path';

import { boldCyan, notifyProcesses } from '../prompts';
import { readFile, writeFile, resolvePaths } from '../utils';
import parse from '../parser';

import { Temple, Context, Mapping } from '../runtypes';

/**
 * Process temple given mapping from CLI command.
 */
const handle = (temple: Temple, mapping: Mapping) => {
  const { template, output, default: defaultMapping } = temple;
  const [parsedTemplatePath, parsedOutputPath] = [
    template,
    output,
  ].map((path: string): string => parse(path, mapping, defaultMapping));

  const templateFile = readFile(parsedTemplatePath);
  const parsedTemplate = parse(templateFile, mapping, defaultMapping);

  writeFile(parsedOutputPath, parsedTemplate);
};

/**
 * Contextualizes temple with given context.
 */
export const contextualize = (temple: Temple, context: Context): Temple => {
  const templePaths = ['output', 'template'];

  try {
    return templePaths.reduce(
      (acc, p) => ({ ...acc, [p]: resolvePaths(context.base, temple[p]) }),
      temple
    );
  } catch (e) {
    throw new Error(
      `Invalid output path provided in a temple or its context: ${context.cmd}`
    );
  }
};

/**
 * Process all temples given CLI command configuration
 * and mapping.
 */
const temples = (temples: Temple[], context: Context, mapping: Mapping) => {
  notifyProcesses(
    `\nProcessing temples for: ${boldCyan(context.cmd)}`,
    temples.map((temple) => {
      const contextualizedTemple = contextualize(temple, context);
      const fileName = path.basename(contextualizedTemple.output);

      return {
        title: `Creating ${boldCyan(fileName)}`,
        task: () => handle(contextualizedTemple, mapping),
      };
    })
  );
};

export default temples;
