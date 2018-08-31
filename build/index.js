const { debuglog } = require('util');

const LOG = debuglog('@a-la/markers')

/**
 * A set of service markers used by alamode, e.g., to cut and paste comments.
 * @param {Config} config Configuration object.
 * @param {string} config.type The type.
 */
               async function markers(config = {}) {
  const {
    type,
  } = config
  LOG('@a-la/markers called with %s', type)
  return type
}

/**
 * @typedef {Object} Config
 * @property {string} type The type.
 */


module.exports = markers
//# sourceMappingURL=index.js.map