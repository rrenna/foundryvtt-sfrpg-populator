export async function apply(actor, context, ...applyables) {
    for (let applyable of applyables) {
        await applyable.apply(actor, context);
    }
    // TODO: Collect output
    return ["", ""];
}
//# sourceMappingURL=IApplyable.js.map