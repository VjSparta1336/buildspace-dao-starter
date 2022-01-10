import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule("0x5Bff5962D2FdA79221AD7B23D9dB922d63A18Dfa");

(async() => {
    try {
        const tokenModule = await app.deployTokenModule({
            name: "GenshinDAO Governance Token",
            symbol: "MORA",
        });
        console.log(
            "✅ Successfully deployed token module, address:",
            tokenModule.address,
        );
    } catch (error) {
        console.error("failed to deploy token module", error);
    }
})();

//token module, address: 0xa3c28f04dbEB5c8a9E9c90408b8C44838463140C