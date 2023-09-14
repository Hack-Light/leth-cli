/* eslint-disable comma-dangle */
/* eslint-disable object-curly-spacing */
/* eslint-disable semi */
/* eslint-disable quotes */
import { Args, Command } from "@oclif/core";
import chalk from "chalk";
import { ethers } from "ethers";
import color from "picocolors";

import { providerNetworkFlags } from "../../libs/flags/network-flags";
import { getProvider } from "../../libs/provider";

let clack;

export default class TransferSingle extends Command {
  static aliases: string[] = ["transfer-single"];

  static description = "handles transfer of token to a single address";

  static examples = [
    "<%= config.bin %> <%= command.id %> 0xYourAddress1 5 <PRIVATE_KEY> --mainnet",
  ];

  static flags = {
    ...providerNetworkFlags,
  };

  static args = {
    to: Args.string({
      description: "address of receiver",
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

    const { flags, args } = await this.parse(TransferSingle);

    console.log("\n");
    clack.intro(color.inverse(" Transfer tokens "));

    const s = clack.spinner();
    s.start("Transfering token");

    try {
      if (!ethers.utils.isAddress(args.to)) throw new Error("Invalid Address");

      if (Number.isNaN(Number(args.amount)) || Number(args.amount) <= 0)
        throw new Error("Please provide a valid amount in ether");

      const provider = getProvider(flags);
      const wallet = new ethers.Wallet(args.privateKey).connect(provider);

      await wallet.sendTransaction({
        to: args.to,
        value: ethers.utils.parseEther(args.amount.toString()),
      });

      clack.log.success(
        `Successfully transferred ${chalk.green(
          args.amount
        )} ETH to ${chalk.underline(args.to)}✅`
      );

      s.stop();
      clack.outro(color.bgGreen(" done! "));
    } catch (error) {
      clack.log.error(error?.message);
      clack.outro(color.bgRed(" error! "));
      s.stop();
    }
  }
}
