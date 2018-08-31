# @a-la/markers

[![npm version](https://badge.fury.io/js/%40a-la%2Fmarkers.svg)](https://npmjs.org/package/@a-la/markers)

`@a-la/markers` is a set of service markers used by `alamode`, e.g., to cut and paste comments.

```sh
yarn add -E @a-la/markers
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`makeRules(rules?: Rule[])`](#makerulesrules-rule-void)
- [Copyright](#copyright)

## API

The package is available by importing its default function:

```js
import makeRules from '@a-la/markers'
```

### `makeRules(`<br/>&nbsp;&nbsp;`rules?: Rule[],`<br/>`): void`

This function will surround the rules with cut and paste rules for markers, to exclude from transforms:

- strings
- template literals
- block comments
- inline comments

```js
/* yarn example/ */
import makeRules from '@a-la/markers'

const { rules, markers } = makeRules([
  {
    re: 'ALAMODE_RULE',
    replacement(match) {
      return match
    },
  },
])

console.log('\nRules:')
console.log(rules)

console.log('\nMarkers:')
console.log(markers)
```

```js
Rules:
[ { re: /\/\*(?:[\s\S]+?)\*\//g,
    replacement: [Function: replacement] },
  { re: /\/\/(.+)/gm, replacement: [Function: replacement] },
  { re: /`[\s\S]+?`/gm, replacement: [Function: replacement] },
  { re: /(["'])(.*?)\1/gm, replacement: [Function: replacement] },
  { re: 'ALAMODE_RULE', replacement: [Function: replacement] },
  { re: /%%_RESTREAM_STRINGS_REPLACEMENT_(\d+)_%%/g,
    replacement: [Function: replacement] },
  { re: /%%_RESTREAM_LITERALS_REPLACEMENT_(\d+)_%%/g,
    replacement: [Function: replacement] },
  { re: /%%_RESTREAM_INLINECOMMENTS_REPLACEMENT_(\d+)_%%/g,
    replacement: [Function: replacement] },
  { re: /%%_RESTREAM_COMMENTS_REPLACEMENT_(\d+)_%%/g,
    replacement: [Function: replacement] } ]

Markers:
{ literals: 
   { name: 'literals',
     re: /`[\s\S]+?`/gm,
     regExp: /%%_RESTREAM_LITERALS_REPLACEMENT_(\d+)_%%/g,
     getReplacement: [Function: getDefaultReplacement],
     map: {},
     lastIndex: 0 },
  strings: 
   { name: 'strings',
     re: /(["'])(.*?)\1/gm,
     regExp: /%%_RESTREAM_STRINGS_REPLACEMENT_(\d+)_%%/g,
     getReplacement: [Function: getDefaultReplacement],
     map: {},
     lastIndex: 0 },
  comments: 
   { name: 'comments',
     re: /\/\*(?:[\s\S]+?)\*\//g,
     regExp: /%%_RESTREAM_COMMENTS_REPLACEMENT_(\d+)_%%/g,
     getReplacement: [Function: getDefaultReplacement],
     map: {},
     lastIndex: 0 },
  inlineComments: 
   { name: 'inlineComments',
     re: /\/\/(.+)/gm,
     regExp: /%%_RESTREAM_INLINECOMMENTS_REPLACEMENT_(\d+)_%%/g,
     getReplacement: [Function: getDefaultReplacement],
     map: {},
     lastIndex: 0 } }
```

## Copyright

(c) [À La Mode][1] 2018

[1]: https://alamode.cc
