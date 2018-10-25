import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatSidenavModule, MatDividerModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatDividerModule
  ],
  exports: [
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatSidenavModule,
    MatDividerModule
  ],
})
export class MaterialModule {
}
