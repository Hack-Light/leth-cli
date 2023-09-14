/* eslint-disable unicorn/prefer-node-protocol */
/* eslint-disable comma-dangle */
/* eslint-disable no-await-in-loop */
/* eslint-disable object-curly-spacing */
/* eslint-disable semi */
/* eslint-disable arrow-parens */
/* eslint-disable indent */
/* eslint-disable quotes */
import { Args, Command } from "@oclif/core";
import { providerNetworkFlags } from "../../libs/flags/network-flags";
import { ethers } from "ethers";
import chalk from "chalk";
import * as fs from "fs";
import color from "picocolors";

import csvParser from "csv-parser";
import { getProvider } from "../../libs/provider";

let clack;

export default class TransferFile extends Command {
  static aliases: string[] = ["transfer-file"];

  static description = "Handle transfer of tokens from a file";

  static examples = [
    "<%= config.bin %> <%= command.id %> ./test.csv PRIVATE_KEY",
  ];

  static flags = {
    ...providerNetworkFlags,
  };

  static args = {
    file: Args.string({ description: "file to read", required: true }),
    privateKey: Args.string({
      description: "private key of transaction signer",
      required: true,
    }),
  };

  public async run(): Promise<void> {
    clack = await import("@clack/prompts");

    const { args, flags } = await this.parse(TransferFile);
    const csvFilePath = String(args.file);

    console.log("\n");
    clack.intro(color.inverse(" Transfer tokens "));

    const provider = getProvider(flags);
    const wallet = new ethers.Wallet(args.privateKey).connect(provider);

    const s = clack.spinner();
    s.start("Transfering tokens from file");

    const csvData: any[] = [];
    fs.createReadStream(csvFilePath)
      .pipe(csvParser(["address", "amount"]))
      .on("data", (row) => {
        csvData.push(row);
      })
      .on("end", async () => {
        for (const entry of csvData) {
          const address = entry.address;
          const amount = entry.amount;

          if (!ethers.utils.isAddress(address)) {
            throw new Error(`Invalid receiver address: ${address}`);
          }

          try {
            await wallet.sendTransaction({
              to: address,
              value: ethers.utils.parseEther(amount.toString()),
            });

            clack.log.success(
              `Successfully transferred ${chalk.green(
                amount
              )} ETH to ${chalk.underline(address)} ✅`
            );
          } catch (error) {
            clack.log.error(error?.message);
            return;
          }
        }

        s.stop();
        clack.outro(color.bgGreen(" done! "));
      });
  }
}
