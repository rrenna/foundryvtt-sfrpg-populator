import Adjuster from "./Adjuster.js";
import { MonsterSkillType } from "../../data/MonsterCreation.js";
export default class SkillAdjuster extends Adjuster {
    // Set number of good / master skills
    constructor(skillAdjuster = {}) {
        super();
        Object.assign(this, skillAdjuster);
    }
    async apply(actor, context) {
        // Set number of good / master skills
        if (this.setMonsterSkillCount) {
            if (this.setMonsterSkillCount[0] == MonsterSkillType.good) {
                // set good skill count
                context.mainArrayRow.goodSkill.count = this.setMonsterSkillCount[1];
            }
            else {
                // set master skill count
                context.mainArrayRow.masterSkill.count = this.setMonsterSkillCount[1];
            }
        }
        // Set a specific skill as a good/master skill
        if (this.setSkillAsMonsterSkill) {
            let skill = this.setSkillAsMonsterSkill[0];
            if (this.setSkillAsMonsterSkill[1] == MonsterSkillType.master) {
                if (Array.isArray(skill)) {
                    context.masterSkills.push(...skill);
                }
                else {
                    context.masterSkills.push(skill);
                }
            }
            else {
                if (Array.isArray(skill)) {
                    context.goodSkills.push(...skill);
                }
                else {
                    context.goodSkills.push(skill);
                }
            }
        }
        // Adjust the skill value applied to good/master skills
        if (this.mutateMonsterSkill) {
            if (this.mutateMonsterSkill[0] == MonsterSkillType.good) {
                // adjust good skill count
                context.mainArrayRow.goodSkill.count += this.mutateMonsterSkill[1];
            }
            else {
                // set master skill count
                context.mainArrayRow.masterSkill.count += this.mutateMonsterSkill[1];
            }
        }
        // TODO: MutateSkillValue logic
        // TODO: Construct log from individual adjustors
        return ["", ""];
    }
}
//# sourceMappingURL=SkillAdjuster.js.map