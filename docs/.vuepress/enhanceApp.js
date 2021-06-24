const redirects = require('./redirects')
const { COLOR_MODES, STORE_ATTR, setColorMode } = require('./themeSwitch')

// https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
const openVideo = embedEl => {
  const lazyAttr = 'data-src'
  const iframe = embedEl.querySelector(`iframe[${lazyAttr}]`)
  if (iframe) {
    const src = iframe.getAttribute(lazyAttr)
    iframe.setAttribute('src', src)
  }
}

const isEnter = e => e.code === 'Enter' || (e.keyCode || e.which) === 13

const handleClick = e => {
  const isSearchInput = e.target.matches('#algolia-search-input') && isEnter(e)

  // blur search field on select
  if (e.target.matches('.ds-dropdown-menu *') || isSearchInput) {
    document.getElementById('algolia-search-input').blur()
  }

  // youtube previews
  if (e.target.matches('.ytEmbed')) {
    e.preventDefault()
    openVideo(e.target)
  }
}

// Theme Switch
if (typeof process === 'undefined' || process.env.VUE_ENV !== 'server') {
  const systemColorMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? COLOR_MODES[1] : COLOR_MODES[0]
  const userColorMode = window.localStorage.getItem(STORE_ATTR)
  const initialColorMode = COLOR_MODES.includes(userColorMode) ? userColorMode : systemColorMode

  setColorMode(initialColorMode)
}

export default ({ router }) => {
  if (typeof process === 'undefined' || process.env.VUE_ENV !== 'server') {
    router.onReady(() => {
      const { app } = router

      // redirects
      redirects.forEach(route => router.addRoute(route))

      // initial page rendering
      app.$once('hook:mounted', () => {
        // temporary fix for https://github.com/vuejs/vuepress/issues/2428
        setTimeout(() => {
          const { hash } = document.location
          if (hash.length > 1) {
            const id = hash.substring(1)
            const element = document.getElementById(id)
            if (element) element.scrollIntoView()
          }
        }, 500)
      })

      document.addEventListener('click', handleClick)
      document.addEventListener('keyup', e => {
        if (isEnter(e)) handleClick(e)
      })
    })
  }
}
