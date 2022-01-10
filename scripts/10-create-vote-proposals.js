import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule(
    "0x3F868D0231b641ACaEA07404F6453fA811A4E2C7",
);

const tokenModule = sdk.getTokenModule(
    "0xa3c28f04dbEB5c8a9E9c90408b8C44838463140C"
);

(async () => {
    try {
        const amount = 420_000;
        await voteModule.propose(
            "Should the DAO mint an additional " + amount + " tokens into the treasuary?",
            [
                {
                    nativeTokenValue: 0,
                    transactionData: tokenModule.contract.interface.encodeFunctionData(
                        "mint",
                        [
                            voteModule.address,
                            ethers.utils.parseUnits(amount.toString(), 18),
                        ]
                    ),
                    toAddress: tokenModule.address,
                },
            ]
        );
        console.log("✅ Successfully created proposal to mint tokens");
    } catch (error) {
        console.error("failed to create first proposal", error);
        process.exit(1);
    }

    try {
        const amount = 6_900;
        await voteModule.propose(
            "Should the DAO transfer " +
            amount + " tokens from the treasury to " +
            process.env.WALLET_ADDRESS + " for being awesome?",
            [
                {
                    nativeTokenValue: 0,
                    transactionData: tokenModule.contract.interface.encodeFunctionData(
                        "transfer",
                        [
                            process.env.WALLET_ADDRESS,
                            ethers.utils.parseUnits(amount.toString(), 18),
                        ]
                    ),
                    toAddress: tokenModule.address,
                },
            ]
        );
        console.log(
            "✅ Successfully created proposal to reward ourselves from the treasury, let's hope people vote for it!"
        );
    } catch (error) {
        console.error("failed to create second proposal", error);
    }
})();