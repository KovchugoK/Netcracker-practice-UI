import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatSidenavModule} from '@angular/material';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatSidenavModule],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatSidenavModule],
})
export class MaterialModule { }
