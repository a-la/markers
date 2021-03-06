import { makeMarkers, makeCutRule, makePasteRule } from 'restream'
import { commentsRe, inlineCommentsRe } from './lib'

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
  ] = mr.map(makeCutRule)
  const [
    pasteComments, pasteInlineComments, pasteStrings, pasteLiterals,
    pasteEscapes, pasteRegexes, pasteRegexGroups,
  ] = mr.map(m => makePasteRule(m))

  const allRules = [
    cutEscapes,
    cutComments,
    cutInlineComments,
    cutStrings,
    cutRegexGroups,
    cutRegexes,
    cutLiterals,
    stopRule,
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

/**
 * For debugging where markers went wrong.
 * @type {_restream.Rule}
 */
const stopRule = {
  re: /./,
  replacement(m) {
    /** @suppress {checkTypes} */
    const stop = this['stopProcessing']
    if (stop) this.brake()
    return m
  },
}

export default makeRules

export { inlineCommentsRe, commentsRe }

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('restream').Rule} _restream.Rule
 */
