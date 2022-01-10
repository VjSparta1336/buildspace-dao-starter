import sdk from "./1-initialize-sdk.js";

const bundleDrop = sdk.getBundleDropModule(
    "0xc85A6661ff4C1b5aeF3d88386EbEBC0abF1307c4",
);

(async() => {
    try {
        const claimConditionFactory = bundleDrop.getClaimConditionFactory();
        claimConditionFactory.newClaimPhase({
            startTime: new Date(),
            maxQuantity: 50_000,
            maxQuantityPerTransaction: 1,
        });
        await bundleDrop.setClaimCondition(0, claimConditionFactory);
        console.log("✅ Successfully set claim condition on bundle drop:", bundleDrop.address);
    } catch (error) {
        console.error("Failed to set claim Condition", error);
    }
})()