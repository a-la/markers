import { equal } from '@zoroaster/assert'
import { Replaceable } from 'restream'
import Catchment from 'catchment'
import { createReadStream } from 'fs'
import Context from '../context'
import makeRules from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  async 'pastes markers back'({ JS_FIXTURE, readFile }) {
    const { rules } = makeRules()
    const rs = new Replaceable(rules)
    const { promise } = new Catchment({ rs })
    const readable = createReadStream(JS_FIXTURE)
    readable.pipe(rs)
    const res = await promise
    const expected = await readFile(JS_FIXTURE)
    equal(res, expected)
  },
  async 'cuts strings before regexes'({ JS_FIXTURE }) {
    let m
    const { rules } = makeRules([{
      re: /[\s\S]+/g,
      replacement(match) {
        m = match
        return match
      },
    }])
    const rs = new Replaceable(rules)
    const { promise } = new Catchment({ rs })
    const readable = createReadStream(JS_FIXTURE)
    readable.pipe(rs)
    await promise
    return m
  },
}

export default T