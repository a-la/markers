## 12 May 2019

### [1.3.0](https://github.com/a-la/markers/compare/v1.2.0...v1.3.0)

- [feature] Add the `stop` rule for debugging.

## 24 April 2019

### [1.2.0](https://github.com/a-la/markers/compare/v1.1.0...v1.2.0)

- [api] Export `inlineCommentsRe` and `commentsRe` regexes.
- [fix] Apply a patch to remove type warning:
    ```js
    mr.map(makePasteRule) // warning
    mr.map(m => makePasteRule(m)) // fix
    ```

## 22 April 2019

### [1.1.0](https://github.com/a-la/markers/compare/v1.0.3...v1.1.0)

- [package] Publish `src` as a module.
- [deps] Update and unlock dependencies.

## 1 September 2018

### 1.0.3

- [fix] Return additional markers, including `regexes`, _etc_.

### 1.0.2

- [fix] Ensure correct order to match strings before regexes.
- [test] Install `snapshot-context`.

### 1.0.1

- [feature] Mark escaped characters before all, and cut & paste regexes.

### 1.0.0

- Create `@a-la/markers` with [`mnp`][https://mnpjs.org]
- [repository]: `src`, `test`