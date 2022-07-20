import { ClassTransformOptions, plainToClass } from 'class-transformer';

import { Class } from '../common';

import { toDeepMerge } from './object';

/**
 * This technique turns an object into an instance of a particular class.
 *
 * @see [ClassTransformOptions](https://github.com/typestack/class-transformer#advanced-usage)
 *
 * @param type The intended class for conversion.
 * @param data The source of data conversion.
 * @param options The class-transformer options. (`excludeExtraneousValues` is enabled by default)
 *
 * @publicApi
 */
export function toAssemble(type: Class, data: object, options?: ClassTransformOptions) {
  const AssembleOptions = toDeepMerge({ excludeExtraneousValues: true }, options);
  return plainToClass(type, data, AssembleOptions);
}
