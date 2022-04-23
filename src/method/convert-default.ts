import { isArray, isEmpty, isNil, isObject } from 'lodash';

export function getDefault(it: any, replaced: any = null): any {
  return !isNil(it) ? it : replaced;
}

export function getDefaultArray<T>(it: T[], replaced: T[] = []): T[] {
  return !isNil(it) && !isEmpty(it) && isArray(it) ? it : replaced;
}

export function getDefaultObject<T>(it: T, replaced: T = Object()): T {
  return !isNil(it) && !isEmpty(it) && isObject(it) ? it : replaced;
}

export function getDefaultString(it: any, replaced = ''): string {
  const result = String(it);

  return !isNil(it) && !isEmpty(result) ? result : replaced;
}

export function getDefaultNumber(it: any, replaced = 0): number {
  const result = Number(it);

  if (!isNil(it) && !isNaN(result)) {
    return result;
  }

  return replaced;
}
