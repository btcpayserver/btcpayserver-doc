// Custom markdown-it plugin to generate title attrs out of alt attrs if empty.
module.exports = function imageAltToTitlePlugin(md) {
  md.core.ruler.after('inline', 'image_alt_to_title', state => {
    state.tokens.forEach(token => {
      if (token.type === 'inline') {
        token.children.forEach(child => {
          if (child.type === 'image') {
            const titleIndex = child.attrIndex('title')
            const altValue = child.content

            if (altValue && titleIndex < 0) {
              child.attrPush(['title', altValue])
            }
          }
        })
      }
    })
  })
}
