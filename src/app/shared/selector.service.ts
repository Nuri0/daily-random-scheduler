import { Injectable } from '@angular/core';
import seedrandom from "seedrandom";
import { Md5 } from "ts-md5/dist/md5";

import { ChoiceGroup } from "./choice-group";

@Injectable()
export class SelectorService {

  constructor() { }

  private formatDate(date: Date): string {
    return date.getDate() + "." + (date.getMonth()+1) + "." + date.getFullYear();
  }

  private getMd5ForDate(date: Date): string {
    return ""+Md5.hashStr(this.formatDate(date));
  }

  private hexStringToDecimal(hex: string) {
    let a = parseInt(hex,16);
    while (a > 1) {
       a /= 10;
    }
    return a;
  }

  private splitString(text: string, pieces: number): string[] {
    var splits = [];
    while (text.length > 0) {
      var splitLength = Math.ceil(text.length/pieces);
      splits.push(text.slice(0,splitLength));
      text = text.slice(splitLength);
      pieces--;
    }
    return splits;
  }

  // if no date provided, the method will use today
  getChoicesForDate(list: ChoiceGroup, date: Date = new Date()) {
	let amount = list.choicesPerDay;
    let md5String = this.getMd5ForDate(date);
    let strings = this.splitString(md5String,amount);
    var choices = [];

    strings.forEach(element => {      
      let rand = seedrandom(element)();
      let weightSum = list.choices.reduce((acc,el) => {return acc + el.weight;},0);
      let stepSize = list.choices[0].weight/weightSum;
      let index = 0;
      while(stepSize < rand) {
		index++;
        stepSize += list.choices[index].weight/weightSum;
      }

      choices.push({
        choice: list.choices[index],
        string: element,
        rand: rand
      })

    })

    return choices;
  }

}
