/* eslint-disable comma-dangle */
/* eslint-disable unicorn/no-process-exit */
/* eslint-disable no-process-exit */
/* eslint-disable no-return-await */
/* eslint-disable object-curly-spacing */
/* eslint-disable unicorn/prefer-node-protocol */
/* eslint-disable quotes */
/* eslint-disable unicorn/import-style */
/* eslint-disable semi */
import { Args, Command } from "@oclif/core";
import Conf from "conf";
import chalk from "chalk";
import * as fs from "fs";
import color from "picocolors";

let clack;

const store = new Conf();

export default class AbiAdd extends Command {
  static aliases: string[] = ["abi-add"];

  static description = "stores contract abi";

  static examples = ["<%= config.bin %> <%= command.id %> ./erc20ABI.json"];

  static args = {
    abiPath: Args.string({
      description: "path to abi",
      required: true,
    }),
  };

  public async run(): Promise<void> {
    clack = await import("@clack/prompts");

    const { args } = await this.parse(AbiAdd);
    console.log("\n");
    clack.intro(color.inverse(" add contract abi "));

    const abi = fs.readFileSync(args.abiPath, { encoding: "utf8" });

    const name = await clack.text({
      message: "type abi name",
      placeholder: "test-abi",
    });

    if (clack.isCancel(name)) {
      clack.cancel("Operation cancelled");
      return process.exit(0);
    }

    store.set(name, abi);

    clack.outro(
      color.inverse(`${chalk.bold.underline(name)} stored successfully ✅`)
    );
  }
}
