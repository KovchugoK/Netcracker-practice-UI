import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material";
import {NgRedux} from "@angular-redux/store";
import {AppState} from "../../../store/index";

@Component({
  selector: 'app-disabled-edit',
  templateUrl: './disabled-edit.component.html',
  styleUrls: ['./disabled-edit.component.css']
})
export class DisabledEditComponent implements OnInit {

  constructor(private ngRedux: NgRedux<AppState>,
              public dialogRef: MatDialogRef<DisabledEditComponent>) { }

  ngOnInit() {
  }

}
