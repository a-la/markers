# @a-la/markers

[![npm version](https://badge.fury.io/js/@a-la/markers.svg)](https://npmjs.org/package/@a-la/markers)

`@a-la/markers` is A set of service markers used by alamode, e.g., to cut and paste comments.

```sh
yarn add -E @a-la/markers
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`markers(arg1: string, arg2?: boolean)`](#mynewpackagearg1-stringarg2-boolean-void)

## API

The package is available by importing its default function:

```js
import markers from '@a-la/markers'
```

### `markers(`<br/>&nbsp;&nbsp;`arg1: string,`<br/>&nbsp;&nbsp;`arg2?: boolean,`<br/>`): void`

Call this function to get the result you want.

```js
/* yarn example/ */
import markers from '@a-la/markers'

(async () => {
  await markers()
})()
```

---

(c) [À La Mode][1] 2018

[1]: https://alamode.cc
