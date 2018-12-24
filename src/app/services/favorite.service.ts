import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
 import {Account} from '../model/Account';
import {Favorite} from "../model/Favorite";
import {AppState} from "../store/index";
import {NgRedux} from "@angular-redux/store";

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  favoritetUrl = '/api/favorites';

  constructor(private http: HttpClient,
              private ngRedux: NgRedux<AppState>) {
  }

  getFavorites(account: Account): Observable<any> {
    return this.http.get<Favorite[]>(`${this.favoritetUrl}` + '/' + account.id);
  }

  deleteFavorite(id: string){
    let params = new HttpParams().set('id_account', this.ngRedux.getState().currentUserState.currentUser.account.id);
    return this.http.delete(`${this.favoritetUrl}` + '/' + id, { params: params });
  }
}
