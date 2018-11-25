import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-skill-menu',
  templateUrl: './skill-menu.component.html',
  styleUrls: ['./skill-menu.component.css']
})
export class SkillMenuComponent implements OnInit {

  toppings = new FormControl();
  toppingList: string[] = ['Java', 'Python', 'C', 'SQL', 'TypeScript', 'JavaScript', 'Angular',
    'Spring', 'HTML', 'CSS', 'Paint', 'JUnit'];

  constructor() {
  }

  ngOnInit() {
  }

}
