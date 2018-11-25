import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Account} from '../../model/Account';
import {  ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account: Account;
  age: number;
  resumeSkills: string[];
  projects: any[];
  sub: Subscription;
  constructor(private accountService: AccountService, private route: ActivatedRoute) { };

  ngOnInit() {
     this.sub = this.route.params.subscribe(params => {
      let id = params['id'];
      this.accountService.findAccountById(id).subscribe(account =>{
        this.account = account;
        if (this.account) {
          console.log("We are here");
          this.resumeSkills = this.account.resumes.reduce((resultArr, currResume) => {
            resultArr.push(...currResume.resumeSkills.map(value => value.skillName));
            return resultArr;
          }, []);
          this.resumeSkills = removeDuplicateUsingFilter(this.resumeSkills);
          this.projects = this.account.resumes.reduce((resultArr, currResume) => {
            currResume.startupResumes.map(result => {
              if (result.status == "apply") {
                let temp = {
                  businessRoleName: currResume.businessRole.businessRoleName,
                  startupName: result.startupName
                };
                resultArr.push(temp);
                console.log(currResume);
              }
            });
            return resultArr;
          }, []);
          this.account.startups.forEach(
            res=>{this.projects.push({
              businessRoleName:'CREATOR',
              startupName:res.startupName
            })});
          this.age = moment().diff(this.account.birthday, 'years');
        }

      });

    });

  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}

function removeDuplicateUsingFilter(arr: any) {
  let unique_array = arr.filter(function(elem, index, self) {
    return index == self.indexOf(elem);
  });
  return unique_array
}
