import { Pipe, PipeTransform } from '@angular/core';
import {Resume} from "../../../model/Resume";

@Pipe({
  name: 'skills'
})
export class SkillPipe implements PipeTransform {
  transform(resumes: Resume[], args?: any): string[]{
    let resumeSkills = null;
    if(resumes) {
      resumeSkills = resumes.reduce((resultArr, currResume) => {
        resultArr.push(...currResume.resumeSkills.map(value => value.skillName));
        return resultArr;
      }, []);
      resumeSkills = SkillPipe.removeDuplicateUsingFilter(resumeSkills);
    }
    return resumeSkills;
  }

  static removeDuplicateUsingFilter(arr: any) {
    let unique_array = arr.filter(function(elem, index, self) {
      return index == self.indexOf(elem);
    });
    return unique_array
  }
}
