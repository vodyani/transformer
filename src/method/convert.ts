import { isArray, isEmpty, isNil, isObject } from 'lodash';

export function convert(it: any, replaced: any = null): any {
  return !isNil(it) ? it : replaced;
}

export function convertArray<T>(it: T[], replaced: T[] = []): T[] {
  return !isNil(it) && !isEmpty(it) && isArray(it) ? it : replaced;
}

export function convertObject<T>(it: T, replaced: T = Object()): T {
  return !isNil(it) && !isEmpty(it) && isObject(it) ? it : replaced;
}

export function convertString(it: any, replaced = ''): string {
  const result = String(it);

  return !isNil(it) && !isEmpty(result) ? result : replaced;
}

export function convertNumber(it: any, replaced = 0): number {
  const result = Number(it);

  return !isNil(it) && !isNaN(result) ? result : replaced;
}
