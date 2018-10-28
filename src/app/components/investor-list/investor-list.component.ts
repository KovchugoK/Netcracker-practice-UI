import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/index";
import {User} from "../../model/User";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-investor-list',
  templateUrl: './investor-list.component.html',
  styleUrls: ['./investor-list.component.css']
})
export class InvestorListComponent implements OnInit {

  userList: Observable<User[]>;
  opened: false;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.userList = this.userService.getUserList();
  }
}
