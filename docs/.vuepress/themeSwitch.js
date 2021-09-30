const COLOR_MODES = ['light', 'dark']
const THEME_ATTR = 'data-btcpay-theme'
const STORE_ATTR = 'btcpay-theme'

function setColorMode(mode) {
  if (COLOR_MODES.includes(mode)) {
    window.localStorage.setItem(STORE_ATTR, mode)
    document.documentElement.setAttribute(THEME_ATTR, mode)
  }
}

function toggleColorMode(e) {
  e.preventDefault()
  const current = document.documentElement.getAttribute(THEME_ATTR) || COLOR_MODES[0]
  const mode = current === COLOR_MODES[0] ? COLOR_MODES[1] : COLOR_MODES[0]
  setColorMode(mode)
}

module.exports = {
  COLOR_MODES,
  STORE_ATTR,
  THEME_ATTR,
  setColorMode,
  toggleColorMode
}
