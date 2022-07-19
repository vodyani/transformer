/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, it, expect } from '@jest/globals';

import {
  toDeepCamelCase, toDeepSnakeCase, toDeepMerge,
  ParamCameCase, ParamSnakeCase, ResultCameCase, ResultSnakeCase,
} from '../src';

class Demo {
  // @ts-ignore
  @ParamCameCase ParamCameCase(data: object) { return data }
  // @ts-ignore
  @ParamSnakeCase async ParamSnakeCase(data: object) { return data }
  // @ts-ignore
  @ResultCameCase async ResultCameCase() { return { test_result: 1 } }
  // @ts-ignore
  @ResultSnakeCase async ResultSnakeCase() { return { testResult: 1 } }
  // @ts-ignore
    @ResultCameCase ResultCameCase1() { return { test_result: 1 } }
    // @ts-ignore
  @ResultSnakeCase ResultSnakeCase1() { return { testResult: 1 } }
  // @ts-ignore
  @ResultCameCase async Error2() { throw new Error('test') }
  // @ts-ignore
  @ResultSnakeCase async Error3() { throw new Error('test') }
  // @ts-ignore
  @ParamCameCase Error4() { throw new Error('test') }
  // @ts-ignore
  @ParamSnakeCase Error5() { throw new Error('test') }
}

describe('test deep', () => {
  it('toDeepCamelCase', async () => {
    expect(toDeepCamelCase({ 'user_id': 1 }).userId).toBe(1);
    expect(toDeepCamelCase({ 'user id': 1 }).userId).toBe(1);
    expect(toDeepCamelCase({ '_User Id': 1 }).userId).toBe(1);
    expect(toDeepCamelCase({ 'user-id': 1 }).userId).toBe(1);
    expect(toDeepCamelCase([{ 'user-id': 1 }])[0].userId).toBe(1);
    expect(toDeepCamelCase([{ 'user-id': [{ 'USER_ID': 2 }] }])[0].userId[0].userId).toBe(2);
  });

  it('toDeepSnakeCase', async () => {
    expect(toDeepSnakeCase({ 'userId': 1 }).user_id).toBe(1);
    expect(toDeepSnakeCase({ 'user id': 1 }).user_id).toBe(1);
    expect(toDeepSnakeCase({ '_User Id': 1 }).user_id).toBe(1);
    expect(toDeepSnakeCase({ 'userId': 1 }).user_id).toBe(1);
    expect(toDeepSnakeCase([{ 'userId': 1 }])[0].user_id).toBe(1);
    expect(toDeepSnakeCase([{ 'userId': [{ 'userId': 2 }] }])[0].user_id[0].user_id).toBe(2);
  });

  it('toDeepMerge', async () => {
    const base = { a: 1, b: 2 };
    const source = { a: 3, c: 4 };
    expect(toDeepMerge(base, source)).toEqual({ a: 3, b: 2, c: 4 });
    expect((base as any).c).toBe(undefined);

    const base2 = { a: [{ b: 3 }], b: { c: [{ d: 1 }, { e: 2 }] }};
    const source2 = { a: [{ b: 3, g: 6 }, { c: 4 }], b: { c: [{ d: 3 }, { e: 4 }] }};
    expect(toDeepMerge(base2, source2)).toEqual({
      'a': [
        {
          'b': 3,
        },
        {
          'b': 3,
          'g': 6,
        },
        {
          'c': 4,
        },
      ],
      'b': {
        'c': [
          {
            'd': 1,
          },
          {
            'e': 2,
          },
          {
            'd': 3,
          },
          {
            'e': 4,
          },
        ],
      },
    });
    expect(base2.a[1]).toBe(undefined);

    const base3 = { test: { test1: 1 }};
    const source3 = { test: { test1: '1', test2: 2 }};
    expect(toDeepMerge(base3, source3)).toEqual({ test: { test1: '1', test2: 2 }});

    const base4 = [1, 2, 3];
    const source4 = [4, 5, 6];
    expect(toDeepMerge(base4, source4)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(base4[0]).toBe(1);

    const base5 = [1, 2, 3, { b: 1 }];
    const source5 = [4, 5, 6, { a: 1 }, 7];
    expect(toDeepMerge(base5, source5)).toEqual([1, 2, 3, { 'b': 1 }, 4, 5, 6, { 'a': 1 }, 7]);
    expect(base5[0]).toBe(1);

    const base6 = 1;
    const source6 = 2;
    expect(toDeepMerge(base6, source6)).toBe(2);
    expect(base6).toBe(1);

    const base7 = 1;
    const source7: any = null;
    expect(toDeepMerge(base7, source7)).toBe(1);

    const source8 = 1;
    const base8: any = null;
    expect(toDeepMerge(base8, source8)).toBe(1);

    const base9 = [1];
    const source9 = [2];
    expect(toDeepMerge(base9, source9)).toEqual([1, 2]);

    const baseSet = new Set([1, 2, 3]);
    const sourceSet = new Set([1, 2, 4]);
    expect(toDeepMerge(baseSet, sourceSet)).toEqual(new Set([1, 2, 3, 4]));

    const baseMap = new Map();
    const sourceMap = new Map();
    const resultMap = new Map();

    baseMap.set(1, 1);
    sourceMap.set(2, 2);
    resultMap.set(1, 1);
    resultMap.set(2, 2);
    expect(toDeepMerge(baseMap, sourceMap)).toEqual(resultMap);

    expect(toDeepMerge({ foo: ['a', 'b', 'c'] }, { foo: ['d'] })).toEqual({ foo: ['a', 'b', 'c', 'd'] });
  });
});

describe('decorator', () => {
  const demo = new Demo();
  it('ParamCameCase', async () => {
    expect(demo.ParamCameCase({ test_data: 1 })).toEqual({ testData: 1 });
  });

  it('ParamSnakeCase', async () => {
    expect(await demo.ParamSnakeCase({ testData: 1 })).toEqual({ test_data: 1 });
  });

  it('ResultCameCase', async () => {
    expect(demo.ResultCameCase1()).toEqual({ testResult: 1 });
    expect(await demo.ResultCameCase()).toEqual({ testResult: 1 });
  });

  it('ResultSnakeCase', async () => {
    expect(demo.ResultSnakeCase1()).toEqual({ test_result: 1 });
    expect(await demo.ResultSnakeCase()).toEqual({ test_result: 1 });
  });

  it('error', async () => {
    try {
      await demo.Error2();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
    try {
      await demo.Error3();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
    try {
      demo.Error4();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
    try {
      demo.Error5();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
