import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
    "0xc85A6661ff4C1b5aeF3d88386EbEBC0abF1307c4",
);
(async() => {
    try {
        await bundleDrop.createBatch([{
            name: "Genshin Impact",
            description: "This NFT will give you accrss to GenshinDAO",
            image: readFileSync("scripts/assets/gi.png"),
        }, ]);
        console.log("✅ Successfully created a new NFT in the drop!");
    } catch (error) {
        console.log("failed to create the new NFT", error);
    }
})()