import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ParentMessagePage } from './parent-message';

@NgModule({
  declarations: [
    ParentMessagePage,
  ],
  imports: [
    IonicPageModule.forChild(ParentMessagePage),
  ],
})
export class ParentMessagePageModule {}
