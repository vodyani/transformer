# Vodyani transformer

⚗ "transformer" offered simple-to-use decorators and conversion mechanisms.

[![Npm](https://img.shields.io/npm/v/@vodyani/transformer/latest.svg)](https://www.npmjs.com/package/@vodyani/transformer)
[![Npm](https://img.shields.io/npm/v/@vodyani/transformer/beta.svg)](https://www.npmjs.com/package/@vodyani/transformer)
[![Npm](https://img.shields.io/npm/dm/@vodyani/transformer)](https://www.npmjs.com/package/@vodyani/transformer)
[![License](https://img.shields.io/github/license/vodyani/transformer)](LICENSE)
<br>
[![codecov](https://codecov.io/gh/vodyani/transformer/branch/master/graph/badge.svg?token=DZBE5JU3YA)](https://codecov.io/gh/vodyani/transformer)
![Workflow](https://github.com/vodyani/transformer/actions/workflows/release.yml/badge.svg)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-angular-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

## Installation

```sh
npm install @vodyani/transformer
```

## Features

- [⛰ Class transformation](#class-transformer-usage)
- [🛫 Convert transformation](#convert-transformer-usage)

## Class transformer usage

> - Before you start using it, you need to understand some basic concepts 😄
> - The transformation capability of the class is implemented based on the [class-transformer](https://github.com/typestack/class-transformer) package.

<br>

Because `excludeExtraneousValues` is enabled by default. you needs import [`@Expose`](https://github.com/typestack/class-transformer#using-versioning-to-control-exposed-and-excluded-properties) To mark whether the property needs to be assembled.

```ts
import { Expose } from '@vodyani/transformer'

class User {
  @Expose()
  public name: string;

  @Expose()
  public age: number;
}
```

Similarly, if you want to exclude certain attributes at load time, use the [`@Exclude`](https://github.com/typestack/class-transformer#skipping-specific-properties) decorator.

```ts
import { Expose, Exclude } from '@vodyani/transformer'

class Customer {
  @Expose()
  public name: string;

  @Exclude()
  public address: number;
}
```

Properties of a class will of course have nested structures, and when this happens, you need to use [`@Type`](https://github.com/typestack/class-transformer#%D1%81onverting-date-strings-into-date-objects) decorator.

- Array structures will be handled automatically just like object structures.
- Because the `@Type` decorator does not properly convert nested structures in `Set`, you need to use [`@TransformSet`](#transformset)
- Because the `@Type` decorator does not properly convert nested structures in `Map`, you need to use [`@TransformMap`](#transformmap)

```ts
import { Expose, Exclude, Type } from '@vodyani/transformer'

class Book {
  @Expose()
  public name: string;
}

class LibraryOwner {
  @Expose()
  public name: string;
}

class Library {
  @Expose() @Type(() => Book)
  public books: Book[];

  @Expose() @Type(() => Book)
  public books: Book[];

  @Expose() @Type(() => LibraryOwner)
  public owner: LibraryOwner;
}
```

<br>

> Next, check out the awesome features that `@vodyani/transformer` has done 🎉

|Features|Type|Description|
|:-:|:-:|:-:|
|[toAssemble](#toassemble)|method|This technique turns an object into an instance of a particular class.|
|[Assemble](#assemble)|decorator|Following the function's successful completion, the result is automatically loaded using the class that was supplied.|
|[TransformValue](#transformvalue)|decorator|The transformation decorator of the data.|
|[TransformSet](#transformset)|decorator|The transformation decorator of the `Set` data.|
|[TransformMap](#transformmap)|decorator|The transformation decorator of the `Map` data.|

### toAssemble

This technique turns an object into an instance of a particular class.

**Params**

|param|type|description|
|:-:|:-:|:-:|
|`type`|`Class`|*The intended class for conversion.*|
|`data`|`object`|*The source of data conversion.*|
|`options`|[ClassTransformOptions](https://github.com/typestack/class-transformer#advanced-usage)|*The class-transformer options. (`excludeExtraneousValues` is enabled by default)*|

**Return**

`plainToClass` result.

**Example**

```ts
import { Expose, toAssemble } from '@vodyani/transformer'

class User {
  @Expose()
  public name: string;

  @Expose()
  public age: number;
}

toAssemble(User, { name: 'demo' }) // { name: 'demo', age: undefined }
toAssemble(User) // { name: undefined, age: undefined }

class Customer {
  @Expose()
  public name: string;

  @Exclude()
  public address: number;
}

toAssemble(Customer, { name: 'demo' }) // { name: 'demo' }
```

**Tips**

- `toAssemble` actually calls the [`plainToClass`](https://github.com/typestack/class-transformer#plaintoclass) function.

### Assemble

Following the function's successful completion, the result is automatically loaded using the class that was supplied.

**Tips:**

This decorator should only be used if the return value is specified 🤔

**Params**

|param|type|description|
|:-:|:-:|:-:|
|`type`|`Class`|*The intended class for conversion.*|
|`data`|`object`|*The source of data conversion.*|
|`options`|[ClassTransformOptions](https://github.com/typestack/class-transformer#advanced-usage)|*The class-transformer options. (`excludeExtraneousValues` is enabled by default)*|

**Example**

```ts
import { Assemble, Expose, TransformValue, toNumber } from '@vodyani/transformer'

class Order {
  @Expose() @TransformValue((id: number) => toNumber(id, 0))
  public id: number;
}

class OrderRecord {
  @Assemble(Order)
  public get(): Promise<Order> {
    return null;
  }
}

const user = new OrderRecord().get(); // { id: 0 }
```

### TransformValue

The transformation decorator of the data. `@TransformValue` actually calls the [`@Transform`](https://github.com/typestack/class-transformer#basic-usage)

**Params**

|param|type|description|
|:-:|:-:|:-:|
|`transformer`|`Method`|*The process that carries out the transition.*|
|`...args`|`any[]`|*The transformer argument.*|

**Example**

```ts
import { Expose, TransformValue, toNumber } from '@vodyani/transformer'

class User {
  @Expose() @TransformValue((name: string) => toString(name, 'demo'))
  public name: string;

  @Expose() @TransformValue(toNumber)
  public age: number;
}

toAssemble(User) // { name: 'demo', age: 0 }
```

### TransformSet

The transformation decorator of the `Set` data. It doesn't need to be used with [`@Type`](https://github.com/typestack/class-transformer#%D1%81onverting-date-strings-into-date-objects)

**Params**

|param|type|description|
|:-:|:-:|:-:|
|`type`|`Class`|*The intended class for conversion.*|
|`options`|[ClassTransformOptions](https://github.com/typestack/class-transformer#advanced-usage)|*The class-transformer options. (`excludeExtraneousValues` is enabled by default)*|

```ts
import { Expose, TransformSet } from '@vodyani/transformer'

class Book {
  @Expose()
  public name: string;
}

class Library {
  @Expose() @TransformSet(Book)
  public books: Set<Book>;
}
```

### TransformMap

The transformation decorator of the `Map` data. It doesn't need to be used with [`@Type`](https://github.com/typestack/class-transformer#%D1%81onverting-date-strings-into-date-objects)

**Params**

|param|type|description|
|:-:|:-:|:-:|
|`type`|`Class`|*The intended class for conversion.*|
|`options`|[ClassTransformOptions](https://github.com/typestack/class-transformer#advanced-usage)|*The class-transformer options. (`excludeExtraneousValues` is enabled by default)*|

```ts
import { Expose, TransformMap } from '@vodyani/transformer'

class Book {
  @Expose()
  public name: string;
}

class Library {
  @Expose() @TransformMap(Book)
  public books: Map<Book>;
}
```

## Convert transformer usage

|Features|Type|Description|
|:-:|:-:|:-:|
|[toConvert](#toconvert)|method|The process that carries out the transition.|
|[toString](#tostring)|method|Convert data to string.|
|[toNumber](#tonumber)|method|Convert data to number.|
|[toBuffer](#tonumber)|method|Convert `Buffer` data to `Stream`.|
|[toStream](#tostream)|method|Convert `Stream` data to `Buffer`.|
|[ResultTransformer](#resulttransformer)|decorator|A transformer is passed in after the function has completed execution to change the function's output.|
|[ArgumentTransformer](#argumenttransformer)|The function's arguments are modified using the passed transformer before the function is called.|


### toConvert

The process that carries out the transition.

**Tips:**

- There are two outcomes that return the `default`: `default` is entered and either the condition fails or the value is null.
- This is a higher-order method that you usually need to use in conjunction with other utility functions. 😛

|param|type|description|
|:-:|:-:|:-:|
|`data`|`any`|*Data that needs to be transformed.*|
|`options`|`ConvertOptions`|*Options in transformation processing.*|

```ts
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
```

**Return**

`T` | `any`

**Example**

```ts
import { toConvert } from '@vodyani/transformer';

toConvert(undefined, { default: 1 }); // 1
toConvert(null); // null
toConvert(1, { default: 10 }); // 1
toConvert(1); // 1
```

**How do you build a transformation function ↓**

```ts
import { toConvert } from '@vodyani/transformer';

function toString(data: any, defaultValue = ''): string {
  return toConvert(data, {
    transformer: String,
    default: defaultValue,
    condition: (data) => !isNil(data) && !isEmpty(String(data)),
  });
}

toString(undefined, '1'); // '1'
toString(null); // ''
```

### toString

Convert data to string.

**Params**

|param|type|description|
|:-:|:-:|:-:|
|`data`|`any`|*Data that needs to be transformed.*|
|`defaultValue`|`string`|*This value is returned when the incoming value does not match expectations.*|

**Return**

`string`

**Example**

```ts
import { toString } from '@vodyani/transformer';

toString(undefined, '1'); // '1'
toString(null); // ''
toString(1, '10'); // '1'
toString('1', '10'); // '1'
```

### toNumber

Convert data to number.

**Params**

|param|type|description|
|:-:|:-:|:-:|
|`data`|`any`|*Data that needs to be transformed.*|
|`defaultValue`|`number`|*This value is returned when the incoming value does not match expectations.*|

**Return**

`number`

**Example**

```ts
import { toNumber } from '@vodyani/transformer';

toNumber(undefined, 1); // 1
toNumber(null); // 0
toNumber(1, 10); // 1
toNumber('1', 10); // 1
toNumber(Number('test'), 1); // 1
```

### toBuffer

Convert `Stream` data to `Buffer`.

**Params**

|param|type|description|
|:-:|:-:|:-:|
|`stream`|`Stream`|*The stream data.*|

**Return**

`Promise<Buffer>`

**Example**

```ts
import { toBuffer } from '@vodyani/transformer';

await toBuffer(data) // => stream data
```

### toStream

Convert `Buffer` data to `Stream`.

**Params**

|param|type|description|
|:-:|:-:|:-:|
|`buffer`|`Buffer`|*The buffer data.*|
|`encoding`|`ascii`/`utf8`/`utf-8`/`utf16le`/`ucs2`/`ucs-2`/`base64`/`base64url`/`latin1`/`binary`/`hex`|*The encoding type.*|

**Return**

`Promise<Duplex>`

**Example**

```ts
import { toStream } from '@vodyani/transformer';

await toStream(data) // => buffer data
```

### ResultTransformer

A transformer is passed in after the function has completed execution to change the function's output.

**Params**

|param|type|description|
|:-:|:-:|:-:|
|`transformer`|`Function`|*The process that carries out the transition.*|

**Example**


### ArgumentTransformer

**Params**

The function's arguments are modified using the passed transformer before the function is called.

|param|type|description|
|:-:|:-:|:-:|
|`transformer`|`Function`|*The process that carries out the transition.*|

**Example**


## Team

|[![ChoGathK](https://github.com/chogathK.png?size=100)](https://github.com/chogathK)|
|:-:|
|[ChoGathK](https://github.com/chogathK)|

## License

Vodyani transformer is [MIT licensed](LICENSE).
