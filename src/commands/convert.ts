/* eslint-disable max-params */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-promise-executor-return */
/* eslint-disable arrow-parens */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
import { Args, Command, Flags } from "@oclif/core";
import chalk from "chalk";
import { ethers } from "ethers";

export default class Convert extends Command {
  static description = "convert from eth to wei or vice versa";

  static examples = [
    "<%= config.bin %> <%= command.id %> 1000000000000000000",
    "<%= config.bin %> <%= command.id %> 1 --wei",
  ];

  static flags = {
    wei: Flags.boolean({
      description: "eth denomination",
    }),
  };

  static args = {
    unit: Args.string({ description: "number to convert", required: true }),
  };

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Convert);

    if (flags.wei) {
      console.log(
        chalk.green(ethers.utils.parseEther(args.unit).toString()),
        "wei"
      );
    } else {
      console.log(chalk.green(ethers.utils.formatEther(args.unit)), "ether");
    }
  }
}
