import { Stream, Duplex } from 'stream';

import { isNil, isEmpty } from 'lodash';

import { ConvertOptions } from '../common';

/**
 * The process that carries out the transition.
 *
 * @tips There are two outcomes that return the `default`: `default` is entered and either the condition fails or the value is null.
 *
 * @param data Data that needs to be transformed.
 * @param options Options in transformation processing.
 * @returns `T` | `any`
 *
 * @publicApi
 */
export function toConvert<T = any>(data: any, options?: ConvertOptions): T {
  const { condition, transformer, default: value } = options || Object();

  if (condition) {
    if (transformer && condition(data)) return transformer(data);
    if (!isNil(value)) return value;
  }

  return isNil(data) && !isNil(value) ? value : data;
}
/**
 * Convert data to string.
 *
 * @param data Data that needs to be transformed.
 * @param defaultValue This value is returned when the incoming value does not match expectations.
 * @returns string
 *
 * @publicApi
 */
export function toString(data: any, defaultValue = ''): string {
  return toConvert(data, {
    transformer: String,
    default: defaultValue,
    condition: (data) => !isNil(data) && !isEmpty(String(data)),
  });
}
/**
 * Convert data to number.
 *
 * @param data Data that needs to be transformed.
 * @param defaultValue This value is returned when the incoming value does not match expectations.
 * @returns number
 *
 * @publicApi
 */
export function toNumber(data: any, defaultValue = 0): number {
  return toConvert(data, {
    transformer: Number,
    default: defaultValue,
    condition: (data) => !isNil(data) && !isNaN(Number(data)),
  });
}
/**
 * Convert `Stream` data to `Buffer`.
 *
 * @param stream Data that needs to be transformed.
 * @returns Promise<Buffer>
 *
 * @publicApi
 */
export async function toBuffer(stream: Stream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const buffers: Uint8Array[] = [];
    stream.on('error', reject);
    stream.on('data', (data) => buffers.push(data));
    stream.on('end', () => resolve(Buffer.concat(buffers)));
  });
}
/**
 * Convert `Buffer` data to `Stream`.
 *
 * @param buffer Data that needs to be transformed.
 * @param encoding The encoding type.
 * @returns Promise<Duplex>
 *
 * @publicApi
 */
export async function toStream(buffer: Buffer, encoding?: BufferEncoding): Promise<Duplex> {
  const stream = new Duplex();
  stream.push(buffer, encoding);
  stream.push(null, encoding);
  return stream;
}
