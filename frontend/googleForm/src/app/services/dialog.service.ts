import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  confirm(title: string, message: string): Promise<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message, type: 'confirm' },
    });

    return lastValueFrom(dialogRef.afterClosed());
  }

  alert(url: string): Promise<boolean> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: { url, type: 'alert' },
      position: { top: '30px' },
    });

    return lastValueFrom(dialogRef.afterClosed());
  }
}
