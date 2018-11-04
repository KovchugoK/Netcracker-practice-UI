import {
  MatButtonModule,
  MatCheckboxModule,
  MatToolbarModule,
  MatCardModule,
  MatSidenavModule,
  MatDividerModule,
  MatFormFieldModule, MatInputModule, MatProgressSpinnerModule
} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
})
export class MaterialModule {
}
