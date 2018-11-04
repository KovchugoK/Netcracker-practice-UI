import {Component, OnInit} from '@angular/core';
import {StartupService} from '../../services/startup.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {defaultStartup, Startup} from '../../model/Startup';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

@Component({
  selector: 'app-startup-edit',
  templateUrl: './startup-edit.component.html',
  styleUrls: ['./startup-edit.component.css']
})
export class StartupEditComponent implements OnInit {

  startupForm: FormGroup;
  startup: Startup;
  id: string;

  constructor(private startupService: StartupService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.reloadDate();
  }

  private initializeForm(startup: Startup) {
    this.startupForm = this.fb.group({
      //    id: [this.startup.id],
      startupName: [startup.startupName, Validators.required],
      idea: [startup.idea],
      sumOfInvestment: [startup.sumOfInvestment, Validators.pattern('[1-9][0-9]*')],
      aboutProject: [startup.aboutProject],
      businessPlan: [startup.businessPlan],
      //   account: [this.startup.account]
    });
    // console.log(this.startupForm);
  }


  get startupName(): FormControl {
    return this.startupForm.get('startupName') as FormControl;
  }

  get idea(): FormControl {
    return this.startupForm.get('idea') as FormControl;
  }

  get sumOfInvestment(): FormControl {
    return this.startupForm.get('sumOfInvestment') as FormControl;
  }

  get aboutProject(): FormControl {
    return this.startupForm.get('aboutProject') as FormControl;
  }

  get businessPlan(): FormControl {
    return this.startupForm.get('businessPlan') as FormControl;
  }

  reloadDate() {
    if (this.id !== null) {
      this.startupService.getStartupById(this.id).subscribe(startup => {
        this.startup = startup;
        this.initializeForm(startup);
      });
    } else {
      this.startup = defaultStartup;
      this.initializeForm(defaultStartup);
    }
  }

  goBack(): void {
    this.location.back();
  }

  updateStartup() {
    this.startupService.updateStartup(this.id, this.startupForm.value as Startup).subscribe(() => this.goBack());
  }

  createStartup() {
    this.startupService.createStartup(this.startupForm.value as Startup).subscribe(() => this.location.go('startup-list'));
  }

}
