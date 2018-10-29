import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Startup} from '../../model/Startup';
import {StartupService} from '../../services/startup.service';
import {ActivatedRoute} from '@angular/router';
import {Resume} from '../../model/Resume';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit {

  startup: Startup;
  // resumes: Resume[];

  constructor(private startupService: StartupService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.reloadDate();
  }

  reloadDate() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.startupService.getStartupById(id).subscribe(startup => this.startup = startup);
    // this.resumes = this.startup.startupResumes.resume;
  }


}
