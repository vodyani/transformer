/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/member-ordering */
import 'reflect-metadata';

import { isMap, isSet } from 'lodash';
import { Expose, Exclude, Type } from 'class-transformer';
import { describe, it, expect } from '@jest/globals';

import { classAssemble, convertNumber, convertString, Assemble, ValueTransform, MapTransform, SetTransform } from '../src';

class User {
  // @ts-ignore
  @Expose() public name: string;
  // @ts-ignore
  @Expose() @ValueTransform(convertNumber) public age: number;
}

class ExcludeDemo {
  // @ts-ignore
  title: string;
  // @ts-ignore
  @Exclude() password: string;
  // @ts-ignore
  @Expose() @ValueTransform(convertString) name: string;
}

class Demo {
  // @ts-ignore
  @Expose() @Type(() => User) public user: User;
  // @ts-ignore
  @Expose() @Type(() => User) public userArray: User[];
  // @ts-ignore
  @Expose() @SetTransform(User) public userSet: Set<User>;
  // @ts-ignore
  @Expose() @MapTransform(User) public userMap: Map<string, User>;
}

class Service {
  @Assemble(Demo)
  // @ts-ignore
  public async getDemo(): Promise<Demo> {
    const user = { name: 'vodyani', age: 'USER' };
    const userArray = [{ age: '20' }];
    const userSet = new Set([{ name: 'vodyani', age: '20' }]);
    const userMap = new Map([['vodyani', { age: '20' }]]);
    return { user, userArray, userSet, userMap } as any;
  }

  @Assemble(ExcludeDemo)
  // @ts-ignore
  public getExcludeDemo(): ExcludeDemo {
    return { password: '123' } as any;
  }
}

describe('test class', () => {
  it('expose', async () => {
    const result = await new Service().getDemo();
    expect(result.user.age).toBe(0);
    expect(result.userArray[0].age).toBe(20);
    expect(result.userArray[0].name).toBe(undefined);
    expect(isSet(result.userSet)).toBe(true);
    expect(isMap(result.userMap)).toBe(true);
    expect(result.userMap.get('vodyani')).toEqual({ name: undefined, age: 20 });
  });

  it('exclude', async () => {
    const result = new Service().getExcludeDemo();
    expect(result.password).toBe(undefined);
    expect(result.name).toBe('');
    expect(result).toEqual({ name: '' });
  });

  it('classAssemble', async () => {
    const result = classAssemble(
      ExcludeDemo,
      { password: '123', other: 2 },
      { excludeExtraneousValues: false },
    );

    expect(result).toEqual({ other: 2, name: '' });
  });
});