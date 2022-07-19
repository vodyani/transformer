import { isPromise } from 'util/types';

import { Method } from '../common';

/**
 * After the function is finished, the result of the function execution is changed by passing in a transformer.
 *
 * @param transformer The transition function.
 * @returns TypedPropertyDescriptor<Method<any>>
 *
 * @publicApi
 */
export function TransformResult(transformer: Method) {
  return function (_target: any, _property: string, descriptor: TypedPropertyDescriptor<Method>) {
    const method = descriptor.value;

    descriptor.value = function(...args: any[]) {
      const result = method.apply(this, args);
      return isPromise(result) ? result.then(it => transformer(it)) : transformer(result);
    };

    return descriptor;
  };
}
/**
 * Before the function is executed, the arguments of the function are changed through the passed transformer.
 *
 * @param transformer The transition function.
 * @returns TypedPropertyDescriptor<Method<any>>
 *
 * @publicApi
 */
export function TransformArgument(transformer: Method) {
  return function (_target: any, _property: string, descriptor: TypedPropertyDescriptor<Method>) {
    const method = descriptor.value;

    descriptor.value = function(...args: any[]) {
      return method.apply(this, transformer(args));
    };

    return descriptor;
  };
}
