import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {FavoriteService} from '../../services/favorite.service';
import {Favorite} from '../../model/Favorite';
import {NgRedux, select} from "@angular-redux/store";
import {AppState} from "../../store/index";
import {selectFavorites, isLoading} from "../../store/selectors/favorite.selector";
import {fetchFavoritesAction} from "../../store/actions/favorite.actions";
import {showDialogAction} from "../../store/actions/dialogs.actions";
import {DeleteFavoriteComponent} from "../dialogs/delete-favorite/delete-favorite.component";
import {skipWhile, take} from "rxjs/internal/operators";


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {

  id_account: string = '';

  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(selectFavorites)
  favoriteList: Observable<Favorite[]>;


  constructor(private favoriteService: FavoriteService, private ngRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.dispatch(fetchFavoritesAction(this.ngRedux.getState().currentUserState.currentUser.account)));
  }


  deleteFavorite(favoriteId: string) {
    this.ngRedux.dispatch(showDialogAction({
      componentType: DeleteFavoriteComponent,
      data: {favoriteId}
    }));
  }


}
