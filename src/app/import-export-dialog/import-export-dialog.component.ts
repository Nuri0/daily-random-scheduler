import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ChoiceDataService } from "../shared/choice-data.service";

@Component({
  selector: "app-import-export-dialog",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  templateUrl: `./import-export-dialog.component.html`,
  styleUrl: "./import-export-dialog.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportExportDialogComponent {
  private choiceDataService = inject(ChoiceDataService);
  private snackBar = inject(MatSnackBar);

  importControl = new FormControl("");

  copyConfigToClipboard() {
    this.choiceDataService.copyToClipboard();
    this.snackBar.open("Config copied to clipboard", null, { duration: 3000 });
  }

  importData() {
    this.choiceDataService.import(this.importControl.value);
    this.snackBar.open("Config imported successfully", null, { duration: 3000 });
  }
}
