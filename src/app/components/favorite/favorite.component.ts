import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs/index";
import {FavoriteService} from "../../services/favorite.service";
import {Favorite} from "../../model/Favorite";


@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  favoriteList: Observable<Favorite[]>;
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
