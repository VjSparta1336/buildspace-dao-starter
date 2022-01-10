import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const voteModule = sdk.getVoteModule(
    "0x3F868D0231b641ACaEA07404F6453fA811A4E2C7"
);
const tokenModule = sdk.getTokenModule(
    "0xa3c28f04dbEB5c8a9E9c90408b8C44838463140C",
);

(async() => {
    try {
        await tokenModule.grantRole("minter", voteModule.address);
        console.log(
            "Successfully gave vote module permissions to act on token module"
        );
    } catch (error) {
        console.error(
            "failed to grant vote module permissions on token module",
            error
        );
        process.exit(1);
    }

    try {
        const ownedTokenBalance = await tokenModule.balanceOf(process.env.WALLET_ADDRESS);
        const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
        const percent90 = ownedAmount.div(100).mul(90);
        await tokenModule.transfer(voteModule.address, percent90);
        console.log("✅ Successfully transferred tokens to vote module");

    } catch (err) {
        console.error("failed to transfer tokens to vote module", err);
    }
})();