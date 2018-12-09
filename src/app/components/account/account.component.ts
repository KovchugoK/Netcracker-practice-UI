import { Component, OnInit } from '@angular/core';
import {AccountService} from '../../services/account.service';
import {Account} from '../../model/Account';
import {  ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import {Subscription} from "rxjs/internal/Subscription";
import {NgRedux} from "@angular-redux/store";
import {AppState} from "../../store";
import {FormBuilder} from "@angular/forms";


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  id: string ;
  account: Account;
  age: number;
  resumeSkills: string[];
  projects: any[];
  sub: Subscription;

    constructor(private ngRedux: NgRedux<AppState>,
                private accountService: AccountService,
                private route: ActivatedRoute) { };

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');

    this.accountService.findAccountById(this.id).subscribe(account =>{
        this.account = account;
        if (this.account) {
          console.log("We are here");
          this.resumeSkills = this.account.resumes.reduce((resultArr, currResume) => {
            resultArr.push(...currResume.resumeSkills.map(value => value.skill.skillName));
            return resultArr;
          }, []);
          this.resumeSkills = AccountComponent.removeDuplicateUsingFilter(this.resumeSkills);
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
          if(this.account.compressedImageId) {
            this.account.compressedImageId = 'https://drive.google.com/thumbnail?id=' + this.account.compressedImageId;
          }
          else this.account.compressedImageId="/src/assets/images/default-image.png";

        }
      });
  }

   ngOnDestroy() {
    if(this.sub) {
      this.sub.unsubscribe();
    }
  }
  static removeDuplicateUsingFilter(arr: any) {
    let unique_array = arr.filter(function(elem, index, self) {
      return index == self.indexOf(elem);
    });
    return unique_array
  }
 }




