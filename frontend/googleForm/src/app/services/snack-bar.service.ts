import { Injectable } from '@angular/core';
import {
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}
  private msg: string = '';

  openSnackBar(
    msg: string,
    horizontalPosition: MatSnackBarHorizontalPosition,
    verticalPosition: MatSnackBarVerticalPosition,
    durationInSeconds: number
  ) {
    this.msg = msg;
    this._snackBar.openFromComponent(SnackBarComponent, {
      duration: durationInSeconds * 1000,
      horizontalPosition: horizontalPosition,
      verticalPosition: verticalPosition,
    });
  }

  getMessgae(): Observable<string> {
    return of(this.msg);
  }
}
