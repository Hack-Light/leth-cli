# Description

A CLI for querying blockchain data, interacting with smart contracts, transfer funds, generating accounts and more

[Video Demo](https://youtu.be/2xRcDvSwDOk)

# Table of contents

  <!-- toc -->

- [Usage](#usage)
- [Commands](#commands)
<!-- tocstop -->

# Usage

  <!-- usage -->

```sh-session
$ yarn global add leth-cli
$ leth COMMAND
running command...
$ leth (--version)
leth-cli/1.3.0 darwin-x64 node-v16.20.0
$ leth --help [COMMAND]
USAGE
  $ leth COMMAND
...
```

<!-- usagestop -->

# Commands

  <!-- commands -->

- [`leth abi-add ABIPATH`](#leth-abi-add-name-abipath)
- [`leth abi-delete`](#leth-abi-delete-name)
- [`leth abi-functions`](#leth-abi-functions-name)
- [`leth abi-list`](#leth-abi-list)
- [`leth abi-update ABIPATH`](#leth-abi-update-name-abipath)
- [`leth address-balance ADDRESS|ENS`](#leth-account-balance-ADDRESS|ENS)
- [`leth address-generate`](#leth-address-generate)
- [`leth contract ADDRESS ABI`](#leth-contract-address-abi)
- [`leth convert UNIT`](#leth-convert-unit)
- [`leth ens-buy ENS`](#leth-ens-buy-ens)
- [`leth ens-lookup`](#leth-ens-lookup)
- [`leth ens-search ENS`](#leth-ens-search-ens)
- [`leth help [COMMANDS]`](#leth-help-commands)
- [`leth plugins`](#leth-plugins)
- [`leth plugins:install PLUGIN...`](#leth-pluginsinstall-plugin)
- [`leth plugins:inspect PLUGIN...`](#leth-pluginsinspect-plugin)
- [`leth plugins:install PLUGIN...`](#leth-pluginsinstall-plugin-1)
- [`leth plugins:link PLUGIN`](#leth-pluginslink-plugin)
- [`leth plugins:uninstall PLUGIN...`](#leth-pluginsuninstall-plugin)
- [`leth plugins:uninstall PLUGIN...`](#leth-pluginsuninstall-plugin-1)
- [`leth plugins:uninstall PLUGIN...`](#leth-pluginsuninstall-plugin-2)
- [`leth plugins update`](#leth-plugins-update)
- [`leth transfer-file [PATH] [KEY]`](#leth-transfer-file-path-key)
- [`leth transfer-multiple TO(s) AMOUNT [KEY]`](#leth-transfer-multiple-to-amount-key)
- [`leth transfer-percentage TO(s) PERCENTAGE(s) AMOUNT [KEY]`](#leth-transfer-percentage-to-amount-key)
- [`leth transfer-single TO AMOUNT [KEY]`](#leth-transfer-single-to-amount-key)

## `leth abi NAME`

gets abi from storage

```
USAGE
  $ leth abi NAME

ARGUMENTS
  NAME  abi name in storage

DESCRIPTION
  gets abi from storage

EXAMPLES
  $ leth abi erc20ABI
```

_See code: [dist/commands/abi/index.ts]()_

## `leth abi-add NAME ABIPATH`

stores contract abi

```
USAGE
  $ leth abi-add ABIPATH

ARGUMENTS
  ABIPATH  path to abi

DESCRIPTION
  stores contract abi

ALIASES
  $ leth abi-add

EXAMPLES
  $ leth abi-add ./erc20ABI.json
```

## `leth abi-delete`

deletes contract abi

```
USAGE
  $ leth abi-delete

ARGUMENTS

DESCRIPTION
  removes contract abi

ALIASES
  $ leth abi-delete

EXAMPLES
  $ leth abi-delete
```

## `leth abi-functions`

lists all methods of abi

```
USAGE
  $ leth abi-methods

ARGUMENTS
  NAME  abi name in storage

DESCRIPTION
  lists all methods of abi

ALIASES
  $ leth abi-methods

EXAMPLES
  $ leth abi-methods
```

## `leth abi-list`

lists all stored abi names

```
USAGE
  $ leth abi-list

DESCRIPTION
  lists all stored abi names

ALIASES
  $ leth abi-list

EXAMPLES
  $ leth abi-list
```

## `leth abi-update ABIPATH`

updates contract abi

```
USAGE
  $ leth abi-update ABIPATH

ARGUMENTS
  ABIPATH  path to abi

DESCRIPTION
  updates contract abi

ALIASES
  $ leth abi-update

EXAMPLES
  $ leth abi-update ./erc20ABI.json
```

## `leth address-balance ADDRESS|ENS`

gets address balance of address or ens. default network: localhost

```
USAGE
  $ leth address-balance ADDRESSorENS [--mainnet | --rpc_url <value> |  | --sepolia | --goerli | --arbitrum |
    --arbitrumGoerli | --optimism | --optimismGoerli | --polygon | --polygonMumbai] [--wei | --kwei | --mwei | --gwei |
    --szabo | --finney | --ether]

ARGUMENTS
  ADDRESSORENS  account address or ens name

FLAGS
  --arbitrum         provider network
  --arbitrumGoerli   provider network
  --ether            eth denomination
  --finney           eth denomination
  --goerli           provider network
  --gwei             eth denomination
  --kwei             eth denomination
  --mainnet          provider network
  --mwei             eth denomination
  --optimism         provider network
  --optimismGoerli   provider network
  --polygon          provider network
  --polygonMumbai    provider network
  --rpc_url=<value>  provider network rpc url
  --sepolia          provider network
  --szabo            eth denomination
  --wei              eth denomination

DESCRIPTION
  gets address balance of address or ens. default network: localhost

ALIASES
  $ leth account-balance

EXAMPLES
  $ leth account-balance 0xF51CD0d607c82db2B70B678554c52C266a9D49B6 --mainnet

  $ leth account-balance valentineorga.eth --rpc_url=[PROVIDER_URL]

  $ leth account-balance 0xF51CD0d607c82db2B70B678554c52C266a9D49B6 --mainnet --wei
```

## `leth address-generate`

generates a new random address

```
USAGE
  $ leth address-generate [--export]

FLAGS
  --export  enables export for mnemonic and private key to '0xnewAddress.json' file in current directory

DESCRIPTION
  generates a new random address

EXAMPLES
  $ leth address-generate

  $ leth address-generate --export
```

_See code: [dist/commands/generateAccount.ts](https://github.com/ValentineCodes/leth/blob/v1.0.0/dist/commands/generateAccount.ts)_

## `leth contract ADDRESS ABI`

exposes a `contract` instance in a REPL environment for making contract calls

```
USAGE
  $ leth contract ADDRESS ABI [--mainnet | --rpc_url <value> |  | --sepolia | --goerli | --arbitrum |
    --arbitrumGoerli | --optimism | --optimismGoerli | --polygon | --polygonMumbai] [--privateKey <value>]

ARGUMENTS
  ADDRESS  contract address
  ABI      abi name saved using `leth abi-add`

FLAGS
  --arbitrum             provider network
  --arbitrumGoerli       provider network
  --goerli               provider network
  --mainnet              provider network
  --optimism             provider network
  --optimismGoerli       provider network
  --polygon              provider network
  --polygonMumbai        provider network
  --privateKey=<value>   private key of transaction signer
  --rpc_url=<value>      provider network rpc url
  --sepolia              provider network

DESCRIPTION
  exposes a `contract` instance in a REPL environment for making contract calls

EXAMPLES
  $ leth contract 0xF51CD0d607c82db2B7EB670554C82C276A9549B4 erc20ABI --mainnet

  > await contract.name()

  > await contract.getterFunction()

  $ leth contract 0xF51CD0d607c82db2B7EB670554C82C276A9549B4 erc20ABI --privateKey=0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e --mainnet

  > await contract.mint()

  > await contract.setterFunction({value: '10000000000000'})
```

## `leth convert UNIT`

convert from eth to wei or vice versa

```
USAGE
  $ leth convert UNIT [--wei]

ARGUMENTS
  UNIT  number to convert

FLAGS
  --wei  eth denomination

DESCRIPTION
  convert from eth to wei or vice versa

EXAMPLES
  $ leth convert 1000000000000000000

  $ leth convert 1 --wei
```

## `leth ens-buy NAME OWNER_ADDRESS DURATION`

helps register a new ens name

```
USAGE
  $ leth ens-buy NAME OWNER_ADDRESS DURATION [--mainnet | --rpc_url <value> |  | --sepolia | --goerli | --arbitrum |
    --arbitrumGoerli | --optimism | --optimismGoerli | --polygon | --polygonMumbai] [--privateKey <value>]

ARGUMENTS
  ADDRESS  contract address
  ABI      abi name saved using `leth abi-add`

FLAGS
  --arbitrum             provider network
  --arbitrumGoerli       provider network
  --goerli               provider network
  --mainnet              provider network
  --optimism             provider network
  --optimismGoerli       provider network
  --polygon              provider network
  --polygonMumbai        provider network
  --privateKey=<value>   private key of transaction signer
  --rpc_url=<value>      provider network rpc url
  --sepolia              provider network

DESCRIPTION
  helps you register a new ens name


EXAMPLES
  $ leth 0xtumenD.eth 0x33C17B73D8F961Fd98a7f180a8d7a9B32aCB4ECE 1 --goerli --privateKey [PRIVATE-KEY]
```

## `leth ens-lookup`

resolves an ens to ethereum address and vice versa

```
USAGE
  $ leth ens-lookup [--domain <value> | --address <value>] [--mainnet | --rpc_url <value> |  | --sepolia | --goerli | --arbitrum |
    --arbitrumGoerli | --optimism | --optimismGoerli | --polygon | --polygonMumbai]

ARGUMENTS
  ACCOUNT  account address

FLAGS
  --arbitrum         provider network
  --arbitrumGoerli   provider network
  --goerli           provider network
  --mainnet          provider network
  --optimism         provider network
  --optimismGoerli   provider network
  --polygon          provider network
  --polygonMumbai    provider network
  --rpc_url=<value>  provider network rpc url
  --sepolia          provider network
  --address          address you want to resolve
  --domain           ens name you want to resolve

DESCRIPTION
  resolves an ens to ethereum address and vice versa

ALIASES
  $ leth ens-lookup

EXAMPLES
  $ leth ens-lookup --mainnet --domain 0xlight

  $ leth ens-lookup --address 0x00..00 --rpc_url=[PROVIDER_URL]
```

## `leth ens-search ENS`

search if an ens name is still available

```
USAGE
  $ leth ens-search NAME [--mainnet | --rpc_url <value> |  | --sepolia | --goerli | --arbitrum |
    --arbitrumGoerli | --optimism | --optimismGoerli | --polygon | --polygonMumbai]

ARGUMENTS
  ACCOUNT  account address

FLAGS
  --arbitrum         provider network
  --arbitrumGoerli   provider network
  --goerli           provider network
  --mainnet          provider network
  --optimism         provider network
  --optimismGoerli   provider network
  --polygon          provider network
  --polygonMumbai    provider network
  --rpc_url=<value>  provider network rpc url
  --sepolia          provider network

DESCRIPTION
  search if an ens name is still available

ALIASES
  $ leth ens-search

EXAMPLES
  $ leth ens-search --mainnet 0xlight
```

## `leth help [COMMANDS]`

Display help for leth.

```
USAGE
  $ leth help [COMMANDS] [-n]

ARGUMENTS
  COMMANDS  Command to show help for.

FLAGS
  -n, --nested-commands  Include all nested commands in the output.

DESCRIPTION
  Display help for leth.
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v5.2.9/src/commands/help.ts)_

## `leth plugins`

List installed plugins.

```
USAGE
  $ leth plugins [--core]

FLAGS
  --core  Show core plugins.

DESCRIPTION
  List installed plugins.

EXAMPLES
  $ leth plugins
```

_See code: [@oclif/plugin-plugins](https://github.com/oclif/plugin-plugins/blob/v2.4.7/src/commands/plugins/index.ts)_

## `leth plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ leth plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ leth plugins add

EXAMPLES
  $ leth plugins:install myplugin

  $ leth plugins:install https://github.com/someuser/someplugin

  $ leth plugins:install someuser/someplugin
```

## `leth plugins:inspect PLUGIN...`

Displays installation properties of a plugin.

```
USAGE
  $ leth plugins:inspect PLUGIN...

ARGUMENTS
  PLUGIN  [default: .] Plugin to inspect.

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

GLOBAL FLAGS
  --json  Format output as json.

DESCRIPTION
  Displays installation properties of a plugin.

EXAMPLES
  $ leth plugins:inspect myplugin
```

## `leth plugins:install PLUGIN...`

Installs a plugin into the CLI.

```
USAGE
  $ leth plugins:install PLUGIN...

ARGUMENTS
  PLUGIN  Plugin to install.

FLAGS
  -f, --force    Run yarn install with force flag.
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Installs a plugin into the CLI.
  Can be installed from npm or a git url.

  Installation of a user-installed plugin will override a core plugin.

  e.g. If you have a core plugin that has a 'hello' command, installing a user-installed plugin with a 'hello' command
  will override the core plugin implementation. This is useful if a user needs to update core plugin functionality in
  the CLI without the need to patch and update the whole CLI.


ALIASES
  $ leth plugins add

EXAMPLES
  $ leth plugins:install myplugin

  $ leth plugins:install https://github.com/someuser/someplugin

  $ leth plugins:install someuser/someplugin
```

## `leth plugins:link PLUGIN`

Links a plugin into the CLI for development.

```
USAGE
  $ leth plugins:link PLUGIN

ARGUMENTS
  PATH  [default: .] path to plugin

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Links a plugin into the CLI for development.
  Installation of a linked plugin will override a user-installed or core plugin.

  e.g. If you have a user-installed or core plugin that has a 'hello' command, installing a linked plugin with a 'hello'
  command will override the user-installed or core plugin implementation. This is useful for development work.


EXAMPLES
  $ leth plugins:link myplugin
```

## `leth plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ leth plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ leth plugins unlink
  $ leth plugins remove
```

## `leth plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ leth plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ leth plugins unlink
  $ leth plugins remove
```

## `leth plugins:uninstall PLUGIN...`

Removes a plugin from the CLI.

```
USAGE
  $ leth plugins:uninstall PLUGIN...

ARGUMENTS
  PLUGIN  plugin to uninstall

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Removes a plugin from the CLI.

ALIASES
  $ leth plugins unlink
  $ leth plugins remove
```

## `leth plugins update`

Update installed plugins.

```
USAGE
  $ leth plugins update [-h] [-v]

FLAGS
  -h, --help     Show CLI help.
  -v, --verbose

DESCRIPTION
  Update installed plugins.
```

## `leth transfer-file FILE privateKey`

handle transfer of funds from a file

```
USAGE
  $ leth transfer-file FILE privateKey [--mainnet | --rpc_url <value> |  | --sepolia | --goerli | --arbitrum
    | --arbitrumGoerli | --optimism | --optimismGoerli | --polygon | --polygonMumbai]

ARGUMENTS
  FILE         path to .csv file
  privateKey   private key of transaction signer

FLAGS
  --arbitrum         provider network
  --arbitrumGoerli   provider network
  --goerli           provider network
  --mainnet          provider network
  --optimism         provider network
  --optimismGoerli   provider network
  --polygon          provider network
  --polygonMumbai    provider network
  --rpc_url=<value>  provider network rpc url
  --sepolia          provider network

DESCRIPTION
  handle transfer of funds from a file

EXAMPLES
  $ leth transfer-file ./test.csv <PRIVATE_KEY>

SAMPLE .csv FILE CONTENT
  0xDf3e342F10d786365E00baf3722D74b35CCafC2a,0.0005
  0x33C17B73D8F961Fd98a7f180a8d7a9B32aCB4ECE,0.0005
```

_See code: [dist/commands/transfer.ts](https://github.com/ValentineCodes/leth/blob/v1.2.1/dist/commands/transfer.ts)_

## `leth transfer-multiple TO AMOUNT privateKey`

handles multiple transfer of same amount of fund to different addresses

```
USAGE
  $ leth transfer-multiple TO AMOUNT privateKey [--mainnet | --rpc_url <value> |  | --sepolia | --goerli | --arbitrum
    | --arbitrumGoerli | --optimism | --optimismGoerli | --polygon | --polygonMumbai]

ARGUMENTS
  TO           address of receivers (comma seperated)
  AMOUNT       amount in eth
  privateKey   private key of transaction signer

FLAGS
  --arbitrum         provider network
  --arbitrumGoerli   provider network
  --goerli           provider network
  --mainnet          provider network
  --optimism         provider network
  --optimismGoerli   provider network
  --polygon          provider network
  --polygonMumbai    provider network
  --rpc_url=<value>  provider network rpc url
  --sepolia          provider network

DESCRIPTION
  handles multiple transfer of same amount of fund to different addresses

EXAMPLES
  $ leth transfer-multiple 0xYourAddress1,0xYourENS,0xYourAddress3 5 <PRIVATE_KEY> --mainnet
```

_See code: [dist/commands/transfer.ts]()_

## `leth transfer-percentage TO PERCENTAGE AMOUNT privateKey`

handles transfer of percentage of an amount to a list of addresses

```
USAGE
  $ leth transfer-percentage TO PERCENTAGE AMOUNT privateKey [--mainnet | --rpc_url <value> |  | --sepolia | --goerli | --arbitrum
    | --arbitrumGoerli | --optimism | --optimismGoerli | --polygon | --polygonMumbai]

ARGUMENTS
  TO           address of receivers (comma seperated)
  PERCENTAGE   percentage to send to each address (comma seperated and must match the number of addresses)
  AMOUNT       amount in eth
  privateKey   private key of transaction signer

FLAGS
  --arbitrum         provider network
  --arbitrumGoerli   provider network
  --goerli           provider network
  --mainnet          provider network
  --optimism         provider network
  --optimismGoerli   provider network
  --polygon          provider network
  --polygonMumbai    provider network
  --rpc_url=<value>  provider network rpc url
  --sepolia          provider network

DESCRIPTION
  handles transfer of percentage of an amount to a list of addresses

EXAMPLES
  $ leth transfer-percentage 0xYourAddress1,0xYourENS,0xYourAddress3 30,30,40 5 <PRIVATE_KEY> --mainnet
```

_See code: [dist/commands/transfer.ts]()_

## `leth transfer-single TO AMOUNT privateKey`

handles transfer of token to a single address

```
USAGE
  $ leth transfer-single TO AMOUNT privateKey [--mainnet | --rpc_url <value> |  | --sepolia | --goerli | --arbitrum
    | --arbitrumGoerli | --optimism | --optimismGoerli | --polygon | --polygonMumbai]

ARGUMENTS
  TO           address of receiver
  AMOUNT       amount in eth
  privateKey   private key of transaction signer

FLAGS
  --arbitrum         provider network
  --arbitrumGoerli   provider network
  --goerli           provider network
  --mainnet          provider network
  --optimism         provider network
  --optimismGoerli   provider network
  --polygon          provider network
  --polygonMumbai    provider network
  --rpc_url=<value>  provider network rpc url
  --sepolia          provider network

DESCRIPTION
  handles transfer of token to a single address

EXAMPLES
  $ leth transfer-single 0xYourAddress1 5 <PRIVATE_KEY> --mainnet
```

_See code: [dist/commands/transfer.ts]()_
