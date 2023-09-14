/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
import { Args, Command } from "@oclif/core";
import { providerNetworkFlags } from "../../libs/flags/network-flags";
import { ethUnitFlags } from "../../libs/flags/ether-unit-flags";
import { BigNumberish } from "ethers";
import { getProvider } from "../../libs/provider";
import { formatUnits } from "../../libs/unit-converter";
import chalk from "chalk";

export default class AddressBalance extends Command {
  static aliases: string[] = ["address-balance"];

  static description = "gets the eth balance of an address";

  static examples = [
    "<%= config.bin %> <%= command.id %> 0xF51CD0d607c82db2B70B678554c52C266a9D49B6 --mainnet",
    "<%= config.bin %> <%= command.id %> valentineorga.eth --rpc_url=[PROVIDER_URL]",
    "<%= config.bin %> <%= command.id %> 0xF51CD0d607c82db2B70B678554c52C266a9D49B6 --mainnet --wei",
  ];

  static flags = {
    ...providerNetworkFlags,
    ...ethUnitFlags,
  };

  static args = {
    addressOrEns: Args.string({
      description: "account address or ens name",
      required: true,
    }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(AddressBalance);

    const provider = getProvider(flags);

    const balance: BigNumberish = await provider.getBalance(args.addressOrEns);
    console.log(chalk.green(formatUnits(balance, flags)));
  }
}
