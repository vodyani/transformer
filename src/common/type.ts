/**
 * The method of functions.
 */
export type Method<T = any> = (...args: any[]) => T;
/**
 * The method of promises.
 */
export type PromiseMethod<T = any> = (...args: any[]) => Promise<T>;
