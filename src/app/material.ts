import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatCardModule,
  MatSidenavModule,
  MatDividerModule,
  MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatDialogModule, MatRadioModule
} from '@angular/material';
import {MatChipsModule} from '@angular/material/chips';
import {MatListModule} from '@angular/material/list';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MatListModule,
    MatChipsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatRadioModule
  ],
  exports: [
    MatListModule,
    MatChipsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatRadioModule
  ],
})
export class MaterialModule {
}
