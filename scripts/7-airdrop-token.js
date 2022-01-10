import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";


const bundleDropModule = sdk.getBundleDropModule(
    "0xc85A6661ff4C1b5aeF3d88386EbEBC0abF1307c4",
);

const tokenModule = sdk.getTokenModule(
    "0xa3c28f04dbEB5c8a9E9c90408b8C44838463140C",
);

(async() => {
    try {
        const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");

        if (walletAddresses.length === 0) {
            console.log(
                "No NFTs have been claimed yet,  maybe get some friends to claim your free NFTs!",
            );
            process.exit(0);
        }
        const airdropTargets = walletAddresses.map((address) => {
            const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
            console.log("✅ Going to airdrop", randomAmount, "tokens to", address);
            const airdropTarget = {
                address,
                // Remember, we need 18 decimal placees!
                amount: ethers.utils.parseUnits(randomAmount.toString(), 18),
            };
            return airdropTarget;
        });
        console.log("🌈 Starting airdrop...")
        await tokenModule.transferBatch(airdropTargets);
        console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");

    } catch (err) {
        console.error("failed to airdrop tokens", err);
    }
})();