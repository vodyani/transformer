/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, it, expect } from '@jest/globals';

import { toConvert, toNumber, toString, toBuffer, toStream, ResultTransformer, ArgumentTransformer } from '../src';

describe('convert', () => {
  it('toConvert', async () => {
    expect(toConvert(undefined, { default: 1 })).toBe(1);
    expect(toConvert(null)).toBe(null);
    expect(toConvert(1, { default: 10 })).toBe(1);
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

  it('toStream toBuffer', async () => {
    const buf = Buffer.from('1', 'utf-8');
    const result = await toStream(buf);
    const convertResult = await toBuffer(result);
    expect(convertResult.toString()).toBe('1');
  });

  it('ResultTransformer', async () => {
    class Demo {
      @ResultTransformer(toString)
      // @ts-ignore
      public getName() {
        return null;
      }

      @ResultTransformer(toNumber)
      // @ts-ignore
      public async asyncGetName() {
        return null;
      }
    }
    const demo = new Demo();

    expect(demo.getName()).toBe('');
    expect(await demo.asyncGetName()).toBe(0);
  });

  it('ArgumentTransformer', async () => {
    function fn(...args: any[]) {
      return args.map(toNumber);
    }

    class Demo {
      @ArgumentTransformer(fn)
      // @ts-ignore
      public returnAge(age: number) {
        return age;
      }
    }

    expect(new Demo().returnAge('1' as any)).toBe(1);
  });
});
