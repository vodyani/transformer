import { Stream, Duplex } from 'stream';

import { isEmpty, isNil } from 'lodash';

import { ConvertOptions } from '../common';

/**
 * The process that carries out the transition.
 *
 * @tips There are two outcomes that return the `replaced`: `replaced` is entered and either the condition fails or the value is null
 *
 * @param data Data that needs to be transformed.
 * @param options Options in transformation processing.
 * @returns `T` | `any`
 *
 * @publicApi
 */
export function toConvert<T = any>(data: any, options?: ConvertOptions): T {
  const { condition, transformer, replaced } = options || Object();

  if (condition) {
    if (transformer && condition(data)) return transformer(data);
    if (!isNil(replaced)) return replaced;
  }

  return isNil(data) && !isNil(replaced) ? replaced : data;
}
/**
 * Convert data to string.
 *
 * @param data Data that needs to be transformed.
 * @param replaced This value is returned when the incoming value does not match expectations.
 * @returns string
 *
 * @publicApi
 */
export function toString(data: any, replaced = ''): string {
  return toConvert(data, {
    replaced,
    transformer: String,
    condition: (data) => !isNil(data) && !isEmpty(String(data)),
  });
}
/**
 * Convert data to string.
 *
 * @param data Data that needs to be transformed.
 * @param replaced This value is returned when the incoming value does not match expectations.
 * @returns number
 *
 * @publicApi
 */
export function toNumber(data: any, replaced = 0): number {
  return toConvert(data, {
    replaced,
    transformer: Number,
    condition: (data) => !isNil(data) && !isNaN(Number(data)),
  });
}
/**
 * Convert Stream data to buffer.
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
 * Convert Buffer data to stream.
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
