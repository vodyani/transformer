import { describe, it, expect } from '@jest/globals';

import { toConvert, toNumber, toString } from '../src';

describe('convert', () => {
  it('toConvert', async () => {
    expect(toConvert(undefined, { replaced: 1 })).toBe(1);
    expect(toConvert(null)).toBe(null);
    expect(toConvert(1, { replaced: 10 })).toBe(1);
    expect(toConvert(1)).toBe(1);
  });

  it('toNumber', async () => {
    expect(toNumber(undefined, 1)).toBe(1);
    expect(toNumber(null)).toBe(0);
    expect(toNumber(1, 10)).toBe(1);
    expect(toNumber('1', 10)).toBe(1);
    expect(toNumber(Number('test'), 1)).toBe(1);
  });

  it('toString', async () => {
    expect(toString(undefined, '1')).toBe('1');
    expect(toString(null)).toBe('');
    expect(toString(1, '10')).toBe('1');
    expect(toString('1', '10')).toBe('1');
    expect(toString(Number('0'), '1')).toBe('0');
  });
});
