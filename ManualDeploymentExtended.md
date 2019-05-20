# Extended Manual Setup

This document lists steps for manually deploying BTCPay Server and additional related components. Following these steps is likely to take a long time. A shorter and more pragmatic approach is to use a [docker based deployment](https://github.com/btcpayserver/btcpayserver-docker).

## Warning: Not recommended for production use

Manual installation is NOT recommended for production use unless you are very confident with your OS and Bitcoin security expertise. If you are unsure use [docker](https://github.com/btcpayserver/btcpayserver-docker).

## Installation Steps Overview

The instructions in this document were tested on Ubuntu 18.04. They should be applicable to other Linux based distributions.

Prerequisites

1) Postgresql
2) Tor
3) NGINX

Application

1) Bitcoin Daemon
2) NBXplorer
3) BTCPay Server
4) Lightning Network Daemon (lnd)
5) Ride The Lightning (RTL)
