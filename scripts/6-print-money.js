import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
    "0xa3c28f04dbEB5c8a9E9c90408b8C44838463140C",
);

(async () => {
    try {
        const amount = 1_000_000;
        const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
        await tokenModule.mint(amountWith18Decimals);
        const totalSupply = await tokenModule.totalSupply();
        console.log(
            "✅ There now is",
            ethers.utils.formatUnits(totalSupply, 18),
            "$MORA in circulation",
        );
    }catch(error){
        console.error("Failed to print money",error);
    }
})();