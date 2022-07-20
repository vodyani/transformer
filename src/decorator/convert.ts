import { ClassTransformOptions, Transform } from 'class-transformer';

import { toAssemble } from '../method';
import { Class, Method } from '../common';

/**
 * The transformation of the data.
 *
 * @see [@Transform](https://github.com/typestack/class-transformer#basic-usage)
 *
 * @param transformer the process that carries out the transition.
 *
 * @publicApi
 */
export function TransformValue(transformer: Method, ...args: []) {
  return Transform(({ value }) => transformer(value, ...args));
}
/**
 * The transformation of the `Set` data.
 *
 * @see [ClassTransformOptions](https://github.com/typestack/class-transformer#advanced-usage)
 *
 * @param type The intended class for conversion.
 * @param options The class-transformer options. (`excludeExtraneousValues` is enabled by default)
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
 * The transformation of the `Map` data.
 *
 * @see [ClassTransformOptions](https://github.com/typestack/class-transformer#advanced-usage)
 *
 * @param type The intended class for conversion.
 * @param options The class-transformer options. (`excludeExtraneousValues` is enabled by default)
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
