import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    imports: [FormsModule, NgIf, NgFor, ChoiceCardComponent]
})
export class ChoiceGroupDetailComponent implements OnInit {

  numberOfDays: number = 100;

  choiceGroup: ChoiceGroup;
  newChoice: Choice = new Choice();

  analytics: Array<AnalyticResult> = [];

  constructor(private route: ActivatedRoute, private choiceDataService: ChoiceDataService, private md5Service: SelectorService) { }

  addChoice() {
    this.choiceDataService.addChoice(this.newChoice,this.choiceGroup.id);
    this.newChoice = new Choice();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.choiceGroup = this.choiceDataService.getChoiceGroupById(+params["id"]);
    })
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
