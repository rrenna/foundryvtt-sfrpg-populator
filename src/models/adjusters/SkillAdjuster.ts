import { ApplyOutput } from "../Interfaces/IApplyable.js"
import NPCCreationContext from "../NPCCreationContext.js"
import Adjuster from "./Adjuster.js"
import { MonsterSkillType } from "../../data/MonsterCreation.js"
import { Skill } from "../../data/Skills.js"

// Set total amount of good/master skills (usually used when setting to zero)
type SetMonsterSkillCount = [skillType: MonsterSkillType, amount: number]
// Adjust total amount of good/master skills by +- amount
type MutateMonsterSkill = [skillType: MonsterSkillType, mutation: number]
// Adjust value of specific skill (ie. +1 to survival)
type MutateSkillValue = [skill: Skill, mutation: number]
// Set specific skill as good/master skill
type SetSkillAsMonsterSkill = [skill: Skill | Skill[], type: MonsterSkillType]

export default class SkillAdjuster extends Adjuster {
    setMonsterSkillCount: SetMonsterSkillCount | undefined
    mutateMonsterSkill: MutateMonsterSkill | undefined
    mutateSkillValue: MutateSkillValue | undefined
    setSkillAsMonsterSkill: SetSkillAsMonsterSkill | undefined

    // Set number of good / master skills
    constructor(skillAdjuster: Partial<SkillAdjuster> = {}) {
        super()
        Object.assign(this, skillAdjuster)
    }

    async apply(actor, context: NPCCreationContext): Promise<ApplyOutput> {
        // Set number of good / master skills
        if (this.setMonsterSkillCount) {
            if (this.setMonsterSkillCount[0] == MonsterSkillType.good) {
                // set good skill count
                context.mainArrayRow.goodSkill.count = this.setMonsterSkillCount[1]
            } else {
                // set master skill count
                context.mainArrayRow.masterSkill.count = this.setMonsterSkillCount[1]
            }
        }
        // Set a specific skill as a good/master skill
        if (this.setSkillAsMonsterSkill) {
            let skill = this.setSkillAsMonsterSkill[0]

            if (this.setSkillAsMonsterSkill[1] == MonsterSkillType.master) {
                if (Array.isArray(skill)) {
                    context.masterSkills.push(...skill)
                } else {
                    context.masterSkills.push(skill)
                }
            } else {
                if (Array.isArray(skill)) {
                    context.goodSkills.push(...skill)
                } else {
                    context.goodSkills.push(skill)
                }
            }
        }
        // Adjust the skill value applied to good/master skills
        if (this.mutateMonsterSkill) {
            if (this.mutateMonsterSkill[0] == MonsterSkillType.good) {
                // adjust good skill count
                context.mainArrayRow.goodSkill.count += this.mutateMonsterSkill[1]
            } else {
                // set master skill count
                context.mainArrayRow.masterSkill.count += this.mutateMonsterSkill[1]
            }
        }

        // TODO: MutateSkillValue logic

        // TODO: Construct log from individual adjustors
        return ["", ""]
    }
}
