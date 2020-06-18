#!/bin/bash

set -e

BASE_DIR=$(cd `dirname $0` && pwd)
DOCS_DIR=$BASE_DIR/docs
PUBLIC_DIR=$DOCS_DIR/.vuepress/public
BTCPAYSERVER_DIR=$BASE_DIR/deps/btcpayserver
DOCKER_DIR=$BASE_DIR/deps/docker
TRANSMUTER_DIR=$BASE_DIR/deps/transmuter

update_external() {
  # add frontmatter to omit edit links for external docs
  echo $'---\neditLink: false\nexternalRepo: '"$2"$'\n---\n'"$(cat $1)" > $1
}

# BTCPay Server

rm -rf $DOCS_DIR/BTCPayServer
mkdir -p $DOCS_DIR/BTCPayServer

if [ ! -d $BTCPAYSERVER_DIR ]; then
  git clone https://github.com/btcpayserver/btcpayserver.git $BTCPAYSERVER_DIR
else
  cd $BTCPAYSERVER_DIR && git checkout master && git pull
fi

cd $BTCPAYSERVER_DIR
jq -rs 'reduce .[] as $item ({}; . * $item)' BTCPayServer/wwwroot/swagger/v1/*.json > $PUBLIC_DIR/API/Greenfield/v1/swagger.json

# Docker

rm -rf $DOCS_DIR/Docker
mkdir -p $DOCS_DIR/Docker

if [ ! -d $DOCKER_DIR ]; then
  git clone https://github.com/btcpayserver/btcpayserver-docker.git $DOCKER_DIR
else
  cd $DOCKER_DIR && git checkout master && git pull
fi

cd $DOCKER_DIR
cp -r README.md docs/* $DOCS_DIR/Docker
sed -ie 's$(docs/$(./$g' $DOCS_DIR/Docker/README.md
for file in $DOCS_DIR/Docker/*.md; do
  update_external $file https://github.com/btcpayserver/btcpayserver-docker
done

# Transmuter

rm -rf $DOCS_DIR/Transmuter
mkdir -p $DOCS_DIR/Transmuter

if [ ! -d $TRANSMUTER_DIR ]; then
  git clone https://github.com/btcpayserver/btcTransmuter.git $TRANSMUTER_DIR
else
  cd $TRANSMUTER_DIR && git checkout master && git pull
fi

cd $TRANSMUTER_DIR
cp -r README.md docs/* $DOCS_DIR/Transmuter
sed -ie 's$(docs/$(./$g' $DOCS_DIR/Transmuter/README.md
for file in $DOCS_DIR/Transmuter/*.md; do
  update_external $file https://github.com/btcpayserver/btcTransmuter
done

# Monkey patch VuePress to properly handle clean URLs
sed -ie "s%, '.html%, '/%" "$BASE_DIR/node_modules/@vuepress/markdown/lib/link.js"
