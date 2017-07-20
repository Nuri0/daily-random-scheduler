import { Component, Input, OnInit } from '@angular/core';

import {ChoiceDataService} from "./../shared/choice-data.service";
import {SelectorService} from "./../shared/selector.service";
import {ChoiceGroup} from "./../shared/choice-group";
import {Choice} from "./../shared/choice";

@Component({
  selector: 'choice-group-overview',
  templateUrl: './choice-group-overview.component.html',
  styleUrls: ['./choice-group-overview.component.css'],
  providers:[SelectorService]
})
export class ChoiceGroupOverviewComponent implements OnInit {

  @Input()
  group: ChoiceGroup;

  constructor(private choiceDataService: ChoiceDataService, private md5Service: SelectorService) { }

  deleteChoiceGroup() {
	  if (confirm("Do you really want to delete this group?")) {
		  this.choiceDataService.deleteChoiceGroupById(this.group.id);
	  }
  }

  getNextDaysSelections() {
	let outlook = [];
	let day = new Date(); // today
	for (let i=0; i<8; i++) {
		outlook.push({
			day: new Date(day.getTime()),
			selections: this.md5Service.getChoicesForDate(this.group,day)
		});
		day.setDate(day.getDate() + 1);
	}
	return outlook;
  }

  getTodaysSelections() {
    let date = new Date();
    let choices = this.md5Service.getChoicesForDate(this.group,date);
    return choices;
  }

  ngOnInit() {
  }

}
