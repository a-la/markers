## API

The package is available by importing its default function:

```js
import makeRules from '@a-la/markers'
```

```### makeRules => !Array<!_restream.Rule>
[
  ["rules?", "!Array<!_restream.Rule>"]
]
```

This function will surround the rules with cut and paste rules for markers, to exclude from transforms:

- strings
- template literals
- block comments
- inline comments
- regexes

> **[!] Important** The current implementation does not support the following:

```js
// the // will be considered to be a comment and break the process
// because the string literal will not be complete without the closing `
const noLink = `https://${host}/test`
export { noLink }
```

%EXAMPLE: example, ../src => @a-la/markers%
%FORK-js example%