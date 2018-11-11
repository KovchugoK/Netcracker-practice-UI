import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/index";
import {FavoriteService} from "../../services/favorite.service";


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  favoriteList: Observable<Account[]>;
  opened: false;

  constructor(private favoriteService: FavoriteService) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.favoriteList = this.favoriteService.getFavorites();
  }

}
