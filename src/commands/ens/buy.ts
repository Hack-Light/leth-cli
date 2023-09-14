/* eslint-disable max-params */
/* eslint-disable operator-linebreak */
/* eslint-disable comma-dangle */
/* eslint-disable no-promise-executor-return */
/* eslint-disable arrow-parens */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */
import { Args, Command, Flags, ux } from "@oclif/core";
import { ethers } from "ethers";
import { providerNetworkFlags } from "../../libs/flags/network-flags";
import { getProvider } from "../../libs/provider";
import { getControllerAddress } from "../../libs/ens-controller";
import { ENS } from "@ensdomains/ensjs";

const ENSInstance = new ENS();

export default class EnsBuy extends Command {
  static aliases: string[] = ["ens-buy"];
  static description = "helps you register a new ens";

  static examples = [
    "<%= config.bin %> <%= command.id %> 0xtumenD.eth 0x33C17B73D8F961Fd98a7f180a8d7a9B32aCB4ECE 1 --goerli --privateKey [PRIVATE-KEY]",
  ];

  static flags = {
    ...providerNetworkFlags,
    privateKey: Flags.string({
      description: "Private key to sign transaction",
      required: true,
    }),
  };

  static args = {
    name: Args.string({
      description: "ENS domain name to register",
      required: true,
    }),
    owner: Args.string({
      description: "Owner address of the ENS domain",
      required: true,
    }),
    duration: Args.integer({
      description: "Registration duration in seconds",
      default: 1,
    }),
  };

  private async register(
    controller: any,
    wallet: any,
    name: string,
    owner: string,
    duration: number
  ) {
    try {
      const random = ethers.utils.randomBytes(32);
      const salt = ethers.utils.hexlify(random);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { customData, ...commitPopTx } =
        await ENSInstance.commitName.populateTransaction(name, {
          duration,
          owner,
          addressOrIndex: owner,
          secret: salt,
          reverseRecord: true,
        });

      const commitTx = await wallet.sendTransaction(commitPopTx);
      await commitTx.wait();

      // wait for sometime
      console.log("timer started");

      await new Promise((resolve) => setTimeout(resolve, 60_000));

      console.log("timer completed");

      const et = ethers.utils.parseEther("0.003187500000003559");

      const { ...registerNameTx } =
        await ENSInstance.registerName.populateTransaction(name, {
          duration,
          owner,
          secret: salt,
          signer: wallet,
          addressOrIndex: owner,
          value: et,
          reverseRecord: true,
        });

      registerNameTx.gasLimit = ethers.BigNumber.from("0x01c9c380");
      registerNameTx.gasPrice = ethers.utils.parseEther("0.000000201500000008");

      const registerTx = await wallet.sendTransaction(registerNameTx);

      console.log("commit", registerTx);

      const t = await registerTx.wait();

      console.log(t);

      this.log(`Domain ${name} has been successfully registered.`);
      ux.action.stop("stoping a process");
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(EnsBuy);

    // ux.action.start("");

    const duration = 31_536_000 * args.duration;

    const provider = getProvider(flags);
    const controllerAddress = getControllerAddress(flags);
    const wallet = new ethers.Wallet(flags.privateKey).connect(provider);

    await ENSInstance.setProvider(provider);

    if (!controllerAddress) {
      throw new Error("Please use available networks ( --mainnet or --goerli)");
    }

    const controller = await ENSInstance.contracts!.getEthRegistrarController(
      wallet,
      controllerAddress
    )!;

    await this.register(controller, wallet, args.name, args.owner, duration);
  }
}
