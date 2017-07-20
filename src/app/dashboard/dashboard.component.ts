import { Component, OnInit } from '@angular/core';

import {ChoiceDataService} from "./../shared/choice-data.service";
import {ChoiceGroup} from "./../shared/choice-group";
import {SelectorService} from "./../shared/selector.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [SelectorService]
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
