import { describe, it, expect } from '@jest/globals';

import { toDeepMerge } from '../src';

describe('test', () => {
  it('toDeepMerge', async () => {
    const base = { a: 1, b: 2 };
    const source = { a: 3, c: 4 };
    expect(toDeepMerge(base, source)).toEqual({ a: 3, b: 2, c: 4 });
    expect((base as any).c).toBe(4);

    const base2 = { a: [{ b: 1 }], b: { c: [{ d: 1 }, { e: 2 }] }};
    const source2 = { a: [{ b: 3, g: 6 }, { c: 4 }], b: { c: [{ d: 3 }, { e: 4 }] }};
    expect(toDeepMerge(base2, source2)).toEqual({ a: [{ b: 3, g: 6 }, { c: 4 }], b: { c: [{ d: 3 }, { e: 4 }] }});
    expect((base2.a[1] as any).c).toBe(4);

    const base3 = { test: { test1: 1 }};
    const source3 = { test: { test1: '1', test2: 2 }};
    expect(toDeepMerge(base3, source3)).toEqual({ test: { test1: '1', test2: 2 }});

    const base4 = [1, 2, 3];
    const source4 = [4, 5, 6];
    expect(toDeepMerge(base4, source4)).toEqual([4, 5, 6]);
    expect(base4[0]).toBe(4);

    const base5 = [1, 2, 3, { b: 1 }];
    const source5 = [4, 5, 6, { a: 1 }, 7];
    expect(toDeepMerge(base5, source5)).toEqual([4, 5, 6, { a: 1, b: 1 }, 7]);
    expect(base5[0]).toBe(4);

    const base6 = 1;
    const source6 = 2;
    expect(toDeepMerge(base6, source6)).toBe(2);
    expect(base6).toBe(1);

    const base7 = 1;
    const source7: any = null;
    expect(toDeepMerge(base7, source7)).toBe(1);

    const base8 = [1];
    const source8 = [2];
    expect(toDeepMerge(base8, source8)).toEqual([2]);
  });
});
