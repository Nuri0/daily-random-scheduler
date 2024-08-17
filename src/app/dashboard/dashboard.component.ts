import { Component, OnInit } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
    imports: [FormsModule, NgIf, NgFor, ChoiceGroupCardComponent]
})
export class DashboardComponent implements OnInit {

  newChoiceGroup: ChoiceGroup = new ChoiceGroup();

  constructor(private choiceDataService: ChoiceDataService, private md5Service: SelectorService) { }

  addChoiceGroup() {
    this.choiceDataService.addChoiceGroup(this.newChoiceGroup);
    this.newChoiceGroup = new ChoiceGroup();
  }

  get choiceGroups() {
    return this.choiceDataService.getAllChoiceGroups();
  }

  ngOnInit() {
  }

}
