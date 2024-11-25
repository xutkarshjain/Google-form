import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  durationInSeconds = 1;
  constructor(
    private snackBarService: SnackBarService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  copyToShare() {
    let data = `${this.data.url}\n${this.data.content}`;
    navigator.clipboard.writeText(data).then(
      () => {
        this.snackBarService.openSnackBar(
          'Copied to clipboard.',
          'start',
          'bottom',
          1
        );
      },
      (err) => {
        this.snackBarService.openSnackBar(
          'Failed to Copy.',
          'start',
          'bottom',
          3
        );
      }
    );
  }

  copyToClipBoard(data: string): void {
    navigator.clipboard.writeText(data).then(
      () => {
        this.snackBarService.openSnackBar(
          'Copied to clipboard.',
          'start',
          'bottom',
          1
        );
      },
      (err) => {
        this.snackBarService.openSnackBar(
          'Failed to Copy.',
          'start',
          'bottom',
          3
        );
      }
    );
  }
}
