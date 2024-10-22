import { Component, Inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackBarService } from '../services/snack-bar.service';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.css'],
})
export class SnackBarComponent {
  msg: string = '';
  snackBarRef = Inject(MatSnackBarRef);
  constructor(snackBarService: SnackBarService) {
    snackBarService.getMessgae().subscribe((msg: string) => {
      this.msg = msg;
    });
  }
}
