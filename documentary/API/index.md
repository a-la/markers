
## API

The package is available by importing its default function:

```js
import makeRules from '@a-la/markers'
```

```### makeRules
[
  ["rules?", "Rule[]"]
]
```

This function will surround the rules with cut and paste rules for markers, to exclude from transforms:

- strings
- template literals
- block comments
- inline comments

%EXAMPLE: example, ../src => @a-la/markers%

%FORK-js example.js%
