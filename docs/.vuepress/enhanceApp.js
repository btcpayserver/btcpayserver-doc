const redirects = require('./redirects')

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
const COLOR_MODES = ['light', 'dark']
const THEME_ATTR = 'data-btcpay-theme'
const STORE_ATTR = 'btcpay-theme'

function setColorMode (mode) {
  if (COLOR_MODES.includes(mode)) {
    window.localStorage.setItem(STORE_ATTR, mode)
    document.documentElement.setAttribute(THEME_ATTR, mode)
  }
}

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
      router.addRoutes(redirects)

      // initial page rendering
      app.$once('hook:mounted', () => {
        setTimeout(() => {
          // append theme switch
          const navbar = document.querySelector('.navbar .links')
          if (navbar) {
            var btn = document.createElement('button')
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
            btn.setAttribute('class', 'btcpay-theme-switch')
            svg.setAttribute('viewBox','0 0 10 10')
            svg.setAttribute('width','10')
            svg.setAttribute('height','10')
            svg.innerHTML = '<path class="btcpay-theme-switch-dark" transform="translate(1 1)" d="M2.72 0A3.988 3.988 0 000 3.78c0 2.21 1.79 4 4 4 1.76 0 3.25-1.14 3.78-2.72-.4.13-.83.22-1.28.22-2.21 0-4-1.79-4-4 0-.45.08-.88.22-1.28z"/><path class="btcpay-theme-switch-light" transform="translate(1 1)" d="M4 0c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5S4.28 0 4 0zM1.5 1c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm5 0c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM4 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM.5 3.5c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm7 0c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM1.5 6c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zm5 0c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5-.22-.5-.5-.5zM4 7c-.28 0-.5.22-.5.5s.22.5.5.5.5-.22.5-.5S4.28 7 4 7z"/>'
            btn.appendChild(svg)
            navbar.appendChild(btn)

            document.querySelectorAll(".btcpay-theme-switch").forEach(function (link) {
              link.addEventListener("click", function (e) {
                e.preventDefault()
                const current = document.documentElement.getAttribute(THEME_ATTR) || COLOR_MODES[0]
                const mode = current === COLOR_MODES[0] ? COLOR_MODES[1] : COLOR_MODES[0]
                setColorMode(mode)
              })
            })
          }
        }, 250)

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
