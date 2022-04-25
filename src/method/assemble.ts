import { ClassTransformOptions, plainToClass } from 'class-transformer';

import { Class } from '../common';

/**
 * This method transforms a javascript object to instance of specific class.
 *
 * @param type class
 * @param data javascript object
 * @param options Options to be passed during transformation, `excludeExtraneousValues` is enabled by default
 */
export function classAssemble(
  type: Class,
  data: object,
  options?: ClassTransformOptions,
) {
  const AssembleOptions = options
    ? { excludeExtraneousValues: true, ...options }
    : { excludeExtraneousValues: true };

  return plainToClass(type, data, AssembleOptions);
}
