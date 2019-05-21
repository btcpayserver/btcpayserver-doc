# Extended Manual Setup

This document lists steps for manually deploying BTCPay Server and additional related components. Following these steps is likely to take a long time. A shorter and more pragmatic approach is to use a [docker based deployment](https://github.com/btcpayserver/btcpayserver-docker).

#### Warning: Not recommended for production use

Manual installation is NOT recommended for production use unless you are very confident with your Operating System and Bitcoin security expertise. If you are unsure use [docker](https://github.com/btcpayserver/btcpayserver-docker).

## Installation Steps Overview

The instructions in this document were tested on Ubuntu 18.04. They should be applicable to other Linux based distributions. The instructions are also based on all components running on the same instance. It's possible to split the components across different instances but that is not covered.

### Prerequisites:

1) Postgresql,
2) Tor,
3) NGINX.

### Application Components

1) Bitcoin Daemon,
2) NBXplorer,
3) BTCPay Server,
4) Lightning Network Daemon (lnd),
5) Ride The Lightning (RTL).

## Postgresql

Postgresql is used by BTCPay Server. If you're happy using the default of an SQLite to store your BTCPay Server settings then you do not need to install Postgresql.

##### :truck: Install

```bash
~$ sudo apt install postgresql postgresql-contrib
```

##### :thumbsup: Check

```bash
~$ psql --version
psql (PostgreSQL) 10.8 (Ubuntu 10.8-0ubuntu0.18.04.1)
~$ sudo systemctl status postgresql
~$ sudo -u postgres psql
psql (10.8 (Ubuntu 10.8-0ubuntu0.18.04.1))
Type "help" for help.

postgres=# \q
```

##### :black_nib: Configuration

See btcpay DB section below.


