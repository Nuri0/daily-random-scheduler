import {Choice} from "./choice";

export class ChoiceGroup {
  id: number;
  title: string;
  choices: Choice[] = [];
  
  choicesPerDay: number = 1;

  constructor(values: Object = {}) {
    Object.assign(this,values);
  }

}
