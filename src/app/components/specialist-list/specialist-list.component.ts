import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/index';
import {SpecialistService} from '../../services/specialist.service';
import {Account} from '../../model/Account';
import {Resume} from '../../model/Resume';
import {isLoading, selectResumes} from '../../store/selectors/resume.selector';
import {NgRedux, select} from '@angular-redux/store';
import {AppState} from '../../store/index';
import {skipWhile, take} from 'rxjs/internal/operators';
import {fetchResumesAction, searchResumesAction} from "../../store/actions/resume.actions";
import {Favorite} from "../../model/Favorite";
import {FavoriteService} from "../../services/favorite.service";
import {updateSpecialistsSearchToolbarAction} from "../../store/actions/specialists-search-toolbar.actions";
import {SearchObject} from "../../model/SearchObject";
import {updateFavoritesAction} from "../../store/actions/favorite.actions";


@Component({
  selector: 'app-specialist-list',
  templateUrl: './specialist-list.component.html',
  styleUrls: ['./specialist-list.component.css']
})
export class SpecialistListComponent implements OnInit {
  favorite: Favorite = new Favorite();
  favorites: Favorite[];

  @select(isLoading)
  isLoading: Observable<boolean>;

  @select(selectResumes)
  resumeList: Observable<Resume[]>;


  constructor(private ngRedux: NgRedux<AppState>,
              private specialisService: SpecialistService,
              private favoriteService: FavoriteService) {
  }

  ngOnInit() {
    if(this.ngRedux.getState().currentUserState.currentUser !== null){
    this.favoriteService.getFavorites(this.ngRedux.getState().currentUserState.currentUser.account)
      .subscribe(favoriteList => this.favorites = favoriteList);
    }
    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.dispatch(searchResumesAction(this.ngRedux.getState().specialistsSearchState.searchObj)));
  }


  onClick(account: Account, isAdded: boolean) {
    if (isAdded) {
      this.favoriteService.deleteFavoriteByAccountId(account.id).subscribe();
      this.reloadExtraData();
    } else {
      this.favorite.account = account;
      this.specialisService.post(this.favorite, this.ngRedux.getState().currentUserState.currentUser.account.id).subscribe();
      this.reloadExtraData();
    }
  }

  reloadData() {
    this.isLoading.pipe(skipWhile(result => result === true), take(2)).subscribe();
    this.favoriteService.getFavorites(this.ngRedux.getState().currentUserState.currentUser.account)
      .subscribe(favoriteList => this.favorites = favoriteList);

    this.isLoading.pipe(skipWhile(result => result === true), take(1))
      .subscribe(() => this.ngRedux.dispatch(searchResumesAction(this.ngRedux.getState().specialistsSearchState.searchObj)));
  }

  get currentAccount(): Account {
    return this.ngRedux.getState().currentUserState.currentUser.account;
  }

  isAddedToFavorite(account: Account): boolean {
    for (let i of this.favorites) {
      if (i.account.id === account.id) {
        return true;
      }
    }
    return false;
  }

  reloadExtraData(){
    this.reloadData();
    this.reloadData();
    this.reloadData();
    this.reloadData();
  }

}
