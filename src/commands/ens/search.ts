/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable object-curly-spacing */
import { Args, Command } from "@oclif/core";
import { providerNetworkFlags } from "../../libs/flags/network-flags";
import { getProvider } from "../../libs/provider";
import chalk from "chalk";

export default class EnsSearch extends Command {
  static aliases: string[] = ["ens-search"];
  static description = "search if an ens name is still available";

  static examples = [
    "<%= config.bin %> <%= command.id %> --mainnet myensdomain.eth",
  ];

  static flags = {
    ...providerNetworkFlags,
  };

  static args = {
    name: Args.string({
      description: "the ens you are searching",
      aliases: ["d"],
    }),
  };

  public async run(): Promise<void> {
    const { flags, args } = await this.parse(EnsSearch);

    const provider = getProvider(flags);

    if (args.name) {
      const address = await provider.resolveName(args.name);
      if (address === null) {
        this.log(
          `\nName: ${chalk.green.underline.bold(
            `${args.name}`
          )} is available\n`
        );
      } else {
        this.log(
          `\nName: ${chalk.green.underline.bold(
            `${args.name}`
          )} is not available\n`
        );
      }
    } else {
      this.error(chalk.red("Please provide either a domain or an address."));
    }
  }
}
