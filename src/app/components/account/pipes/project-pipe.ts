import { Pipe, PipeTransform } from '@angular/core';
import {Account} from "../../../model/Account";

@Pipe({
  name: 'projects'
})
export class ProjectPipe implements PipeTransform {
  transform(account: Account, args?: any): any[]{
    // let projects = null;
    // if(account) {
    //   projects = account.resumes.reduce((resultArr, currResume) => {
    //     currResume.startupResumes.map(result => {
    //       if (result.accepted === true) {
    //         let temp = {
    //           businessRoleName: currResume.businessRole.businessRoleName,
    //           startupName: result.startupName
    //         };
    //         resultArr.push(temp);
    //         console.log(currResume);
    //       }
    //     });
    //     return resultArr;
    //   }, []);
    //   account.startups.forEach(
    //     res=>{projects.push({
    //       businessRoleName:'CREATOR',
    //       startupName:res.startupName
    //     })});
    //
    // }
    return null;
  }
}
