const { makeMarkers, makeCutRule, makePasteRule } = require('restream');
const { commentsRe, inlineCommentsRe } = require('./lib');

/**
 * Create a new set of rules, where service markers are used to exclude comments and strings from processing.
 * @param {!Array<!_restream.Rule>} [rules] A set of rules to surround with markers. Typically, this will be done by `alamode`.
 */
const makeRules = (rules = []) => {
  const {
    comments,
    inlineComments,
    strings,
    literals,
    escapes,
    regexes,
    regexGroups,
  } = makeMarkers({
    comments: commentsRe,
    inlineComments: inlineCommentsRe,
    strings: /(["'])(.*?)\1/gm,
    literals: /`([\s\S]*?)`/gm,
    escapes: /\\[\\`'"/]/g,
    regexes: /\/(.+?)\//gm,
    regexGroups: /\[(.*?)\]/gm,
  })
  const mr = [
    comments, inlineComments, strings, literals,
    escapes, regexes, regexGroups,
  ]
  const [
    cutComments, cutInlineComments, cutStrings, cutLiterals,
    cutEscapes, cutRegexes, cutRegexGroups,
  ] = mr
    .map(makeCutRule)
  const [
    pasteComments, pasteInlineComments, pasteStrings, pasteLiterals,
    pasteEscapes, pasteRegexes, pasteRegexGroups,
  ] = mr
    .map(makePasteRule)

  const allRules = [
    cutEscapes,
    cutComments,
    cutInlineComments,
    cutStrings,
    cutRegexGroups,
    cutRegexes,
    cutLiterals,
    ...rules,
    pasteLiterals,
    pasteRegexes,
    pasteRegexGroups,
    pasteStrings,
    pasteInlineComments,
    pasteComments,
    pasteEscapes,
  ]
  return {
    rules: allRules,
    markers: {
      literals,
      strings,
      comments,
      inlineComments,
      escapes,
      regexes,
      regexGroups,
    },
  }
}

module.exports=makeRules



/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('restream').Rule} _restream.Rule
 */


module.exports.inlineCommentsRe = inlineCommentsRe
module.exports.commentsRe = commentsRe