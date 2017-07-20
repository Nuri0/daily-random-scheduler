export class Choice {
  id: number;
  title: string;
  color: string = "#000000";
  weight: number = 1;

  constructor(values: Object = {}) {
    Object.assign(this,values);
  }

}
