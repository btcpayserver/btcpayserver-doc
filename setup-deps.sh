#!/bin/bash

set -e

BASE_DIR=$(cd `dirname $0` && pwd)
DOCS_DIR="$BASE_DIR/docs"
PUBLIC_DIR="$DOCS_DIR/.vuepress/public"
BTCPAYSERVER_DIR="$BASE_DIR/deps/btcpayserver"
CONFIGURATOR_DIR="$BASE_DIR/deps/configurator"
DOCKER_DIR="$BASE_DIR/deps/docker"
TRANSMUTER_DIR="$BASE_DIR/deps/transmuter"

update_external() {
  file="$1"
  repo="$2"
  content=$(cat "$file")
  # add frontmatter to omit edit links for external docs
  echo $'---\neditLink: false\nexternalRepo: '"$repo"$'\n---\n'"$content" > "$file"
}

# BTCPay Server

rm -rf "$DOCS_DIR/BTCPayServer"
mkdir -p "$DOCS_DIR/BTCPayServer"

if [ ! -d "$BTCPAYSERVER_DIR" ]; then
  git clone https://github.com/btcpayserver/btcpayserver.git "$BTCPAYSERVER_DIR"
else
  cd "$BTCPAYSERVER_DIR" && git checkout master && git pull
fi

cd "$BTCPAYSERVER_DIR"

cp SECURITY.md "$DOCS_DIR/BTCPayServer/Security.md"
cp BTCPayServer.Tests/README.md "$DOCS_DIR/BTCPayServer/LocalDevSetup.md"
line=$(grep -n '## How to' $DOCS_DIR/BTCPayServer/LocalDevSetup.md | cut -d ":" -f 1)
{ cat "$DOCS_DIR/LocalDev.md"; echo; tail -n +$line "$DOCS_DIR/BTCPayServer/LocalDevSetup.md"; } > "$DOCS_DIR/LocalDevelopment.md"

for file in "$DOCS_DIR"/BTCPayServer/*.md; do
  update_external "$file" https://github.com/btcpayserver/btcpayserver
done

# Checkout latest release tag, so that we do not publish docs for unreleased APIs yet.
git checkout $(git tag --sort=-refname | awk 'match($0, /^v[0-9]+\./)' | head -n 1)

if command -v jq >/dev/null 2>&1; then
  jq -rs 'reduce .[] as $item ({}; . * $item)' BTCPayServer/wwwroot/swagger/v1/*.json > "$PUBLIC_DIR/API/Greenfield/v1/swagger.json"
fi

# Configurator

rm -rf "$DOCS_DIR/Configurator"
mkdir -p "$DOCS_DIR/Configurator"

if [ ! -d "$CONFIGURATOR_DIR" ]; then
  git clone https://github.com/btcpayserver/btcpayserver-configurator.git "$CONFIGURATOR_DIR"
else
  cd "$CONFIGURATOR_DIR" && git checkout master && git pull
fi

cd "$CONFIGURATOR_DIR"
cp -r README.md docs/* "$DOCS_DIR/Configurator"
sed -ie 's$(./docs/$(./$g' "$DOCS_DIR/Configurator/README.md"
for file in "$DOCS_DIR"/Configurator/*.md; do
  update_external "$file" https://github.com/btcpayserver/btcpayserver-configurator
done

# Docker

rm -rf "$DOCS_DIR/Docker"
mkdir -p "$DOCS_DIR/Docker"

if [ ! -d "$DOCKER_DIR" ]; then
  git clone https://github.com/btcpayserver/btcpayserver-docker.git "$DOCKER_DIR"
else
  cd "$DOCKER_DIR" && git checkout master && git pull
fi

cd "$DOCKER_DIR"
cp -r README.md docs/* "$DOCS_DIR/Docker"
sed -ie 's$(docs/$(./$g' "$DOCS_DIR/Docker/README.md"
for file in "$DOCS_DIR"/Docker/*.md; do
  update_external "$file" https://github.com/btcpayserver/btcpayserver-docker
done

# Transmuter

rm -rf "$DOCS_DIR/Transmuter"
mkdir -p "$DOCS_DIR/Transmuter"

if [ ! -d "$TRANSMUTER_DIR" ]; then
  git clone https://github.com/btcpayserver/btcTransmuter.git "$TRANSMUTER_DIR"
else
  cd "$TRANSMUTER_DIR" && git checkout master && git pull
fi

cd "$TRANSMUTER_DIR"
cp -r README.md docs/* "$DOCS_DIR/Transmuter"
sed -ie 's$(docs/$(./$g' "$DOCS_DIR/Transmuter/README.md"
for file in "$DOCS_DIR"/Transmuter/*.md; do
  update_external "$file" https://github.com/btcpayserver/btcTransmuter
done

# Monkey patch VuePress to properly handle clean URLs
sed -ie "s%, '.html%, '/%" "$BASE_DIR/node_modules/@vuepress/markdown/lib/link.js"
