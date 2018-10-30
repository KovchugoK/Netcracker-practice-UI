import {Component, OnInit} from '@angular/core';
import {Startup} from '../../model/Startup';
import {StartupService} from '../../services/startup.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {

  startup: Startup;
  id: number;

  constructor(private startupService: StartupService, private route: ActivatedRoute, private location: Location) {

  }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.reloadDate();
  }

  reloadDate() {
    this.startupService.getStartupById(this.id).subscribe(startup => this.startup = startup);
  }

  deleteStartup() {
    this.startupService.deleteStartup(this.id).subscribe();
    this.goBack();
  }

  goBack(): void {
    this.location.back();
  }

}
