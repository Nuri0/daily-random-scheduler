import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  save(key,data) {
    localStorage.setItem(key,JSON.stringify(data));
  }

  get(key) {
    let data = localStorage.getItem(key);
    if (!data) {
      return undefined;
    }

    return JSON.parse(data);
  }

}
