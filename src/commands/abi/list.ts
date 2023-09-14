/* eslint-disable object-curly-spacing */
/* eslint-disable unicorn/import-style */
/* eslint-disable arrow-parens */
/* eslint-disable padding-line-between-statements */
/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable semi */
/* eslint-disable quotes */
import { Command } from "@oclif/core";
import Conf from "conf";
import chalk from "chalk";
import color from "picocolors";

let clack;

const store = new Conf();

export default class AbiList extends Command {
  static aliases: string[] = ["abi-list"];

  static description = "lists all stored abi names";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  public async run(): Promise<void> {
    clack = await import("@clack/prompts");
    // console.log(clack);
    const s = clack.spinner();
    s.start("Getting abis");

    console.log("\n");
    clack.intro(color.inverse(" List of all available contract abi "));
    const _store = store.store;
    const abis = Object.keys(_store);
    // console.log(abis);

    if (abis.length === 0) {
      clack.log.message("No available ABIs");
      return;
    }
    clack.log.message(`Total: ${chalk.bold.underline(store.size)}\n`);

    abis.forEach((abi) => {
      clack.log.message(`- ${abi}`);
    });
    s.stop();

    clack.outro(color.bgGreen(" done! "));
  }
}
