/* eslint-disable padding-line-between-statements */
/* eslint-disable unicorn/prefer-node-protocol */
/* eslint-disable unicorn/import-style */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
/* eslint-disable semi */
import { Args, Command } from "@oclif/core";
import Conf from "conf";
import chalk from "chalk";
import color from "picocolors";
import { transformArray } from "../../libs/list-converter";

import * as fs from "fs";
let clack;

const store = new Conf();

export default class AbiUpdate extends Command {
  static aliases: string[] = ["abi-update"];

  static description = "updates contract abi";

  static examples = ["<%= config.bin %> <%= command.id %> ./erc20ABI.json"];

  static args = {
    abiPath: Args.string({
      description: "path to abi",
      required: true,
    }),
  };

  public async run(): Promise<void> {
    clack = await import("@clack/prompts");

    const _store = store.store;
    const abis = Object.keys(_store);

    const array = transformArray(abis);

    console.log("\n");
    clack.intro(color.inverse(" Update a contract abi "));

    const name = await clack.select({
      message: "Pick an abi",
      options: array,
    });

    const { args } = await this.parse(AbiUpdate);

    if (!store.has(name)) {
      throw new Error(`${chalk.bold.underline(name)} does not exist!`);
    }
    const abi = fs.readFileSync(args.abiPath, { encoding: "utf8" });

    store.set(name, abi);
    clack.outro(`${chalk.bold.underline(name)} updated successfully ✅`);
  }
}
