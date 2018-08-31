import { equal, ok } from 'zoroaster/assert'
import Context from '../context'
import markers from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof markers, 'function')
  },
  async 'calls package without error'() {
    await markers()
  },
  async 'gets a link to the fixture'({ FIXTURE }) {
    const res = await markers({
      type: FIXTURE,
    })
    ok(res, FIXTURE)
  },
}

export default T