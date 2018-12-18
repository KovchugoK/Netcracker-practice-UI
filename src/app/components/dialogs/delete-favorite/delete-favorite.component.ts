import {Component, Inject, OnInit} from '@angular/core';
import {NgRedux} from "@angular-redux/store";
import {AppState} from "../../../store/index";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {updateRouterState} from "../../../store/actions/router.actions";
import {DialogResult} from "../../../model/dialog-result";
import {deleteFavoriteAction} from "../../../store/actions/favorite.actions";
import {FavoriteDialogData} from "../../../model/dialog-data";

@Component({
  selector: 'app-delete-favorite',
  templateUrl: './delete-favorite.component.html',
  styleUrls: ['./delete-favorite.component.css']
})
export class DeleteFavoriteComponent implements OnInit {

  favoriteId: string;

  constructor(private ngRedux: NgRedux<AppState>,
              public dialogRef: MatDialogRef<DeleteFavoriteComponent>,
              @Inject(MAT_DIALOG_DATA) public data: FavoriteDialogData) {
  }

  ngOnInit() {
    this.favoriteId = this.data.favoriteId;

    this.dialogRef.afterClosed().subscribe(result => {
      if (result !== DialogResult.CLOSE) {
        this.ngRedux.dispatch(deleteFavoriteAction(this.favoriteId));
        /*this.ngRedux.dispatch(updateRouterState('/favorites/'
          + this.ngRedux.getState().currentUserState.currentUser.account.id));*/
      }
    });
  }

  onCancelClick() {
    this.dialogRef.close(DialogResult.CLOSE);
  }

}
