import { isPromise } from 'util/types';

import { ClassTransformOptions } from 'class-transformer';

import { toAssemble } from '../method';
import { Class, Method } from '../common';

/**
 * After the function completes execution, the result is automatically loaded based on the class passed in.
 *
 * It is recommended to use this decorator only if you specify the return value!
 *
 * @see [ClassTransformOptions](https://github.com/typestack/class-transformer#advanced-usage)
 *
 * @param type The class.
 * @param options The class-transformer options, `excludeExtraneousValues` is enabled by default.
 * @returns PropertyDecorator
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
