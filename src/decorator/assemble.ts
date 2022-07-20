import { isPromise } from 'util/types';

import { ClassTransformOptions } from 'class-transformer';

import { toAssemble } from '../method';
import { Class, Method } from '../common';

/**
 * Following the function's successful completion, the result is automatically loaded using the class that was supplied.
 *
 * @tips This decorator should only be used if the return value is specified.
 *
 * @see [ClassTransformOptions](https://github.com/typestack/class-transformer#advanced-usage)
 *
 * @param type The intended class for conversion.
 * @param options The class-transformer options. (`excludeExtraneousValues` is enabled by default)
 *
 * @publicApi
 */
export function Assemble(type: Class, options?: ClassTransformOptions) {
  return function(_target: any, _property: string, descriptor: TypedPropertyDescriptor<Method>) {
    const method = descriptor.value;

    descriptor.value = function(...args: any[]) {
      const result = method.apply(this, args);

      return isPromise(result)
        ? result.then((data: object) => toAssemble(type, data, options))
        : toAssemble(type, result, options);
    };

    return descriptor;
  };
}
