import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterChildrenPage } from './register-children';

@NgModule({
  declarations: [
    RegisterChildrenPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterChildrenPage),
  ],
})
export class RegisterChildrenPageModule {}
