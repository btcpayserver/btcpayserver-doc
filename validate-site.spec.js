const { attributes, followRedirects } = require('./validate-site')

describe('site validation', () => {
  test('extracts quoted attributes, including empty values', () => {
    expect(attributes(`<a href=""></a><a href='/FAQ/?a=1&amp;b=2'></a>`, 'href')).toEqual([
      '',
      '/FAQ/?a=1&b=2'
    ])
  })

  test('preserves anchors while following redirect chains', () => {
    const target = followRedirects(
      new URL('https://docs.btcpayserver.org/getting-started/connectwallet/#protect-the-wallet')
    )
    expect(target.href).toBe(
      'https://docs.btcpayserver.org/Users/wallet-setup/#protect-the-wallet'
    )
  })
})
