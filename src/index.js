import { makeMarkers, makeCutRule, makePasteRule } from 'restream'
import { commentsRe, inlineCommentsRe } from './lib'

/**
 * @typedef {import('restream').Rule} Rule
 */

/**
 * Create a new set of rules, where service markers are used to exclude comments and strings from processing.
 * @param {Rule[]} [rules] A set of rules to surround with markers. Typically, this will be done by `alamode`.
 */
const makeRules = (rules = []) => {
  const { comments, inlineComments, strings, literals } = makeMarkers({
    comments: commentsRe,
    inlineComments: inlineCommentsRe,
    strings: /(["'])(.*?)\1/gm,
    literals: /`[\s\S]+?`/gm,
  })
  const mr = [comments, inlineComments, strings, literals]
  const [cutComments, cutInlineComments, cutStrings, cutLiterals] = mr
    .map(makeCutRule)
  const [pasteComments, pasteInlineComments, pasteStrings, pasteLiterals] = mr
    .map(makePasteRule)

  const allRules = [
    cutComments,
    cutInlineComments,
    cutLiterals,
    cutStrings,
    ...rules,
    pasteStrings,
    pasteLiterals,
    pasteInlineComments,
    pasteComments,
  ]
  return {
    rules: allRules,
    markers: {
      literals,
      strings,
      comments,
      inlineComments,
    },
  }
}

export default makeRules