import { camelCase, isArray, isNil, isObject, snakeCase } from 'lodash';

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
