const { resolve } = require('path')
const preprocess = require('./preprocessMarkdown')

const pp = preprocess.bind({
  resourcePath: resolve(__dirname, '../Docker/README.md')
})

const externalFrontmatter = `---\nexternalRepo: https://github.com/btcpayserver/btcpayserver-docker\n---`

describe('preprocessMarkdown', () => {
  it('replaces YouTube links', () => {
    const md = `
Take a look at how BTCPay works in a video below.
[![](https://raw.githubusercontent.com/btcpayserver/btcpayserver-doc/master/img/thumbnails/HowBTCPayServerWorks.png)](https://www.youtube.com/watch?v=nr0UNbz3AoQ)

Here is a presentation of the global architecture at Advancing Bitcoin conference.

Short link:
[![What is a pull payment](https://img.youtube.com/vi/-e8lPd9NtPs/mqdefault.jpg)](https://youtu.be/-e8lPd9NtPs "What is a pull payment")`

    expect(pp(md)).toMatchSnapshot()
  })

  it('replaces external links to docs with internal VuePress links', () => {
    const md = externalFrontmatter + `
While [our instructions](https://docs.btcpayserver.org/deployment/lunanodewebdeployment) cover how to install BTCPayServer in one click on Azure or Lunanode, BTCPay Server is not limited to those options.`

    expect(pp(md)).toMatchSnapshot()
  })

  it('replaces links to docs with internal VuePress links', () => {
    const md = externalFrontmatter + `
([See the documentation](docs/pihole.md))`

    expect(pp(md)).toMatchSnapshot()
  })

  it('replaces repo internal links with external links', () => {
    const md = externalFrontmatter + `
When you run \`btcpay-setup.sh\`, your environment variables are used by [build.sh](build.sh) (or [build.ps1](build.ps1)) to generate a docker-compose adapted for your needs.
For the full list of options, see: [Environment variables](#environment-variables)

By default, the generated file is \`Generated/docker-compose.generated.yml\`, constructed from the relevant [Docker fragments](docker-compose-generator/docker-fragments) for your setup.

Available \`BTCPAYGEN_ADDITIONAL_FRAGMENTS\` currently are:

* [opt-save-storage](docker-compose-generator/docker-fragments/opt-save-storage.yml) will keep around 1 year of blocks (prune BTC for 100 GB)
* [opt-add-pihole](docker-compose-generator/docker-fragments/opt-add-pihole.yml) ([See the documentation](docs/pihole.md))`

    expect(pp(md)).toMatchSnapshot()
  })

  it('replaces external repo links with internal links', () => {
    const md = externalFrontmatter + `
[opt-unsafe-expose](https://github.com/btcpayserver/btcpayserver-docker/blob/master/README.md#generated-docker-compose)`

    expect(pp(md)).toMatchSnapshot()
  })
})
