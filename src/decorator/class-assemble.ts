import { isPromise } from 'util/types';

import { ClassTransformOptions } from 'class-transformer';

import { classAssemble } from '../method';
import { Class, FunctionType } from '../common';

export function Assemble(type: Class, options?: ClassTransformOptions) {
  return function(_target: any, _property: string, descriptor: TypedPropertyDescriptor<FunctionType>) {
    const method = descriptor.value;

    descriptor.value = function(...args: any[]) {
      const result = method.apply(this, args);

      return isPromise(result)
        ? result.then((it: object) => classAssemble(type, it, options))
        : classAssemble(type, result, options);
    };

    return descriptor;
  };
}
