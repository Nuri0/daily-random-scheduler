/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import {Choice} from "./choice";
import {ChoiceGroup} from "./choice-group";
import { ChoiceDataService } from './choice-data.service';

describe('ChoiceDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChoiceDataService]
    });
  });

  // ###################### ChoiceGroup methods ##########################

  describe("addChoiceGroup", () => {

    it("should add choice groups with increasing indices", inject([ChoiceDataService], (service:ChoiceDataService) => {
      let group1 = new ChoiceGroup({title:"Test1"});
      let group2 = new ChoiceGroup({title:"Test2"});
      service.addChoiceGroup(group1);
      service.addChoiceGroup(group2);

      expect(group1.id).toEqual(group2.id-1);

    }));

  });

  describe("deleteChoiceGroupById", () => {

    it("should delete the choice group referenced by the given index", inject([ChoiceDataService], (service:ChoiceDataService) => {
      let group1 = new ChoiceGroup({title:"Test1"});
      let group2 = new ChoiceGroup({title:"Test2"});
      service.addChoiceGroup(group1);
      service.addChoiceGroup(group2);

      service.deleteChoiceGroupById(group1.id)

      expect(service.getAllChoiceGroups()).toEqual([group2]);
      expect(service.getAllChoiceGroups().length).toEqual(1);

    }));

    it("should not delete anything, if the given id is not valid", inject([ChoiceDataService], (service:ChoiceDataService) => {
      let group1 = new ChoiceGroup({title:"Test1"});
      let group2 = new ChoiceGroup({title:"Test2"});
      service.addChoiceGroup(group1);
      service.addChoiceGroup(group2);

      service.deleteChoiceGroupById(service.lastChoiceGroupId+1000)

      expect(service.getAllChoiceGroups()).toEqual([group1,group2]);
      expect(service.getAllChoiceGroups().length).toEqual(2);

    }));

  });

  describe("getChoiceGroupById", () => {

    it("should return the choice group referenced by the given index", inject([ChoiceDataService], (service:ChoiceDataService) => {
      let group1 = new ChoiceGroup({title:"Test1"});
      let group2 = new ChoiceGroup({title:"Test2"});
      service.addChoiceGroup(group1);
      service.addChoiceGroup(group2);

      expect(service.getChoiceGroupById(group1.id)).toEqual(group1);

    }));

    it("should return 'undefined' if the given id is unknown", inject([ChoiceDataService], (service:ChoiceDataService) => {
      let group1 = new ChoiceGroup({title:"Test1"});
      let group2 = new ChoiceGroup({title:"Test2"});
      service.addChoiceGroup(group1);
      service.addChoiceGroup(group2);

      expect(service.getChoiceGroupById(service.lastChoiceGroupId+1000)).toEqual(undefined);

    }));

  });

  describe("updateChoiceGroupById", () => {

    it("should return the choice group referenced by the given index with updated values", inject([ChoiceDataService], (service:ChoiceDataService) => {
      let group1 = new ChoiceGroup({title:"Test1"});
      let group2 = new ChoiceGroup({title:"Test2"});
      service.addChoiceGroup(group1);
      service.addChoiceGroup(group2);

      let result = service.updateChoiceGroupById(group1.id, {title:"new Title"});

      expect(result.title).toEqual("new Title");

    }));

    it("should return 'undefined' if the given id is unknown", inject([ChoiceDataService], (service:ChoiceDataService) => {
      let group1 = new ChoiceGroup({title:"Test1"});
      let group2 = new ChoiceGroup({title:"Test2"});
      service.addChoiceGroup(group1);
      service.addChoiceGroup(group2);

      let result = service.updateChoiceGroupById(service.lastChoiceGroupId+1000, {title:"new Title"});

      expect(result).toEqual(undefined);

    }));

  });

  // ###################### Choice methods #########################

  describe("addChoiceGroup", () => {

    it("should add choices with increasing indices", inject([ChoiceDataService], (service:ChoiceDataService) => {
      let group1 = new ChoiceGroup({title:"Test1"});
      service.addChoiceGroup(group1);

      let choice1 = new Choice({title:"Hello1"});
      let choice2 = new Choice({title:"Hello2"});

      service.addChoice(choice1,group1.id);
      service.addChoice(choice2,group1.id);

      expect(choice1.id).toEqual(choice2.id-1);

    }));

    it("should add nothing if groupId is unknown", inject([ChoiceDataService], (service:ChoiceDataService) => {
      let group1 = new ChoiceGroup({title:"Test1"});
      service.addChoiceGroup(group1);

      let choice1 = new Choice({title:"Hello1"});
      let choice2 = new Choice({title:"Hello2"});

      service.addChoice(choice1,group1.id);

      expect(service.getAllChoiceGroups().length).toEqual(1);
      expect(group1.choices.length).toEqual(1);

      // add with unknown groupId
      service.addChoice(choice2,service.lastChoiceGroupId+1000);

      // nothing should have changed
      expect(service.getAllChoiceGroups().length).toEqual(1);
      expect(group1.choices.length).toEqual(1);

    }));

  });

  describe("deleteChoiceById", () => {

    it("should delete the choice referenced by the given index", inject([ChoiceDataService], (service:ChoiceDataService) => {
      let group1 = new ChoiceGroup({title:"Test1"});
      service.addChoiceGroup(group1);

      let choice1 = new Choice({title:"Hello1"});
      service.addChoice(choice1, group1.id);

      expect(group1.choices.length).toEqual(1);
      service.deleteChoiceById(choice1.id,group1.id);
      expect(group1.choices.length).toEqual(0);

    }));

    it("should not delete anything if the given choiceId is unknown", inject([ChoiceDataService], (service:ChoiceDataService) => {
      let group1 = new ChoiceGroup({title:"Test1"});
      service.addChoiceGroup(group1);

      let choice1 = new Choice({title:"Hello1"});
      service.addChoice(choice1, group1.id);

      expect(group1.choices.length).toEqual(1);
      service.deleteChoiceById(service.lastChoiceId+1000,group1.id);
      expect(group1.choices.length).toEqual(1);

    }));

    it("should not delete anything if the given groupId is unknown", inject([ChoiceDataService], (service:ChoiceDataService) => {
      let group1 = new ChoiceGroup({title:"Test1"});
      service.addChoiceGroup(group1);

      let choice1 = new Choice({title:"Hello1"});
      service.addChoice(choice1, group1.id);

      expect(group1.choices.length).toEqual(1);
      service.deleteChoiceById(choice1.id,service.lastChoiceGroupId+1000);
      expect(group1.choices.length).toEqual(1);

    }));

  });

  describe("getChoiceById", () => {

    it("should return the choice group referenced by the given index", inject([ChoiceDataService], (service:ChoiceDataService) => {
      let group1 = new ChoiceGroup({title:"Test1"});
      let choice1 = new Choice({title:"Hello1"});
      service.addChoiceGroup(group1);
      service.addChoice(choice1,group1.id);

      expect(service.getChoiceById(choice1.id,group1.id)).toEqual(choice1);

    }));

    it("should return 'undefined' if the given choiceId is unknown", inject([ChoiceDataService], (service:ChoiceDataService) => {
      let group1 = new ChoiceGroup({title:"Test1"});
      let choice1 = new Choice({title:"Hello1"});
      service.addChoiceGroup(group1);
      service.addChoice(choice1,group1.id);

      expect(service.getChoiceById(service.lastChoiceId+1000,group1.id)).toEqual(undefined);

    }));

    it("should return 'undefined' if the given groupId is unknown", inject([ChoiceDataService], (service:ChoiceDataService) => {
      let group1 = new ChoiceGroup({title:"Test1"});
      let choice1 = new Choice({title:"Hello1"});
      service.addChoiceGroup(group1);
      service.addChoice(choice1,group1.id);

      expect(service.getChoiceById(choice1.id,service.lastChoiceGroupId+1000)).toEqual(undefined);

    }));

  });

  describe("updateChoiceById", () => {

    it("should return the choice referenced by the given index with updated values", inject([ChoiceDataService], (service:ChoiceDataService) => {
      let group1 = new ChoiceGroup({title:"Test1"});
      let choice1 = new Choice({title:"Hello1"});
      service.addChoiceGroup(group1);
      service.addChoice(choice1,group1.id);

      let result = service.updateChoiceById(choice1.id,group1.id, {title:"new Title"});

      expect(result.title).toEqual("new Title");

    }));

    it("should return 'undefined' if the given choiceId is unknown", inject([ChoiceDataService], (service:ChoiceDataService) => {
      let group1 = new ChoiceGroup({title:"Test1"});
      let choice1 = new Choice({title:"Hello1"});
      service.addChoiceGroup(group1);
      service.addChoice(choice1,group1.id);

      let result = service.updateChoiceById(service.lastChoiceId+1000,group1.id, {title:"new Title"});

      expect(result).toEqual(undefined);

    }));

    it("should return 'undefined' if the given groupId is unknown", inject([ChoiceDataService], (service:ChoiceDataService) => {
      let group1 = new ChoiceGroup({title:"Test1"});
      let choice1 = new Choice({title:"Hello1"});
      service.addChoiceGroup(group1);
      service.addChoice(choice1,group1.id);

      let result = service.updateChoiceById(choice1.id,service.lastChoiceGroupId+1000, {title:"new Title"});

      expect(result).toEqual(undefined);

    }));

  });

});
