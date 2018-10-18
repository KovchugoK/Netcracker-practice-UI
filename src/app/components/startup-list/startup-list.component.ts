import {Component, OnInit} from '@angular/core';
import {StartupService} from '../../services/startup.service';
import {Observable} from 'rxjs';
import {Startup} from '../../model/Startup';

@Component({
  selector: 'app-startup-list',
  templateUrl: './startup-list.component.html',
  styleUrls: ['./startup-list.component.css']
})
export class StartupListComponent implements OnInit {

  startupList: Observable<Startup[]>;

  constructor(private startupService: StartupService) {
  }

  ngOnInit() {
    this.reloadDate();
  }

  reloadDate() {
    this.startupList = this.startupService.getStartupList();
  }
}
