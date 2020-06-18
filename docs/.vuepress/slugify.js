// https://github.com/vuejs/vuepress/blob/master/packages/%40vuepress/shared-utils/src/slugify.ts
// modify vuepress slug function to be compatible with githubs output
module.exports = string => {
  return string
    .replace(/[\(\)\.\:\/\/\+\?']/ig, '')
    // Replace emojis
    .replace(/[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D]/ig, '')
    // Replace control characters
    .replace(/[\u0000-\u001f]/g, '')
    // Replace special characters
    .replace(/[\s~`!@#$%^&*\(\)\-_\+=[\]{}|\\;:"'“”‘’–—<>,.?/]/g, '-')
    // Remove continuous separators
    .replace(/\-{2,}/g, '-')
    // lowercase
    .toLowerCase()
}
