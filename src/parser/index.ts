import { compile } from 'handlebars';

/**
 * Parse source with given mapping, overriding the default
 */
export const parse = (
  source: string,
  mapping = {},
  defaultMapping = {}
): string => {
  const template = compile(source);
  return template({ ...defaultMapping, ...mapping });
};

export default parse;
