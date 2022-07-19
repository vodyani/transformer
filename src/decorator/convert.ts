import { ClassTransformOptions, Transform } from 'class-transformer';

import { toAssemble } from '../method';
import { Class, Method } from '../common';

/**
 * The data transformation.
 *
 * @see [@Transform](https://github.com/typestack/class-transformer#basic-usage)
 *
 * @param transformer The function that performs the transformation.
 * @returns PropertyDecorator
 *
 * @publicApi
 */
export function TransformValue(transformer: Method, ...args: []) {
  return Transform(({ value }) => transformer(value, ...args));
}
/**
 * Set data transformation.
 *
 * @see [ClassTransformOptions](https://github.com/typestack/class-transformer#advanced-usage)
 *
 * @param type The class.
 * @param options The class-transformer options, `excludeExtraneousValues` is enabled by default.
 * @returns PropertyDecorator
 *
 * @publicApi
 */
export function TransformSet(type: Class, options?: ClassTransformOptions) {
  return Transform(({ value }) => {
    if (value) {
      const result = new Set();
      value.forEach((it: any) => result.add(toAssemble(type, it, options)));
      return result;
    }
  });
}
/**
 * Map data transformation.
 *
 * @see [ClassTransformOptions](https://github.com/typestack/class-transformer#advanced-usage)
 *
 * @param type The class.
 * @param options The class-transformer options, `excludeExtraneousValues` is enabled by default.
 * @returns PropertyDecorator
 *
 * @publicApi
 */
export function TransformMap(type: Class, options?: ClassTransformOptions) {
  return Transform(({ obj, key }) => {
    const value: Map<any, Class> = obj[key];

    if (value) {
      const result: Map<any, Class> = new Map();
      value.forEach((v, k) => result.set(k, toAssemble(type, v, options)));
      return result;
    }
  });
}
