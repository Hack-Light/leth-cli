/* eslint-disable unicorn/prefer-node-protocol */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
import { Args, Command, Flags } from "@oclif/core";
import { providerNetworkFlags } from "../../libs/flags/network-flags";
import chalk from "chalk";
import { ContractInterface, ethers } from "ethers";
import Conf from "conf";
import { getProvider } from "../../libs/provider";
import * as repl from "repl";

const store = new Conf();

export default class ContractInteract extends Command {
  static aliases: string[] = ["contract"];
  static description =
    "exposes a `contract` instance in a REPL environment for making contract calls";

  static examples = [
    "<%= config.bin %> <%= command.id %> 0xF51CD0d607c82db2B7EB670554C82C276A9549B4 erc20ABI --mainnet",
    "> await contract.name()",
    "> await contract.getterFunction()",
    "<%= config.bin %> <%= command.id %> 0xF51CD0d607c82db2B7EB670554C82C276A9549B4 erc20ABI --private_key=0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e --mainnet",
    "> await contract.mint()",
    "> await contract.setterFunction({value: '10000000000000'})",
  ];

  static flags = {
    ...providerNetworkFlags,
    privateKey: Flags.string({
      description: "private key of transaction signer",
    }),
  };

  static args = {
    address: Args.string({ description: "contract address", required: true }),
    abi: Args.string({
      description: "abi name saved using `yeet abi-add`",
      required: true,
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(ContractInteract);

    if (!ethers.utils.isAddress(args.address)) {
      throw new Error("Invalid contract address");
    }

    if (!store.has(args.abi)) {
      throw new Error(`${chalk.bold.underline(args.abi)} does not exist!`);
    }

    const abi = store.get(args.abi) as ContractInterface;
    const provider = getProvider(flags);

    let contract;

    if (flags.privateKey) {
      const wallet = new ethers.Wallet(flags.privateKey).connect(provider);

      contract = new ethers.Contract(args.address, abi, wallet);
    } else {
      contract = new ethers.Contract(args.address, abi, provider);
    }

    repl.start().context.contract = contract;
  }
}
