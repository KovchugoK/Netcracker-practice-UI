import {Skill} from './Skill';

export class ResumeSkill {
  id: string;
  skill: Skill;

  constructor(id: string, skill: Skill){
    this.skill = skill;
    this.id = id;
  }
}
