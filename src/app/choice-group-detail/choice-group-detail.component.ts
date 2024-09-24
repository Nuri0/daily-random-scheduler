import { Component, inject, OnInit } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChoiceCardComponent } from '../choice-card/choice-card.component';
import { Choice } from "./../shared/choice";
import { ChoiceDataService } from "./../shared/choice-data.service";
import { ChoiceGroup } from "./../shared/choice-group";
import { SelectorService } from "./../shared/selector.service";

export interface AnalyticResult {
  choice: string;
  amount: number;
}

@Component({
    selector: 'app-choice-group-detail',
    templateUrl: './choice-group-detail.component.html',
    styleUrls: ['./choice-group-detail.component.css'],
    providers: [SelectorService],
    standalone: true,
    imports: [ReactiveFormsModule, FormsModule, NgIf, NgFor, ChoiceCardComponent, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule]
})
export class ChoiceGroupDetailComponent implements OnInit {

  choiceGroupId: number = inject(MAT_DIALOG_DATA);

  numberOfDays: number = 100;

  choiceGroup: ChoiceGroup;
  newChoiceNameControl = new FormControl('', Validators.required);

  analytics: Array<AnalyticResult> = [];

  constructor(private choiceDataService: ChoiceDataService, private md5Service: SelectorService) { }

  addChoice() {
    let newChoice: Choice = new Choice();
    newChoice.title = this.newChoiceNameControl.value;
    this.choiceDataService.addChoice(newChoice, this.choiceGroup.id);
    this.newChoiceNameControl.reset();
  }

  ngOnInit() {
    this.choiceGroup = this.choiceDataService.getChoiceGroupById(this.choiceGroupId);
  }

  choiceUpdated(choice) {
    this.choiceDataService.updateChoiceById(choice.id,this.choiceGroup.id,choice);
  }

  choiceGroupUpdated() {
	this.choiceDataService.updateChoiceGroupById(this.choiceGroup.id,this.choiceGroup);
  }

  startAnalytics() {
    let day = new Date();

    let data: Record<string, number> = {};
    this.choiceGroup.choices.forEach(choice => {
      data[choice.title] = 0;
    })

    for (let i=0; i<this.numberOfDays; i++) {
      let result = this.md5Service.getChoicesForDate(this.choiceGroup,day);

      result.forEach(element => {
        data[element.choice.title]++;
      })

      // get to next day
      day.setDate(day.getDate() + 1);
    }

    this.analytics = [];
    this.analytics = Object.keys(data).map(key => {
      return {
        choice: key,
        amount: data[key]
      }
    })
  }

}
