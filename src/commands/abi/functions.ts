/* eslint-disable no-process-exit */
/* eslint-disable unicorn/no-process-exit */
/* eslint-disable indent */
/* eslint-disable unicorn/no-array-for-each */
/* eslint-disable arrow-parens */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
import { Command } from "@oclif/core";
import chalk from "chalk";
import { MethodInput } from "../../interfaces/abi-functions";
import Conf from "conf";
import color from "picocolors";
import { transformArray } from "../../libs/list-converter";

let clack;

const store = new Conf();

export default class AbiFunctions extends Command {
  static aliases: string[] = ["abi-functions"];

  static description = "lists all functions of abi";

  static examples = ["<%= config.bin %> <%= command.id %>"];

  public async run(): Promise<void> {
    clack = await import("@clack/prompts");

    const _store = store.store;
    const abis = Object.keys(_store);

    const array = transformArray(abis);

    console.log("\n");
    clack.intro(color.inverse(" List of all available contract abi "));

    const name = await clack.select({
      message: "Pick an abi",
      options: array,
    });

    console.log(color.bold(` ABI: ${name} `));

    if (clack.isCancel(name)) {
      clack.cancel("Operation cancelled");
      return process.exit(0);
    }

    const s = clack.spinner();
    s.start("Getting abis");

    if (!store.has(name)) {
      throw new Error(`${chalk.bold.underline(name)} does not exist!`);
    }

    const abi: any[] = JSON.parse(store.get(name) as string);
    const methods = abi.filter((el) => el.type === "function");
    methods.forEach((method) => {
      if (method.inputs) {
        const inputParams = method.inputs
          .map((input: MethodInput) => `${input.type} ${input.name}`)
          .join(", ");
        console.log(`- ${method.name}(${inputParams})`);
      } else {
        console.log(`- ${method.name}()`);
      }
    });

    s.stop();

    clack.outro(color.bgGreen(" done! "));
  }
}
