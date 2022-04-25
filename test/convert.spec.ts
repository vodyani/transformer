import { describe, it, expect } from '@jest/globals';

import { convert, convertArray, convertNumber, convertObject, convertString } from '../src';

describe('test convert', () => {
  it('convert', async () => {
    expect(convert(undefined, 1)).toBe(1);
    expect(convert(null)).toBe(null);
    expect(convert(1, 10)).toBe(1);
    expect(convert(1)).toBe(1);
  });

  it('convertNumber', async () => {
    expect(convertNumber(undefined, 1)).toBe(1);
    expect(convertNumber(null)).toBe(0);
    expect(convertNumber(1, 10)).toBe(1);
    expect(convertNumber('1', 10)).toBe(1);
    expect(convertNumber(Number('test'), 1)).toBe(1);
  });

  it('convertString', async () => {
    expect(convertString(undefined, '1')).toBe('1');
    expect(convertString(null)).toBe('');
    expect(convertString(1, '10')).toBe('1');
    expect(convertString('1', '10')).toBe('1');
    expect(convertString(Number('0'), '1')).toBe('0');
  });

  it('convertArray', async () => {
    expect(convertArray(undefined, [1])[0]).toBe(1);
    expect(convertArray(null)[0]).toBe(undefined);
    expect(convertArray([], [1])[0]).toBe(1);
    expect(convertArray([1], [10])[0]).toBe(1);
    expect(convertArray([1], ['10' as any])[0]).toBe(1);
  });

  it('convertObject', async () => {
    expect(convertObject(undefined, { test: 1 }).test).toBe(1);
    expect(convertObject(null).test).toBe(undefined);
    expect(convertObject({}, { test: 1 }).test).toBe(1);
    expect(convertObject({ test: 1 }).test).toBe(1);
  });
});
