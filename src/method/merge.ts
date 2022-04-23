import { isArray, isNil, isObject, merge } from 'lodash';

export function toDeepMerge(base: any, source: any): any {
  if (isNil(source) && !isNil(base)) {
    return base;
  }

  const isArrayType = !isNil(base) && isArray(base) && !isNil(source) && isArray(source);
  const isObjectType = !isNil(base) && isObject(base) && !isNil(source) && isObject(source);

  return isArrayType || isObjectType ? merge(base, source) : source;
}
