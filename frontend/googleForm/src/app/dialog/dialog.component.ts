import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  durationInSeconds = 1;
  constructor(
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  openSnackBar() {
    this._snackBar.openFromComponent(PizzaPartyAnnotatedComponent, {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }

  copyToClipBoard(): void {
    navigator.clipboard.writeText(this.data.url).then(
      () => {
        this.openSnackBar();
      },
      (err) => {
        console.error('Failed to copy text: ', err);
      }
    );
  }
}

@Component({
  selector: 'snack-bar-annotated-component-example-snack',
  templateUrl: 'snack-bar-annotated-component-example-snack.html',
  styles: [
    `
      :host {
        display: flex;
      }
    `,
  ],
})
export class PizzaPartyAnnotatedComponent {
  snackBarRef = Inject(MatSnackBarRef);
}
