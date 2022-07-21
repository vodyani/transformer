import { Method } from './type';

/**
 * The class for typescript.
 */
export interface Class<T = any> extends Function {
  new (...args: any[]): T;
}
/**
 * Choices for conversion functions.
 */
export interface ConvertOptions {
  /**
   * When the received value does not correspond to expectations, this value is returned.
   *
   * @default null
   */
  default?: any;
  /**
   * The conversion is carried out if the outcome of the conditional validation function execution is true.
   *
   * @empale (num: number) => num > 0
   */
  condition?: Method;
  /**
   * The process that carries out the transition.
   *
   * @empale (data: any) => Number(data)
   */
  transformer?: Method;
}
