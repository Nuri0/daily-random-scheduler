import { Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { FormsModule } from '@angular/forms';
import { Choice } from "../shared/choice";
import { ChoiceDataService } from "../shared/choice-data.service";

@Component({
    selector: 'choice-card',
    templateUrl: './choice-card.component.html',
    styleUrls: ['./choice-card.component.css'],
    standalone: true,
    imports: [FormsModule, MatCardModule, MatIconModule, MatButtonModule]
})
export class ChoiceCardComponent implements OnInit {

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
