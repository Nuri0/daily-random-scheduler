import { Component, Input, OnInit } from '@angular/core';

import {ChoiceDataService} from "./../shared/choice-data.service";
import {Choice } from "./../shared/choice";

@Component({
  selector: 'choice-overview',
  templateUrl: './choice-overview.component.html',
  styleUrls: ['./choice-overview.component.css']
})
export class ChoiceOverviewComponent implements OnInit {

  @Input()
  choice: Choice;

  @Input()
  groupId: number;

  constructor(private choiceDataService: ChoiceDataService) { }

  ngOnInit() {
  }

  choiceUpdated() {
    this.choiceDataService.updateChoiceById(this.choice.id,this.groupId,this.choice);
  }

  deleteChoice() {
    if (confirm("Do you really want to delete this choice?")) {
		  this.choiceDataService.deleteChoiceById(this.choice.id, this.groupId);
	  }
  }

}
