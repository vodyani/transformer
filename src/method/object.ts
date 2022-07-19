import {
  camelCase,
  capitalize,
  isArray,
  isMap,
  isNil,
  isObject,
  isSet,
  kebabCase,
  lowerCase,
  lowerFirst,
  snakeCase,
  toLower,
  toUpper,
  upperCase,
  upperFirst,
} from 'lodash';
import { deepmerge } from 'deepmerge-ts';
import { isDictionary } from '@vodyani/utils';

import { Method } from '../common';

/**
 * The two incoming data are compared and deeply merged.
 *
 * @param base The underlying data being compared.
 * @param source New data merged into the underlying data.
 * @returns `T` | `any`
 *
 * @publicApi
 *
 * @tips `base` will be deeply copied before merging, so it will not be changed.
 */
export function toDeepMerge(base: any, source: any) {
  if (!isNil(base) && !!isNil(source)) return base;
  if (!(isObject(base) && isObject(source))) return source;
  return deepmerge(base, source);
}
/**
 * Formatting properties of the object structure in the data.
 *
 * @param data The data source.
 * @param transformer A callback function used to convert properties.
 * @returns any
 *
 * @publicApi
 *
 * @tips Because this method uses recursion, it can cause stack overflows when the hierarchy is too deep !
 */
export function toDeepConvertProperty(data: any, transformer: Method<string>): any {
  if (isNil(data)) return data;

  const pipe = [
    {
      isAllowUse: isArray(data),
      use: () => {
        return data.map((item: any) => toDeepConvertProperty(item, transformer));
      },
    },
    {
      isAllowUse: isSet(data),
      use: () => {
        const result = new Set();
        (data as Set<any>).forEach((e: any) => result.add(toDeepConvertProperty(e, transformer)));
        return result;
      },
    },
    {
      isAllowUse: isMap(data),
      use: () => {
        const result = new Map();
        (data as Map<any, any>).forEach((v, k) => result.set(toDeepConvertProperty(k, transformer), toDeepConvertProperty(v, transformer)));
        return result;
      },
    },
    {
      isAllowUse: isDictionary(data),
      use: () => {
        const result = Object();
        Object.keys(data).forEach((key: any) => {
          result[transformer(key)] = toDeepConvertProperty(data[key], transformer);
        });
        return result;
      },
    },
  ];

  for (const { isAllowUse, use } of pipe) {
    return isAllowUse ? use() : data;
  }
}
/**
 * Formatting properties of the object structure in the data.
 *
 * @see [transformer(camelCase)](https://lodash.com/docs/#camelCase)
 *
 * @param data The data source.
 * @returns any
 *
 * @publicApi
 *
 * @tips Because this method uses recursion, it can cause stack overflows when the hierarchy is too deep !
 */
export function toDeepCamelCase(data: any): any {
  return toDeepConvertProperty(data, camelCase);
}
/**
 * Formatting properties of the object structure in the data.
 *
 * @see [transformer(snakeCase)](https://lodash.com/docs/#snakeCase)
 *
 * @param data The data source.
 * @returns any
 *
 * @publicApi
 *
 * @tips Because this method uses recursion, it can cause stack overflows when the hierarchy is too deep !
 */
export function toDeepSnakeCase(data: any): any {
  return toDeepConvertProperty(data, snakeCase);
}
/**
 * Formatting properties of the object structure in the data.
 *
 * @see [transformer(capitalize)](https://lodash.com/docs/#capitalize)
 *
 * @param data The data source.
 * @returns any
 *
 * @publicApi
 *
 * @tips Because this method uses recursion, it can cause stack overflows when the hierarchy is too deep !
 */
export function toDeepCapitalize(data: any): any {
  return toDeepConvertProperty(data, capitalize);
}
/**
 * Formatting properties of the object structure in the data.
 *
 * @see [transformer(kebabCase)](https://lodash.com/docs/#kebabCase)
 *
 * @param data The data source.
 * @returns any
 *
 * @publicApi
 *
 * @tips Because this method uses recursion, it can cause stack overflows when the hierarchy is too deep !
 */
export function toDeepKebabCase(data: any): any {
  return toDeepConvertProperty(data, kebabCase);
}
/**
 * Formatting properties of the object structure in the data.
 *
 * @see [transformer(lowerCase)](https://lodash.com/docs/#lowerCase)
 *
 * @param data The data source.
 * @returns any
 *
 * @publicApi
 *
 * @tips Because this method uses recursion, it can cause stack overflows when the hierarchy is too deep !
 */
export function toDeepLowerCase(data: any): any {
  return toDeepConvertProperty(data, lowerCase);
}
/**
 * Formatting properties of the object structure in the data.
 *
 * @see [transformer(lowerFirst)](https://lodash.com/docs/#lowerFirst)
 *
 * @param data The data source.
 * @returns any
 *
 * @publicApi
 *
 * @tips Because this method uses recursion, it can cause stack overflows when the hierarchy is too deep !
 */
export function toDeepLowerFirst(data: any): any {
  return toDeepConvertProperty(data, lowerFirst);
}
/**
 * Formatting properties of the object structure in the data.
 *
 * @see [transformer(upperCase)](https://lodash.com/docs/#upperCase)
 *
 * @param data The data source.
 * @returns any
 *
 * @publicApi
 *
 * @tips Because this method uses recursion, it can cause stack overflows when the hierarchy is too deep !
 */
export function toDeepUpperCase(data: any): any {
  return toDeepConvertProperty(data, upperCase);
}
/**
 * Formatting properties of the object structure in the data.
 *
 * @see [transformer(upperFirst)](https://lodash.com/docs/#upperFirst)
 *
 * @param data The data source.
 * @returns any
 *
 * @publicApi
 *
 * @tips Because this method uses recursion, it can cause stack overflows when the hierarchy is too deep !
 */
export function toDeepUpperFirst(data: any): any {
  return toDeepConvertProperty(data, upperFirst);
}
/**
 * Formatting properties of the object structure in the data.
 *
 * @see [transformer(toLower)](https://lodash.com/docs/#toLower)
 *
 * @param data The data source.
 * @returns any
 *
 * @publicApi
 *
 * @tips Because this method uses recursion, it can cause stack overflows when the hierarchy is too deep !
 */
export function toDeepLower(data: any): any {
  return toDeepConvertProperty(data, toLower);
}
/**
 * Formatting properties of the object structure in the data.
 *
 * @see [transformer(toUpper)](https://lodash.com/docs/#toUpper)
 *
 * @param data The data source.
 * @returns any
 *
 * @publicApi
 *
 * @tips Because this method uses recursion, it can cause stack overflows when the hierarchy is too deep !
 */
export function toDeepUpper(data: any): any {
  return toDeepConvertProperty(data, toUpper);
}
