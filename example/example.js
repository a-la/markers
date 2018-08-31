/* yarn example/ */
import makeRules from '../src'

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
