import test from '../../src/lib'

const re = /test\//
const re2 = /test2[t/]/
const re3 = /test3\[]/
const re4 = /test`/
const re5 = /test`/

const s = 'string\''
const s2 = `string\``
const s2_5 = `string\``
const s3 = "string\""