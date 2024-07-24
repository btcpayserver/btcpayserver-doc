#!/bin/bash

set -e

BASE_DIR=$(cd `dirname $0` && pwd)
DOCS_DIR="$BASE_DIR/docs"
PUBLIC_DIR="$DOCS_DIR/.vuepress/public"
BTCPAYSERVER_DIR="$BASE_DIR/deps/btcpayserver"
NBXPLORER_DIR="$BASE_DIR/deps/nbxplorer"
CONFIGURATOR_DIR="$BASE_DIR/deps/configurator"
DOCKER_DIR="$BASE_DIR/deps/docker"
VAULT_DIR="$BASE_DIR/deps/vault"
TRANSMUTER_DIR="$BASE_DIR/deps/transmuter"
ZAPIER_DIR="$BASE_DIR/deps/zapier"
TROCADOR_DIR="$BASE_DIR/deps/trocador"
KUKKS_DIR="$BASE_DIR/deps/kukks"
SMARTSTORE_DIR="$BASE_DIR/deps/smartstore"
GRANDNODE_DIR="$BASE_DIR/deps/grandnode"
BOLTCARDPLUGIN_DIR="$BASE_DIR/deps/boltcardplugin"
ROCKSTAR_DIR="$BASE_DIR/deps/rockstar"
NOPCOMMERCE_DIR="$BASE_DIR/deps/nopcommerce"
XENFORO_DIR="$BASE_DIR/deps/xenforo"

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
cp -r docs/* "$DOCS_DIR/BTCPayServer"
line=$(grep -n '## How to manually test payments' $DOCS_DIR/BTCPayServer/LocalDevSetup.md | cut -d ":" -f 1)
{ echo $'---\neditLink: https://github.com/btcpayserver/btcpayserver-doc/edit/master/docs/Development/LocalDev.md\n---\n'; cat "$DOCS_DIR/Development/LocalDev.md"; echo; tail -n +$line "$DOCS_DIR/BTCPayServer/LocalDevSetup.md"; } > "$DOCS_DIR/Development/LocalDevelopment.md"

for file in "$DOCS_DIR"/BTCPayServer/*.md; do
  update_external "$file" https://github.com/btcpayserver/btcpayserver "$DOCS_DIR"/BTCPayServer/
done

# NBXplorer

echo "Setup dependency: NBXplorer"

rm -rf "$DOCS_DIR/NBXplorer"
mkdir -p "$DOCS_DIR/NBXplorer"

if [ ! -d "$NBXPLORER_DIR" ]; then
  git clone https://github.com/dgarage/NBXplorer.git "$NBXPLORER_DIR"
else
  cd "$NBXPLORER_DIR" && git checkout master && git pull
fi

cd "$NBXPLORER_DIR"

cp -r README.md docs/* "$DOCS_DIR/NBXplorer"
sed -ie 's$(./docs/$(./$g' "$DOCS_DIR/NBXplorer/README.md"
for file in "$DOCS_DIR"/NBXplorer/*.md; do
  update_external "$file" https://github.com/dgarage/NBXplorer "$DOCS_DIR"/NBXplorer/
done

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
cp -r docs/img/* "$DOCS_DIR/img"
line=$(grep -n '# Introduction' README.md | cut -d ":" -f 1)
tail -n +$line "README.md" > "$DOCS_DIR/Docker/README.md"
sed -ie 's$(docs/$(./$g' "$DOCS_DIR/Docker/README.md"
for file in "$DOCS_DIR"/Docker/*.md; do
  update_external "$file" https://github.com/btcpayserver/btcpayserver-docker "$DOCS_DIR"/Docker/
done

cp contrib/FastSync/README.md "$DOCS_DIR/Docker/fastsync.md"
sed -ie 's$(utxo-sets)$(https://github.com/btcpayserver/btcpayserver-docker/blob/master/contrib/FastSync/utxo-sets)$g' "$DOCS_DIR/Docker/fastsync.md"
sed -ie 's$(load-utxo-set.sh)$(https://github.com/btcpayserver/btcpayserver-docker/blob/master/contrib/FastSync/load-utxo-set.sh)$g' "$DOCS_DIR/Docker/fastsync.md"
sed -ie 's$(save-utxo-set.sh)$(https://github.com/btcpayserver/btcpayserver-docker/blob/master/contrib/FastSync/save-utxo-set.sh)$g' "$DOCS_DIR/Docker/fastsync.md"
sed -ie 's$(sigs/NicolasDorier.utxo-sets.asc)$(https://github.com/btcpayserver/btcpayserver-docker/blob/master/contrib/FastSync/sigs/NicolasDorier.utxo-sets.asc)$g' "$DOCS_DIR/Docker/fastsync.md"

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

rm -rf "$DOCS_DIR/Zapier"
mkdir -p "$DOCS_DIR/Zapier"

if [ ! -d "$ZAPIER_DIR" ]; then
  git clone --depth 1 https://github.com/btcpayserver/zapier.git "$ZAPIER_DIR"
else
  cd "$ZAPIER_DIR" && git checkout master && git pull
fi

cd "$ZAPIER_DIR"
cp -r README.md doc/* "$DOCS_DIR/Zapier"
sed -ie 's$(./doc/$(./$g' "$DOCS_DIR/Zapier/README.md"
for file in "$DOCS_DIR"/Zapier/*.md; do
  update_external "$file" https://github.com/btcpayserver/zapier "$DOCS_DIR"/Zapier/
done

# Trocador

echo "Setup dependency: Trocador"

rm -rf "$DOCS_DIR/Trocador"
mkdir -p "$DOCS_DIR/Trocador"

if [ ! -d "$TROCADOR_DIR" ]; then
  git clone --depth 1 https://github.com/saltrafael/trocador-plugin.git "$TROCADOR_DIR"
else
  cd "$TROCADOR_DIR" && git checkout master && git pull
fi

cd "$TROCADOR_DIR"
cp -r README.md "$DOCS_DIR/Trocador"
for file in "$DOCS_DIR"/Trocador/*.md; do
  update_external "$file" https://github.com/saltrafael/trocador-plugin "$DOCS_DIR"/Trocador/
done

# Smartstore

echo "Setup dependency: Smartstore"

rm -rf "$DOCS_DIR/Smartstore"
mkdir -p "$DOCS_DIR/Smartstore"

if [ ! -d "$SMARTSTORE_DIR" ]; then
  git clone --depth 1 https://github.com/btcpayserver/Smartstore.BTCPayServer.git "$SMARTSTORE_DIR"
else
  cd "$SMARTSTORE_DIR" && git checkout main && git pull
fi

cd "$SMARTSTORE_DIR"
cp -r src/Smartstore.Modules/Smartstore.BTCPayServer/README.md "$DOCS_DIR/Smartstore"
for file in "$DOCS_DIR"/Smartstore/*.md; do
  update_external "$file" https://github.com/btcpayserver/Smartstore.BTCPayServer.git "$DOCS_DIR"/Smartstore/
done

# Grandnode

echo "Setup dependency: Grandnode"

rm -rf "$DOCS_DIR/Grandnode"
mkdir -p "$DOCS_DIR/Grandnode"

if [ ! -d "$GRANDNODE_DIR" ]; then
  git clone --depth 1 https://github.com/btcpayserver/grandnode.git "$GRANDNODE_DIR"
else
  cd "$GRANDNODE_DIR" && git checkout main && git pull
fi

cd "$GRANDNODE_DIR"
cp -r README.md "$DOCS_DIR/Grandnode"
for file in "$DOCS_DIR"/Grandnode/*.md; do
  update_external "$file" https://github.com/btcpayserver/grandnode.git "$DOCS_DIR"/Grandnode/
done

# Nopcommerce

echo "Setup dependency: Nopcommerce"

rm -rf "$DOCS_DIR/Nopcommerce"
mkdir -p "$DOCS_DIR/Nopcommerce"

if [ ! -d "$NOPCOMMERCE_DIR" ]; then
  git clone --depth 1 https://github.com/btcpayserver/nopcommerce.git "$NOPCOMMERCE_DIR"
else
  cd "$NOPCOMMERCE_DIR" && git checkout main && git pull
fi

cd "$NOPCOMMERCE_DIR"
cp -r README.md "$DOCS_DIR/Nopcommerce"
for file in "$DOCS_DIR"/Nopcommerce/*.md; do
  update_external "$file" https://github.com/btcpayserver/nopcommercee.git "$DOCS_DIR"/Nopcommerce/
done

# Xenforo

echo "Setup dependency: Xenforo"

rm -rf "$DOCS_DIR/Xenforo"
mkdir -p "$DOCS_DIR/Xenforo"

if [ ! -d "$XENFORO_DIR" ]; then
  git clone --depth 1 https://github.com/btcpayserver/xenforo.git "$XENFORO_DIR"
else
  cd "$XENFORO_DIR" && git checkout main && git pull
fi

cd "$XENFORO_DIR"
cp -r README.md "$DOCS_DIR/Xenforo"
for file in "$DOCS_DIR"/Xenforo/*.md; do
  update_external "$file" https://github.com/btcpayserver/xenforo.git "$DOCS_DIR"/Xenforo/
done


# Kukks' plugins

echo "Setup dependency: Kukks' plugins"

rm -rf "$DOCS_DIR/TicketTailor" "$DOCS_DIR/Nostr" "$DOCS_DIR/Wabisabi" "$DOCS_DIR/SideShift" "$DOCS_DIR/Breez" "$DOCS_DIR/Bringin" "$DOCS_DIR/DynamicReports"
mkdir -p "$DOCS_DIR/TicketTailor" "$DOCS_DIR/Nostr" "$DOCS_DIR/Wabisabi" "$DOCS_DIR/SideShift" "$DOCS_DIR/Breez" "$DOCS_DIR/Bringin" "$DOCS_DIR/DynamicReports"

if [ ! -d "$KUKKS_DIR" ]; then
  git clone --depth 1 https://github.com/Kukks/BTCPayServerPlugins.git "$KUKKS_DIR"
else
  cd "$KUKKS_DIR" && git checkout master && git pull
fi

cd "$KUKKS_DIR/Plugins/BTCPayServer.Plugins.Wabisabi"

cp -r readme.md docs/* "$DOCS_DIR/Wabisabi"
sed -ie 's$docs/$./$g' "$DOCS_DIR/Wabisabi/readme.md"
for file in "$DOCS_DIR"/Wabisabi/*.md; do
  update_external "$file" https://github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.Wabisabi "$DOCS_DIR"/Wabisabi/
done

cd "$KUKKS_DIR/Plugins/BTCPayServer.Plugins.TicketTailor"

cp -r README.md "$DOCS_DIR/TicketTailor"
for file in "$DOCS_DIR"/TicketTailor/*.md; do
  update_external "$file" https://github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.TicketTailor "$DOCS_DIR"/TicketTailor/
done

cd "$KUKKS_DIR/Plugins/BTCPayServer.Plugins.NIP05"

cp -r readme.md "$DOCS_DIR/Nostr"
for file in "$DOCS_DIR"/Nostr/*.md; do
  update_external "$file" https://github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.NIP05 "$DOCS_DIR"/Nostr/
done

cd "$KUKKS_DIR/Plugins/BTCPayServer.Plugins.SideShift"

cp -r README.md "$DOCS_DIR/SideShift"
for file in "$DOCS_DIR"/SideShift/*.md; do
  sed -i 's/[^[:print:]\t]//g' "$file"
  update_external "$file" https://github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.SideShift "$DOCS_DIR"/SideShift/
done

cd "$KUKKS_DIR/Plugins/BTCPayServer.Plugins.Breez"

cp -r README.md "$DOCS_DIR/Breez"
for file in "$DOCS_DIR"/Breez/*.md; do
  update_external "$file" https://github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.Breez "$DOCS_DIR"/Breez/
done

cd "$KUKKS_DIR/Plugins/BTCPayServer.Plugins.Bringin"

cp -r README.md "$DOCS_DIR/Bringin"
for file in "$DOCS_DIR"/Bringin/*.md; do
  update_external "$file" https://github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.Bringin "$DOCS_DIR"/Bringin/
done

cd "$KUKKS_DIR/Plugins/BTCPayServer.Plugins.DynamicReports"

cp -r README.md "$DOCS_DIR/DynamicReports"
for file in "$DOCS_DIR"/DynamicReports/*.md; do
  sed -i 's/[^[:print:]\t]//g' "$file"
  update_external "$file" https://github.com/Kukks/BTCPayServerPlugins/tree/master/Plugins/BTCPayServer.Plugins.DynamicReports "$DOCS_DIR"/DynamicReports/
done


# Rockstar' plugins

echo "Setup dependency: Rockstar' plugins"

rm -rf "$DOCS_DIR/Payroll"
mkdir -p "$DOCS_DIR/Payroll"

if [ ! -d "$ROCKSTAR_DIR" ]; then
  git clone --depth 1 https://github.com/rockstardev/BTCPayServerPlugins.RockstarDev.git "$ROCKSTAR_DIR"
else
  cd "$ROCKSTAR_DIR" && git checkout master && git pull
fi

cd "$ROCKSTAR_DIR/Plugins/BTCPayServer.RockstarDev.Plugins.Payroll"

cp -r README.md "$DOCS_DIR/Payroll"
for file in "$DOCS_DIR"/Payroll/*.md; do
  sed -i 's/[^[:print:]\t]//g' "$file"
  update_external "$file" https://github.com/rockstardev/BTCPayServerPlugins.RockstarDev/tree/master/Plugins/BTCPayServer.RockstarDev.Plugins.Payroll "$DOCS_DIR"/Payroll/
done




# Swagger

# BTCPay Swagger: Checkout latest release tag, so that we do not publish docs for unreleased APIs yet

cd "$BTCPAYSERVER_DIR"

git checkout $(git tag --sort -version:refname | awk 'match($0, /^v[0-9]+\.[0-9]+\.[0-9]+$/)' | head -n 1)

# Swagger
if command -v jq >/dev/null 2>&1; then
  swagger_file="$PUBLIC_DIR/API/Greenfield/v1/swagger.json"
  jq -rs 'def deepmerge(a;b):
  reduce b[] as $item (a;
    reduce ($item | keys_unsorted[]) as $key (.;
      $item[$key] as $val | ($val | type) as $type | .[$key] = if ($type == "object") then
        deepmerge({}; [if .[$key] == null then {} else .[$key] end, $val])
      elif ($type == "array") then
        (.[$key] + $val | unique)
      else
        $val
      end)
    );
  deepmerge({}; .)' BTCPayServer/wwwroot/swagger/v1/*.json $BASE_DIR/swagger/btcpay.json > $swagger_file

  # report but don't stop on error
  set +e
  REDOCLY_TELEMETRY=off npx @redocly/cli lint $swagger_file
  set -e
fi

# We need the base file to be able to generate the swagger for the plugins
cp BTCPayServer/wwwroot/swagger/v1/swagger.template.json $BASE_DIR/swagger/plugins/btcpay.json

# Plugin Swagger

cd $BASE_DIR

if command -v jq >/dev/null 2>&1; then
  swagger_file="$PUBLIC_DIR/API/Greenfield/Plugins/swagger.json"
  jq -rs 'def deepmerge(a;b):
  reduce b[] as $item (a;
    reduce ($item | keys_unsorted[]) as $key (.;
      $item[$key] as $val | ($val | type) as $type | .[$key] = if ($type == "object") then
        deepmerge({}; [if .[$key] == null then {} else .[$key] end, $val])
      elif ($type == "array") then
        (.[$key] + $val | unique)
      else
        $val
      end)
    );
  deepmerge({}; .)' swagger/plugins/btcpay.json swagger/plugins.json swagger/plugins/**/*.json > $swagger_file

  # report but don't stop on error
  set +e
  REDOCLY_TELEMETRY=off npx @redocly/cli lint $swagger_file --skip-rule=no-unused-components
  set -e
fi
