import { equal, deepEqual } from 'zoroaster/assert'
import { Replaceable } from 'restream'
import Catchment from 'catchment'
import Context from '../context'
import makeRules from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'marks inline comments'() {
    const { rules, markers: { inlineComments } } = makeRules([
      {
        re: /[\s\S]*/g,
        replacement() {
          return '' // prevent from pasting
        },
      },
    ])
    const rs = new Replaceable(rules)
    const { promise } = new Catchment({ rs })
    const t = `
// hello world
console.log('code')
// a comment
`
    rs.end(t)
    await promise
    deepEqual(inlineComments.map, {
      0: '// hello world',
      1: '// a comment',
    })
  },
  async 'marks block comments'() {
    const { rules, markers: { comments } } = makeRules([
      {
        re: /[\s\S]*/g,
        replacement() {
          return '' // prevent from pasting
        },
      },
    ])
    const rs = new Replaceable(rules)
    const { promise } = new Catchment({ rs })
    const t = `
/* hello world */
console.log('code')
/* art deco code */
`
    rs.end(t)
    await promise
    deepEqual(comments.map, {
      0: '/* hello world */',
      1: '/* art deco code */',
    })
  },
  async 'marks strings'() {
    const { rules, markers: { strings } } = makeRules([
      {
        re: /[\s\S]*/g,
        replacement() {
          return '' // prevent from pasting
        },
      },
    ])
    const rs = new Replaceable(rules)
    const { promise } = new Catchment({ rs })
    const t = `
console.log('code')
console.log("code2")
`
    rs.end(t)
    await promise
    deepEqual(strings.map, {
      0: '\'code\'',
      1: '"code2"',
    })
  },
  async 'marks template literals'() {
    const { rules, markers: { literals } } = makeRules([
      {
        re: /[\s\S]*/g,
        replacement() {
          return '' // prevent from pasting
        },
      },
    ])
    const rs = new Replaceable(rules)
    const { promise } = new Catchment({ rs })
    const e1 = `\`
code
code1
\``
    const e2 = `\`
code
code2
\``
    const t = `
console.log(${e1})
console.log(${e2})
`
    rs.end(t)
    await promise
    deepEqual(literals.map, {
      0: e1,
      1: e2,
    })
  },
  async 'pastes markers back'() {
    const mapLengths = {}
    const { rules, markers } = makeRules([
      {
        re: /[\s\S]+/g,
        replacement(match) {
          mapLengths.comments = Object.keys(markers.comments.map).length
          mapLengths.inlineComments = Object.keys(markers.inlineComments.map).length
          mapLengths.strings = Object.keys(markers.strings.map).length
          mapLengths.literals = Object.keys(markers.literals.map).length
          return match
        },
      },
    ])
    const rs = new Replaceable(rules)
    const { promise } = new Catchment({ rs })
    const t = `
console.log('test1')
console.log("test2")
console.log(\`test3\`)
// comment
/* block comment */
`
    rs.end(t)
    const res = await promise
    equal(res, t)
    deepEqual(mapLengths, {
      comments: 1,
      inlineComments: 1,
      strings: 2,
      literals: 1,
    })
  },
}

export default T