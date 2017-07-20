import { Injectable } from '@angular/core';

import {Choice} from "./choice";
import {ChoiceGroup} from "./choice-group";

import {LocalStorageService} from "./local-storage.service";

@Injectable()
export class ChoiceDataService {

  private choicesSaveString = "choices";
  private lastChoiceIdSaveString = "lastChoiceId";
  private lastChoiceGroupIdSaveString = "lastChoiceGroup";

  lastChoiceId: number = 0;
  lastChoiceGroupId: number = 0;
  groups: ChoiceGroup[] = [];

  constructor(private lss: LocalStorageService) {
    this.groups = lss.get(this.choicesSaveString) || [];
    this.lastChoiceId = lss.get(this.lastChoiceIdSaveString) || 0;
    this.lastChoiceGroupId = lss.get(this.lastChoiceGroupIdSaveString) || 0;
  }

  private save() {
    this.lss.save(this.choicesSaveString,this.groups);
    this.lss.save(this.lastChoiceIdSaveString,this.lastChoiceId);
    this.lss.save(this.lastChoiceGroupIdSaveString,this.lastChoiceGroupId);
  }

  // ###################### ChoiceGroup methods ##########################

  addChoiceGroup(group:ChoiceGroup):ChoiceDataService {
    if (!group.id) {
      group.id = ++this.lastChoiceGroupId;
    }
    this.groups.push(group);
    this.save();
    return this;
  }

  deleteChoiceGroupById(groupId: number): ChoiceDataService {
    this.groups = this.groups.filter(group => group.id !== groupId);
    this.save();
    return this;
  }

  getAllChoiceGroups(): ChoiceGroup[] {
    return this.groups;
  }

  getChoiceGroupById(groupId:number): ChoiceGroup {
    return this.groups.filter(group => group.id === groupId).pop();
  }

  updateChoiceGroupById(groupId: number, values: Object = {}): ChoiceGroup {
    let group = this.getChoiceGroupById(groupId);
    if (!group) {
      return undefined;
    }
    Object.assign(group,values);
    this.save();
    return group;
  }

  // ###################### Choice methods ##########################

  addChoice(choice: Choice, groupId: number):ChoiceDataService {
    if (!choice.id) {
      choice.id = ++this.lastChoiceId;
    }
    let group = this.getChoiceGroupById(groupId);
    if (!!group) {
      group.choices.push(choice);
    }
    this.save();
    return this;
  }

  deleteChoiceById(choiceId: number, groupId: number): ChoiceDataService {
    let group = this.getChoiceGroupById(groupId);
    if (!!group) {
      group.choices = group.choices.filter(choice => choice.id !== choiceId);
    }
    this.save();
    return this;
  }

  getChoiceById(choiceId: number, groupId:number): Choice {
    let group = this.getChoiceGroupById(groupId);
    if (!group) {
      return undefined;
    }
    return group.choices.filter(choice => choice.id === choiceId).pop();
  }

  updateChoiceById(choiceId: number, groupId:number, values: Object = {}): Choice {
    let choice = this.getChoiceById(choiceId, groupId);
    if (!choice) {
      return undefined;
    }
    Object.assign(choice,values);
    this.save();
    return choice;
  }



}
