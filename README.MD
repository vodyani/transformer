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
- [📚 Object transformation](#object-transformer-usage)

## Class transformer usage

> Before you start using it, you need to understand some basic concepts 😄.

*The transformation capability of the class is implemented based on the [class-transformer](https://github.com/typestack/class-transformer) package.*

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
import { Expose } from '@vodyani/transformer'

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

**tips**

This decorator should only be used if the return value is specified 🤔

**Params**

|param|type|description|
|:-:|:-:|:-:|
|`type`|`Class`|*The intended class for conversion.*|
|`data`|`object`|*The source of data conversion.*|
|`options`|[ClassTransformOptions](https://github.com/typestack/class-transformer#advanced-usage)|*The class-transformer options. (`excludeExtraneousValues` is enabled by default)*|

**Example**

```ts
import { Expose } from '@vodyani/transformer'

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
|`transformer`|`Method`|*the process that carries out the transition.*|
|`...args`|`any[]`|argument|

**Example**

```ts
import { Expose, TransformValue, toNumber } from '@vodyani/transformer'

class User {
  @Expose() @TransformValue((name: string) => name || 'demo')
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

📚 building ...

## Object transformer usage

📚 building ...

## Team

|[![ChoGathK](https://github.com/chogathK.png?size=100)](https://github.com/chogathK)|
|:-:|
|[ChoGathK](https://github.com/chogathK)|

## License

Vodyani transformer is [MIT licensed](LICENSE).
