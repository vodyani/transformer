import { isPromise } from 'util/types';

import { FunctionType } from '../common';
import { toDeepCamelCase, toDeepSnakeCase } from '../method';

export function ResultCameCase(_target: any, _property: string, descriptor: TypedPropertyDescriptor<FunctionType>) {
  const method = descriptor.value;

  descriptor.value = function(...args: any[]) {
    const result = method.apply(this, args);

    return isPromise(result)
      ? result.then(it => toDeepCamelCase(it))
      : toDeepCamelCase(result);
  };

  return descriptor;
}

export function ResultSnakeCase(_target: any, _property: string, descriptor: TypedPropertyDescriptor<FunctionType>) {
  const method = descriptor.value;

  descriptor.value = function(...args: any[]) {
    const result = method.apply(this, args);

    return isPromise(result)
      ? result.then(it => toDeepSnakeCase(it))
      : toDeepSnakeCase(result);
  };

  return descriptor;
}

export function ParamCameCase(_target: any, _property: string, descriptor: TypedPropertyDescriptor<FunctionType>) {
  const method = descriptor.value;

  descriptor.value = function(...args: any[]) {
    return method.apply(this, toDeepCamelCase(args));
  };

  return descriptor;
}

export function ParamSnakeCase(_target: any, _property: string, descriptor: TypedPropertyDescriptor<FunctionType>) {
  const method = descriptor.value;

  descriptor.value = function(...args: any[]) {
    return method.apply(this, toDeepSnakeCase(args));
  };

  return descriptor;
}
