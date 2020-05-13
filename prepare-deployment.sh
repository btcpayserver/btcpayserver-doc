#!/bin/bash

set -e

# https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/
touch docs/.vuepress/dist/.nojekyll

# https://help.github.com/en/articles/managing-a-custom-domain-for-your-github-pages-site
echo docs.btcpayserver.org > docs/.vuepress/dist/CNAME

# Set up redirects
node create-redirects.js
