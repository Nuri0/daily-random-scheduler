/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { SelectorService } from './selector.service';
import {ChoiceDataService} from "./choice-data.service";
import {ChoiceGroup} from "./choice-group";
import {Choice} from "./choice";

describe('Md5SelectorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SelectorService,ChoiceDataService]
    });
  });

  describe("getChoicesForDate", () => {

    it("should return the same choice for the same date", inject([SelectorService,ChoiceDataService], (service:SelectorService,choiceDataService:ChoiceDataService) => {
      let group = new ChoiceGroup({title:"Test"});
      let choice1 = new Choice({title:"Hello1"});
      let choice2 = new Choice({title:"Hello2"});
      let choice3 = new Choice({title:"Hello3"});
      choiceDataService.addChoiceGroup(group);
      choiceDataService.addChoice(choice1,group.id);
      choiceDataService.addChoice(choice2,group.id);
      choiceDataService.addChoice(choice3,group.id);

      let date = new Date();
      let result1 = service.getChoicesForDate(group,date).pop();
      let result2 = service.getChoicesForDate(group,date).pop();

      expect(result1).toEqual(result2);
    }));

  });
});
