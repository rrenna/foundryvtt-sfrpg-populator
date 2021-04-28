export async function apply(actor, context, ...applyables) {
    let output = [];
    for (let applyable of applyables) {
        let applyableOutput = await applyable.apply(actor, context);
        output.push(...applyableOutput);
    }
    // Return all output
    return output;
}
//# sourceMappingURL=IApplyable.js.map