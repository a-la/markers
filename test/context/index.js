import { resolve } from 'path'
import { debuglog } from 'util'
import Catchment from 'catchment'
import { createReadStream } from 'fs';

const LOG = debuglog('@a-la/markers')

const FIXTURE = resolve(__dirname, '../fixture')

/**
 * A testing context for the package.
 */
export default class Context {
  async _init() {
    LOG('init context')
  }
  /**
   * Example method.
   */
  example() {
    return 'OK'
  }
  /**
   * Path to the fixture file.
   */
  get FIXTURE() {
    return resolve(FIXTURE, 'test.txt')
  }
  get JS_FIXTURE() {
    return resolve(FIXTURE, 'fixture.js')
  }
  async readFile(path) {
    const rs = createReadStream(path)
    const { promise } = new Catchment({ rs })
    const res = await promise
    return res
  }
  get SNAPSHOT_DIR() {
    return resolve(__dirname, '../snapshot')
  }
  async _destroy() {
    LOG('destroy context')
  }
}