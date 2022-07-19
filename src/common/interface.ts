import { Method } from './type';

/**  The typescript class. */
export interface Class<T = any> extends Function {
  new (...args: any[]): T;
}
/** Conversion function options. */
export interface ConvertOptions {
  /**
   * This value is returned when the incoming value does not match expectations.
   *
   * @default null
   */
  replaced?: any;
  /**
   * If the result of the conditional validation function execution is true, the conversion is performed.
   *
   * @empale (num: number) => num > 0
   */
  condition?: Method;
  /**
   * The function that performs the transformation.
   *
   * @empale (data: any) => Number(data)
   */
  transformer?: Method;
}
