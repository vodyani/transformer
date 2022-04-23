import { describe, it, expect } from '@jest/globals';

import { toDeepCamelCase, toDeepSnakeCase } from '../src';

describe('test', () => {
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
});
