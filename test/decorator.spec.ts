/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, it, expect } from '@jest/globals';

import { getDefaultNumber, ParamCameCase, ParamSnakeCase, ResultCameCase, ResultDefault, ResultSnakeCase } from '../src';

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
  @ResultDefault('', null) async ResultDefault() { return null }
  // @ts-ignore
  @ResultDefault(12, getDefaultNumber) async ResultDefaultConvert2() { return null }
  // @ts-ignore
  @ResultDefault() async ResultDefaultConvert3() { return undefined }
  // @ts-ignore
  @ResultDefault() async Error1() { throw new Error('test') }
  // @ts-ignore
  @ResultCameCase async Error2() { throw new Error('test') }
  // @ts-ignore
  @ResultSnakeCase async Error3() { throw new Error('test') }
  // @ts-ignore
  @ParamCameCase Error4() { throw new Error('test') }
  // @ts-ignore
  @ParamSnakeCase Error5() { throw new Error('test') }
}

describe('test', () => {
  const demo = new Demo();
  it('ParamCameCase', async () => {
    expect(demo.ParamCameCase({ test_data: 1 })).toEqual({ testData: 1 });
  });

  it('ParamSnakeCase', async () => {
    expect(await demo.ParamSnakeCase({ testData: 1 })).toEqual({ test_data: 1 });
  });

  it('ResultCameCase', async () => {
    expect(await demo.ResultCameCase()).toEqual({ testResult: 1 });
  });

  it('ResultSnakeCase', async () => {
    expect(await demo.ResultSnakeCase()).toEqual({ test_result: 1 });
  });

  it('ResultDefault', async () => {
    expect(await demo.ResultDefault()).toEqual('');
    expect(await demo.ResultDefaultConvert2()).toEqual(12);
    expect(await demo.ResultDefaultConvert3()).toEqual(null);
  });

  it('error', async () => {
    try {
      await demo.Error1();
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
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
