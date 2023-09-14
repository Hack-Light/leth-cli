/* eslint-disable unicorn/filename-case */
/* eslint-disable arrow-parens */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-spacing */
/* eslint-disable semi */
/* eslint-disable quotes */
import { Command, Flags } from "@oclif/core";
import { ethers } from "ethers";
import { writeFile } from "node:fs";
import chalk from "chalk";
import { NewAccount } from "../../interfaces/new-address";

export default class GenerateAddress extends Command {
  static aliases: string[] = ["address-generate"];
  static description = "generates a new address";

  static examples = [
    "<%= config.bin %> <%= command.id %>",
    "<%= config.bin %><%= command.id %> --export",
  ];

  static flags = {
    export: Flags.boolean({
      description:
        "exports address details to a new file `0xnewAddress.json` in the current directory",
      aliases: ["e"],
    }),
  };

  public async run(): Promise<void> {
    const { flags } = await this.parse(GenerateAddress);

    const wallet = ethers.Wallet.createRandom();

    if (flags.export) {
      const newAddress: NewAccount = {
        address: wallet.address,
        privateKey: wallet.privateKey,
      };

      if (wallet.mnemonic) {
        newAddress.mnemonic = wallet.mnemonic.phrase;
      }

      writeFile(`${wallet.address}.json`, JSON.stringify(newAddress), (err) => {
        if (err) {
          throw new Error(JSON.stringify(err));
        } else {
          console.log("Address created successfully ✅");
          console.log(
            `Details saved to ${chalk.green.underline.bold(
              `${wallet.address}.json`
            )}`
          );
          console.log(
            chalk.yellow.bold(
              "DO NOT REVEAL YOUR MNEMONIC AND PRIVATE KEY TO ANYONE!!!"
            )
          );
        }
      });
    } else {
      if (wallet.mnemonic) {
        console.log(
          `MNEMONIC(${chalk.yellow.underline.bold(
            "KEEP THIS A SECRET!!!"
          )}):\n`,
          wallet.mnemonic
        );
      }

      console.log(
        `\nPRIVATE KEY(${chalk.yellow.underline.bold(
          "PLEASE KEEP THIS A SECRET!!!"
        )}):\n`,
        wallet.privateKey?.toString()
      );

      console.log("\nADDRESS:\n", wallet.address);
    }
  }
}
