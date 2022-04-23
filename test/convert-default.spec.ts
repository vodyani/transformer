import { describe, it, expect } from '@jest/globals';

import { getDefault, getDefaultArray, getDefaultNumber, getDefaultObject, getDefaultString } from '../src';

describe('test', () => {
  it('getDefault', async () => {
    expect(getDefault(undefined, 1)).toBe(1);
    expect(getDefault(null)).toBe(null);
    expect(getDefault(1, 10)).toBe(1);
    expect(getDefault(1)).toBe(1);
  });

  it('getDefaultNumber', async () => {
    expect(getDefaultNumber(undefined, 1)).toBe(1);
    expect(getDefaultNumber(null)).toBe(0);
    expect(getDefaultNumber(1, 10)).toBe(1);
    expect(getDefaultNumber('1', 10)).toBe(1);
    expect(getDefaultNumber(Number('test'), 1)).toBe(1);
  });

  it('getDefaultString', async () => {
    expect(getDefaultString(undefined, '1')).toBe('1');
    expect(getDefaultString(null)).toBe('');
    expect(getDefaultString(1, '10')).toBe('1');
    expect(getDefaultString('1', '10')).toBe('1');
    expect(getDefaultString(Number('0'), '1')).toBe('0');
  });

  it('getDefaultArray', async () => {
    expect(getDefaultArray(undefined, [1])[0]).toBe(1);
    expect(getDefaultArray(null)[0]).toBe(undefined);
    expect(getDefaultArray([], [1])[0]).toBe(1);
    expect(getDefaultArray([1], [10])[0]).toBe(1);
    expect(getDefaultArray([1], ['10' as any])[0]).toBe(1);
  });

  it('getDefaultObject', async () => {
    expect(getDefaultObject(undefined, { test: 1 }).test).toBe(1);
    expect(getDefaultObject(null).test).toBe(undefined);
    expect(getDefaultObject({}, { test: 1 }).test).toBe(1);
    expect(getDefaultObject({ test: 1 }).test).toBe(1);
  });
});
