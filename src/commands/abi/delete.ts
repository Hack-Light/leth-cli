/* eslint-disable unicorn/no-process-exit */
/* eslint-disable no-process-exit */
/* eslint-disable padding-line-between-statements */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
import { Command } from "@oclif/core";
import chalk from "chalk";
import Conf from "conf";
import color from "picocolors";
import { transformArray } from "../../libs/list-converter";
let clack;

const store = new Conf();

export default class AbiDelete extends Command {
  static aliases: string[] = ["abi-delete"];

  static description = "deletes contract abi";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  static args = {};

  public async run(): Promise<void> {
    clack = await import("@clack/prompts");

    const _store = store.store;
    const abis = Object.keys(_store);

    const array = transformArray(abis);

    console.log("\n");
    clack.intro(color.inverse(" Delete an abi "));

    const name = await clack.select({
      message: "Pick an abi",
      options: array,
    });

    if (clack.isCancel(name)) {
      clack.cancel("Operation cancelled");
      return process.exit(0);
    }

    if (!store.has(name)) {
      throw new Error(`${chalk.bold.underline(name)} does not exist!`);
    }
    store.delete(name);
    clack.outro(`${chalk.bold.underline(name)} deleted successfully ✅`);
  }
}
