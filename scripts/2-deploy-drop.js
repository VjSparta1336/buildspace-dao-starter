import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const app = sdk.getAppModule("0x5Bff5962D2FdA79221AD7B23D9dB922d63A18Dfa");

(async() => {
    try {
        const bundleDropModule = await app.deployBundleDropModule({
            name: "GenshinDAO Membership",
            description: "A DAO for Genshin Players",
            image: readFileSync("scripts/assets/gi.png"),
            primarySaleRecipientAddress: ethers.constants.AddressZero,
        });

        console.log(
            "✅ Successfully deployed bundleDrop module, address:",
            bundleDropModule.address, );
        console.log(
            "✅ bundleDrop metadata:",
            await bundleDropModule.getMetadata(),
        );
    } catch (error) {
        console.log("failed to deploy bundleDrop Module", error);
    }
})()

//bundleAddress: '0xc85A6661ff4C1b5aeF3d88386EbEBC0abF1307c4'