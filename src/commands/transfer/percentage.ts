/* eslint-disable comma-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable object-curly-spacing */
/* eslint-disable semi */
/* eslint-disable quotes */
import { Args, Command } from "@oclif/core";
import { providerNetworkFlags } from "../../libs/flags/network-flags";
import { ethers } from "ethers";
import { getProvider } from "../../libs/provider";
import chalk from "chalk";
import color from "picocolors";
let clack;

export default class TransferPercentage extends Command {
  static aliases: string[] = ["transfer-percentage"];
  static description =
    "handles transfer of percentage of an amount to a list of addresses";

  static examples = [
    "<%= config.bin %> <%= command.id %> 0xYourAddress1,0xYourENS,0xYourAddress3 30,30,40 5 PRIVATE_KEY --mainet",
  ];

  static flags = {
    ...providerNetworkFlags,
  };

  static args = {
    to: Args.string({
      description: "address of receivers (comma seperated)",
      required: true,
    }),

    percentage: Args.string({
      description:
        "Percentage to transfer to each user. (Must match the number of addresses; comma seperated)",
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
    console.log("\n");
    clack.intro(color.inverse(" Transfer tokens "));

    const s = clack.spinner();
    s.start("Transfering tokens ");
    try {
      const { args, flags } = await this.parse(TransferPercentage);

      if (!args.to)
        throw new Error("Please provide the addresses to be transfered to");

      if (!args.amount) throw new Error("Please provide an amount to transfer");

      const addresses = args.to.split(",");

      if (addresses.length <= 0) {
        throw new Error("Please provide atleast an address");
      }

      const percentageArr = args.percentage.split(",");

      if (percentageArr.length !== addresses.length) {
        throw new Error(
          "Please ensure the number of elements in addresses matches that in percentage"
        );
      }

      const provider = getProvider(flags);
      const wallet = new ethers.Wallet(args.privateKey).connect(provider);

      for (const [i, adrs] of addresses.entries()) {
        const pct = percentageArr[i];

        if (!ethers.utils.isAddress(adrs)) {
          throw new Error(`Invalid receiver address: ${adrs}`);
        }

        const fAmount = (Number.parseFloat(pct) / 100) * Number(args.amount);

        await wallet.sendTransaction({
          to: adrs,
          value: ethers.utils.parseEther(fAmount.toString()),
        });

        clack.log.success(
          `Successfully transferred ${chalk.green(
            fAmount
          )} ETH to ${chalk.underline(adrs)} ✅`
        );
      }

      s.stop();
      clack.outro(color.bgGreen(" done! "));
    } catch (error) {
      clack.log.error(error?.message);
      clack.outro(color.bgRed(" error! "));
      s.stop();
    }
  }
}
