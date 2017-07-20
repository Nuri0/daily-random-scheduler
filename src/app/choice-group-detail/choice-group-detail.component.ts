import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {ChoiceGroup} from "./../shared/choice-group";
import {Choice} from "./../shared/choice";
import {ChoiceDataService} from "./../shared/choice-data.service";
import {SelectorService} from "./../shared/selector.service";

@Component({
  selector: 'app-choice-group-detail',
  templateUrl: './choice-group-detail.component.html',
  styleUrls: ['./choice-group-detail.component.css'],
  providers: [SelectorService]
})
export class ChoiceGroupDetailComponent implements OnInit {

  numberOfDays: number = 100;

  choiceGroup: ChoiceGroup;
  newChoice: Choice = new Choice();

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

    let analytics = {};
    this.choiceGroup.choices.forEach(choice => {
      analytics[choice.title] = 0;
    })

    for (let i=0; i<this.numberOfDays; i++) {
      let result = this.md5Service.getChoicesForDate(this.choiceGroup,day);

      result.forEach(element => {
        analytics[element.choice.title]++;
      })

      // get to next day
      day.setDate(day.getDate() + 1);
    }
    console.log(analytics);
  }

}
