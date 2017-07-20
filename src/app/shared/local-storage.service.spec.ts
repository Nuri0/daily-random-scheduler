/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalStorageService]
    });
  });

  describe("get(key)", () => {

    it("should get the same data thas has been saved", inject([LocalStorageService], (service:LocalStorageService) => {
      let num = 42;
      let str = "Hello";
      let obj = {title: "Test"};

      service.save("number",num);
      service.save("string",str);
      service.save("object",obj);

      expect(service.get("number")).toEqual(num);
      expect(service.get("string")).toEqual(str);
      expect(service.get("object")).toEqual(obj);
    }));

    it("should overwrite any data, if there is already some data under the given key", inject([LocalStorageService], (service:LocalStorageService) => {
      let test1 = {title:"Some Test"};
      let test2 = {title:"Antother Test"};

      service.save("key",test1);
      expect(service.get("key")).toEqual(test1);

      service.save("key",test2);
      expect(service.get("key")).toEqual(test2);

    }));

    it("should return undefined, if there is no value for the given key", inject([LocalStorageService], (service:LocalStorageService) => {
      localStorage.removeItem("key");
      expect(service.get("key")).toEqual(undefined);
    }));

  });
});
