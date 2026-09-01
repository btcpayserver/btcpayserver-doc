# Host integration

BTCPay Server delegates deployment-specific administration to an executable named
`btcpay-host`. A deployment can provide this executable to enable only the server
administration features that it supports without exposing general host access to BTCPay
Server.

BTCPay Server runs the executable directly and passes the command and its arguments as
regular process arguments:

```bash
btcpay-host <command> [arguments]
```

The executable must be available to the BTCPay Server process. Its path can be overridden
with the `btcpayhostexecutable` configuration setting.

## Environment discovery

BTCPay Server runs `btcpay-host env` during startup. A successful call must exit with status
`0` and write one JSON object to standard output:

```json
{
  "deploymentType": "btcpayserver-docker",
  "commands": ["changedomain", "update", "clean", "restart"]
}
```

The properties are:

- `deploymentType`: A stable identifier for the deployment implementation. BTCPay Server
  includes it in the startup log.
- `commands`: The commands supported by this deployment. BTCPay Server uses this list to
  decide which administration features to expose.

Invalid JSON, a nonzero exit status, or an unavailable executable disables the host-backed
administration features. BTCPay Server performs discovery only during startup, so it must be
restarted after the available commands change.

## Commands

A deployment can advertise any subset of the following commands:

| Command              | Arguments                                       | Successful output                         | Enables                                                               |
| -------------------- | ----------------------------------------------- | ----------------------------------------- | --------------------------------------------------------------------- |
| `showauthorizedkeys` | None                                            | The authorized keys file as a JSON string | Reading SSH keys in **Server Settings > Services > SSH**              |
| `setauthorizedkeys`  | The complete authorized keys file as argument 1 | Not used                                  | Updating SSH keys in **Server Settings > Services > SSH**             |
| `changedomain`       | The new domain as argument 1                    | Not used                                  | Changing the domain from **Server Settings > Maintenance**            |
| `update`             | None                                            | Not used                                  | Updating the deployment from **Server Settings > Maintenance**        |
| `clean`              | None                                            | Not used                                  | Cleaning unused host resources from **Server Settings > Maintenance** |
| `restart`            | None                                            | Not used                                  | Restarting the deployment from **Server Settings > Maintenance**      |

The SSH service is available only when both `showauthorizedkeys` and `setauthorizedkeys` are
advertised. Unknown command names in the `commands` array are ignored by BTCPay Server, so a
deployment can also expose commands for its own tools.

Commands should exit with status `0` when accepted. On failure, they should return a nonzero
status and write a diagnostic message to standard error. JSON-producing commands must reserve
standard output for their documented response.

## Security

`btcpay-host` is a privileged boundary between the BTCPay Server application and its
deployment. Implement only the required commands, validate every argument, and do not pass
untrusted values through a shell. The account running BTCPay Server should not receive broader
host access than these commands require.

The official [Docker deployment](https://github.com/btcpayserver/btcpayserver-docker) forwards
calls over SSH with a restricted key and a forced command. Its proxy serializes process
arguments as a JSON array for transport over SSH. That transport format is specific to the
Docker implementation and is not part of the `btcpay-host` interface.
