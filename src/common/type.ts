/** The function method. */
export type Method<T = any> = (...args: any[]) => T;
/** The promise method. */
export type PromiseMethod<T = any> = (...args: any[]) => Promise<T>;
