/* eslint-disable object-curly-spacing */
/* eslint-disable quotes */
/* eslint-disable semi */
import { BigNumberish, ethers } from "ethers";
import chalk from "chalk";

interface UnitFlags {
  wei: boolean;
  kwei: boolean;
  mwei: boolean;
  gwei: boolean;
  szabo: boolean;
  finney: boolean;
  ether: boolean;
}
export const formatUnits = (amount: BigNumberish, flags: UnitFlags): string => {
  if (flags.wei) {
    return ethers.utils.formatUnits(amount, "wei") + chalk.white(" wei");
  }

  if (flags.kwei) {
    return ethers.utils.formatUnits(amount, "kwei") + chalk.white(" kwei");
  }

  if (flags.mwei) {
    return ethers.utils.formatUnits(amount, "mwei") + chalk.white(" mwei");
  }

  if (flags.gwei) {
    return ethers.utils.formatUnits(amount, "gwei") + chalk.white(" gwei");
  }

  if (flags.szabo) {
    return ethers.utils.formatUnits(amount, "szabo") + chalk.white(" szabo");
  }

  if (flags.finney) {
    return ethers.utils.formatUnits(amount, "finney") + chalk.white(" finney");
  }

  return ethers.utils.formatUnits(amount, "ether") + chalk.white(" ether");
};
