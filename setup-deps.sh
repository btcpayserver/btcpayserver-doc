#!/bin/bash

set -e

BASE_DIR=$(cd `dirname $0` && pwd)
DOCS_DIR=$BASE_DIR/docs
PUBLIC_DIR=$DOCS_DIR/.vuepress/public
DOCKER_DIR=$BASE_DIR/deps/docker
TRANSMUTER_DIR=$BASE_DIR/deps/transmuter

update_external() {
  sed -ie 's*(https://github.com/btcpayserver/btcpayserver-doc/blob/master/*(../*g' $1
  sed -ie '1s*^*---\
editLink: false\
---\
*' $1
}

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
  update_external $file
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
  update_external $file
done
