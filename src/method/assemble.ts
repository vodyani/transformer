import { ClassTransformOptions, plainToClass } from 'class-transformer';

import { Class } from '../common';

import { toDeepMerge } from './object';

/**
 * This method transforms a javascript object to instance of specific class.
 *
 * @see [ClassTransformOptions](https://github.com/typestack/class-transformer#advanced-usage)
 *
 * @param type The typescript class.
 * @param data The typescript object.
 * @param options Options to be passed during transformation, `excludeExtraneousValues` is enabled by default.
 * @returns plainToClass `class-transformer`.`plainToClass` result.
 *
 * @publicApi
 */
export function toAssemble(type: Class, data: object, options?: ClassTransformOptions) {
  const AssembleOptions = toDeepMerge({ excludeExtraneousValues: true }, options);
  return plainToClass(type, data, AssembleOptions);
}
