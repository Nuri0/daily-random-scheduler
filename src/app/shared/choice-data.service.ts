import { Injectable } from '@angular/core';

import { Choice } from "./choice";
import { ChoiceGroup } from "./choice-group";

import { LocalStorageService } from "./local-storage.service";
import { Config } from './model';

import { Clipboard } from '@angular/cdk/clipboard';

@Injectable()
export class ChoiceDataService {

  private choicesSaveString = "choices";
  private lastChoiceIdSaveString = "lastChoiceId";
  private lastChoiceGroupIdSaveString = "lastChoiceGroup";

  private configSaveString = 'schedulerConfig';

  private config: Config;
  private defaultCOnfig: Config = {
    groups: [],
    lastChoiceGroupId: 0,
    lastChoiceId: 0
  }

  constructor(
    private lss: LocalStorageService,
    private clipboard: Clipboard
  ) {
    this.config = lss.get(this.configSaveString) || this.defaultCOnfig;
  }

  private save() {
    this.lss.save(this.configSaveString, this.config);
  }

  public copyToClipboard() {
    this.clipboard.copy(JSON.stringify(this.config));
  }

  public import(json: string) {
    this.config = JSON.parse(json);
    this.save();
  }

  // ###################### ChoiceGroup methods ##########################

  addChoiceGroup(group:ChoiceGroup):ChoiceDataService {
    if (!group.id) {
      group.id = ++this.config.lastChoiceGroupId;
    }
    this.config.groups.push(group);
    this.save();
    return this;
  }

  deleteChoiceGroupById(groupId: number): ChoiceDataService {
    this.config.groups = this.config.groups.filter(group => group.id !== groupId);
    this.save();
    return this;
  }

  getAllChoiceGroups(): ChoiceGroup[] {
    return this.config.groups;
  }

  getChoiceGroupById(groupId:number): ChoiceGroup {
    return this.config.groups.filter(group => group.id === groupId).pop();
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
      choice.id = ++this.config.lastChoiceId;
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
