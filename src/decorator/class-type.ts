import { plainToClass, Transform } from 'class-transformer';

import { Class, FunctionType } from '../common';

export function ValueTransform(fn: FunctionType, ...args: []) {
  return Transform(({ value }) => fn(value, ...args));
}

export function SetTransform(type: Class) {
  return Transform(({ value }) => {
    if (value) {
      return new Set(value.map((it: any) => (plainToClass(type, it))));
    }
  });
}

export function MapTransform(type: Class) {
  return Transform(({ obj, key }) => {
    const value: Map<any, Class> = obj[key];

    if (value) {
      const result: Map<any, Class> = new Map();
      value.forEach((v, k) => (result.set(k, plainToClass(type, v))));
      return result;
    }
  });
}
