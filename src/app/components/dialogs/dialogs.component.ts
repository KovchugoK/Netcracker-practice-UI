import { Component, OnInit } from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {AppState} from '../../store';
import {MatDialog} from '@angular/material';
import {Observable} from 'rxjs';
import {closeDialogAction} from '../../store/actions/dialogs.actions';

@Component({
  selector: 'app-dialogs',
  templateUrl: './dialogs.component.html',
  styleUrls: ['./dialogs.component.css']
})
export class DialogsComponent implements OnInit {

  @select(state => state.dialogsState.isDialogOpen)
  readonly isDialogOpen: Observable<boolean>;

  constructor(private dialog: MatDialog, private ngRedux: NgRedux<AppState>) { }

  ngOnInit() {
    console.log('Open');
    this.isDialogOpen.subscribe((value) => {
      if (value) {
        const dialogProperty = this.ngRedux.getState().dialogsState.dialogProperty;
        const dialogRef = this.dialog.open(dialogProperty.componentType, {
          width: dialogProperty.width,
          height: dialogProperty.height,
          data: dialogProperty.data
        });
        dialogRef.afterClosed().subscribe(() => {
          this.ngRedux.dispatch(closeDialogAction());
        });
      }
    });
  }

}
