/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
import { Command, Flags } from "@oclif/core";
import { providerNetworkFlags } from "../../libs/flags/network-flags";
import { getProvider } from "../../libs/provider";
import chalk from "chalk";

import { ENS } from "@ensdomains/ensjs";
import { ethers } from "ethers";

const ENSInstance = new ENS();

export default class EnsLookup extends Command {
  static aliases: string[] = ["ens-lookup"];
  static description = "resolves an ens to ethereum address and vice versa";

  static examples = [
    "<%= config.bin %> <%= command.id %> --mainnet --domain 0xlight",
    "<%= config.bin %> <%= command.id %> --mainnet --address 0x00..00",
  ];

  static flags = {
    domain: Flags.string({
      description: "Your ENS domain to be resolved",
      aliases: ["d"],
    }),
    address: Flags.string({
      description: "Your address to be resolved",
      aliases: ["a"],
    }),
    ...providerNetworkFlags,
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(EnsLookup);

    const provider = getProvider(flags);
    await ENSInstance.setProvider(provider);

    if (flags.domain) {
      const nameWrapper = await ENSInstance.contracts!.getNameWrapper()!;
      const owner = await nameWrapper.ownerOf(
        ethers.utils.namehash(flags.domain)
      );

      this.log(
        `Address for domain ${flags.domain}: ${chalk.green.underline.bold(
          `${owner}`
        )}`
      );
    } else if (flags.address) {
      // const ensDomain = await provider.lookupAddress(flags.address);
      const detail = await ENSInstance.getName(flags.address);

      this.log(
        `ENS domain for address ${flags.address}: ${chalk.green.underline.bold(
          `${detail.name || "Not found"}`
        )}`
      );
    } else {
      this.error(chalk.red("Please provide either a domain or an address."));
    }
  }
}
