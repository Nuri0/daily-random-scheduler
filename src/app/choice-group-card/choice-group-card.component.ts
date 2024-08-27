import { Component, Input, OnInit } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

import { DatePipe, NgFor, NgIf } from "@angular/common";
import { RouterLink } from "@angular/router";
import { ChoiceDataService } from "../shared/choice-data.service";
import { ChoiceGroup } from "../shared/choice-group";
import { SelectorService } from "../shared/selector.service";

@Component({
  selector: "choice-group-overview",
  templateUrl: "./choice-group-card.component.html",
  styleUrls: ["./choice-group-card.component.css"],
  providers: [SelectorService],
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgFor,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ChoiceGroupCardComponent implements OnInit {
  @Input()
  group: ChoiceGroup;

  constructor(
    private choiceDataService: ChoiceDataService,
    private md5Service: SelectorService
  ) {}

  deleteChoiceGroup() {
    if (confirm("Do you really want to delete this group?")) {
      this.choiceDataService.deleteChoiceGroupById(this.group.id);
    }
  }

  isColorLight(hex: string) {
    // https://awik.io/determine-color-bright-dark-using-javascript/
    const color = +("0x" + hex.slice(1).replace(hex.length < 5 && /./g, '$&$&'));
    const r = color >> 16;
    const g = color >> 8 & 255;
    const b = color & 255;

    const hsp = Math.sqrt(
      0.299 * (r * r) +
      0.587 * (g * g) +
      0.114 * (b * b)
    )

    return hsp > 127.5;
  }

  getNextDaysSelections() {
    let outlook = [];
    let day = new Date(); // today
    for (let i = 0; i < 8; i++) {
      outlook.push({
        day: new Date(day.getTime()),
        selections: this.md5Service.getChoicesForDate(this.group, day),
      });
      day.setDate(day.getDate() + 1);
    }
    return outlook;
  }

  getTodaysSelections() {
    let date = new Date();
    let choices = this.md5Service.getChoicesForDate(this.group, date);
    return choices;
  }

  ngOnInit() {}
}
