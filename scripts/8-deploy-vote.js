import sdk from "./1-initialize-sdk.js";

const appModule = sdk.getAppModule("0x5Bff5962D2FdA79221AD7B23D9dB922d63A18Dfa");

(async() => {
    try {
        const voteModule = await appModule.deployVoteModule({
            name: "GenshinDAO's 5Star Proposals",
            votingTokenAddress: "0xa3c28f04dbEB5c8a9E9c90408b8C44838463140C",
            proposalStartWaitTimeInSeconds: 0,
            proposalVotingTimeInSeconds: 24 * 60 * 60,
            votingQuorumFraction: 0,
            minimumNumberOfTokensNeededToPropose: "0",
        });
        console.log(
            "✅ Successfully deployed vote module, address:",
            voteModule.address,
        );
    } catch (err) {
        console.error("Failed to deploy vote module", err);
    }
})();

// vote module, address: 0x3F868D0231b641ACaEA07404F6453fA811A4E2C7