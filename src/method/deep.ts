import { camelCase, isArray, isNil, isObject, merge, snakeCase } from 'lodash';

export function toDeepConvertKey(data: any, transformer: (data: any) => any): any {
  if (!isNil(data) && isArray(data)) {
    return data.map((item: any) => toDeepConvertKey(item, transformer));
  }

  if (isNil(data) || !isObject(data)) {
    return data;
  }

  const result = Object();

  Object.keys(data).forEach(key => {
    result[transformer(key)] = toDeepConvertKey((data as any)[key], transformer);
  });

  return result;
}

export function toDeepCamelCase(data: any): any {
  return toDeepConvertKey(data, camelCase);
}

export function toDeepSnakeCase(data: any): any {
  return toDeepConvertKey(data, snakeCase);
}

export function toDeepMerge(base: any, source: any): any {
  if (isNil(source) && !isNil(base)) {
    return base;
  }

  const isArrayType = !isNil(base) && isArray(base) && !isNil(source) && isArray(source);
  const isObjectType = !isNil(base) && isObject(base) && !isNil(source) && isObject(source);

  return isArrayType || isObjectType ? merge(base, source) : source;
}
