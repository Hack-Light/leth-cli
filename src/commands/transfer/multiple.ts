/* eslint-disable comma-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable object-curly-spacing */
/* eslint-disable semi */
/* eslint-disable quotes */
import { Args, Command } from "@oclif/core";
import { providerNetworkFlags } from "../../libs/flags/network-flags";
import { ethers } from "ethers";
import chalk from "chalk";
import color from "picocolors";

import { getProvider } from "../../libs/provider";
let clack;

export default class TransferMultiple extends Command {
  static aliases: string[] = ["transfer-multiple"];

  static description =
    "Handles multiple transfer of same amount of token to different addresses";

  static examples = [
    "<%= config.bin %> <%= command.id %> 0xYourAddress1,0xYourENS,0xYourAddress3 5 PRIVATE_KEY --mainet",
  ];

  static flags = {
    ...providerNetworkFlags,
  };

  static args = {
    to: Args.string({
      description: "address of receivers (comma seperated)",
      required: true,
    }),

    amount: Args.string({ description: "amount in eth", required: true }),

    privateKey: Args.string({
      description: "private key of transaction signer",
      required: true,
    }),
  };

  public async run(): Promise<void> {
    clack = await import("@clack/prompts");

    const { args, flags } = await this.parse(TransferMultiple);

    console.log("\n");
    clack.intro(color.inverse(" Transfer token to multiple addresses "));

    const s = clack.spinner();
    s.start("Transfering tokens");

    if (!args.to)
      throw new Error("Please provide the addresses to be transfered to");

    if (!args.amount) throw new Error("Please provide an amount to transfer");

    const addresses = args.to.split(",");

    if (addresses.length <= 0) {
      throw new Error("Please provide atleast an address");
    }

    const provider = getProvider(flags);
    const wallet = new ethers.Wallet(args.privateKey).connect(provider);

    for (const [, adrs] of addresses.entries()) {
      if (!ethers.utils.isAddress(adrs)) {
        throw new Error(`Invalid receiver address: ${adrs}`);
      }

      try {
        await wallet.sendTransaction({
          to: adrs,
          value: ethers.utils.parseEther(args.amount.toString()),
        });

        clack.log.success(
          `Successfully transferred ${chalk.green(
            args.amount
          )} ETH to ${chalk.underline(adrs)}✅`
        );
      } catch (error) {
        clack.log.error(error?.message);
        return;
      }
    }

    s.stop();
    clack.outro(color.bgGreen(" done! "));
  }
}
