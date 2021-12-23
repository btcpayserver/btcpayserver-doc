#!/bin/bash

set -e

BASE_DIR=$(cd `dirname $0` && pwd)
DOCS_DIR="$BASE_DIR/docs"
PUBLIC_DIR="$DOCS_DIR/.vuepress/public"
BTCPAYSERVER_DIR="$BASE_DIR/deps/btcpayserver"
CONFIGURATOR_DIR="$BASE_DIR/deps/configurator"
DOCKER_DIR="$BASE_DIR/deps/docker"
VAULT_DIR="$BASE_DIR/deps/vault"
TRANSMUTER_DIR="$BASE_DIR/deps/transmuter"
ZAPIER_DIR="$BASE_DIR/deps/zapier"

update_external() {
  file="$1"
  repo="$2"
  base="$3"
  path="${file#${base}}"
  [[ $path = "Security.md" ]] && path="SECURITY.md"
  [[ $path = "README.md" || $path = "SECURITY.md" ]] && folder="" || folder="docs/"
  content=$(cat "$file")
  # add frontmatter to omit edit links for external docs
  echo $'---\neditLink: '"$repo/edit/master/$folder$path"$'\nexternalRepo: '"$repo"$'\n---\n'"$content" > "$file"
}

# BTCPay Server

echo "Setup dependency: BTCPayServer"

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
line=$(grep -n '## How to manually test payments' $DOCS_DIR/BTCPayServer/LocalDevSetup.md | cut -d ":" -f 1)
{ echo $'---\neditLink: https://github.com/btcpayserver/btcpayserver-doc/edit/master/docs/Development/LocalDev.md\n---\n'; cat "$DOCS_DIR/Development/LocalDev.md"; echo; tail -n +$line "$DOCS_DIR/BTCPayServer/LocalDevSetup.md"; } > "$DOCS_DIR/Development/LocalDevelopment.md"

for file in "$DOCS_DIR"/BTCPayServer/*.md; do
  update_external "$file" https://github.com/btcpayserver/btcpayserver "$DOCS_DIR"/BTCPayServer/
done

# Checkout latest release tag, so that we do not publish docs for unreleased APIs yet.
git checkout $(git tag --sort=-refname | awk 'match($0, /^v[0-9]+\./)' | head -n 1)

if command -v jq >/dev/null 2>&1; then
  jq -rs 'reduce .[] as $item ({}; . * $item)' BTCPayServer/wwwroot/swagger/v1/*.json > "$PUBLIC_DIR/API/Greenfield/v1/swagger.json"
fi

# Vault

echo "Setup dependency: Vault"

rm -rf "$DOCS_DIR/Vault"
mkdir -p "$DOCS_DIR/Vault"

if [ ! -d "$VAULT_DIR" ]; then
  git clone https://github.com/btcpayserver/BTCPayServer.Vault.git "$VAULT_DIR"
else
  cd "$VAULT_DIR" && git checkout master && git pull
fi

cd "$VAULT_DIR"
cp -r README.md docs/* "$DOCS_DIR/Vault"
sed -ie 's$(docs/$(./$g' "$DOCS_DIR/Vault/README.md"
for file in "$DOCS_DIR"/Vault/*.md; do
  update_external "$file" https://github.com/btcpayserver/BTCPayServer.Vault "$DOCS_DIR"/Vault/
done

# Configurator

echo "Setup dependency: Configurator"

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
  update_external "$file" https://github.com/btcpayserver/btcpayserver-configurator "$DOCS_DIR"/Configurator/
done

# Docker

echo "Setup dependency: Docker"

rm -rf "$DOCS_DIR/Docker"
mkdir -p "$DOCS_DIR/Docker"

if [ ! -d "$DOCKER_DIR" ]; then
  git clone https://github.com/btcpayserver/btcpayserver-docker.git "$DOCKER_DIR"
else
  cd "$DOCKER_DIR" && git checkout master && git pull
fi

cd "$DOCKER_DIR"
cp -r docs/* "$DOCS_DIR/Docker"
line=$(grep -n '# Introduction' README.md | cut -d ":" -f 1)
tail -n +$line "README.md" > "$DOCS_DIR/Docker/README.md"
sed -ie 's$(docs/$(./$g' "$DOCS_DIR/Docker/README.md"
for file in "$DOCS_DIR"/Docker/*.md; do
  update_external "$file" https://github.com/btcpayserver/btcpayserver-docker "$DOCS_DIR"/Docker/
done

# Transmuter

echo "Setup dependency: Transmuter"

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
  update_external "$file" https://github.com/btcpayserver/btcTransmuter "$DOCS_DIR"/Transmuter/
done


# Zapier
echo "Setup dependency: Zapier"

rm -rf "$ZAPIER_DIR"
rm -rf "$DOCS_DIR/Zapier"
mkdir -p "$DOCS_DIR/Zapier"

if [ ! -d "$ZAPIER_DIR" ]; then
  git clone --depth 1 https://github.com/btcpayserver/zapier.git "$ZAPIER_DIR"
else
  cd "$ZAPIER_DIR"
fi

cd "$ZAPIER_DIR"
cp -r README.md doc/* "$DOCS_DIR/Zapier"
sed -ie 's$(./doc/$(./$g' "$DOCS_DIR/Zapier/README.md"
for file in "$DOCS_DIR"/Zapier/*.md; do
  update_external "$file" https://github.com/btcpayserver/zapier "$DOCS_DIR"/Zapier/
done
