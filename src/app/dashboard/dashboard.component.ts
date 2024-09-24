import { Component, OnInit } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChoiceGroupCardComponent } from '../choice-group-card/choice-group-card.component';
import { ChoiceDataService } from "./../shared/choice-data.service";
import { ChoiceGroup } from "./../shared/choice-group";
import { SelectorService } from "./../shared/selector.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [SelectorService],
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, NgFor, ChoiceGroupCardComponent, MatButtonModule, MatFormFieldModule, MatInputModule]
})
export class DashboardComponent implements OnInit {

  newChoiceGroupNameControl = new FormControl('', Validators.required);

  constructor(private choiceDataService: ChoiceDataService, private md5Service: SelectorService) { }

  addChoiceGroup() {
    const newChoiceGroup = new ChoiceGroup();
    newChoiceGroup.title = this.newChoiceGroupNameControl.value;
    this.choiceDataService.addChoiceGroup(newChoiceGroup);
    this.newChoiceGroupNameControl.reset();
  }

  get choiceGroups() {
    return this.choiceDataService.getAllChoiceGroups();
  }

  ngOnInit() {
  }

}
