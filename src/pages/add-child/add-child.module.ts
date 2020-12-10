import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddChildPage } from './add-child';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  declarations: [
    AddChildPage,
  ],
  imports: [
    IonicPageModule.forChild(AddChildPage),
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyATqpnvxJyt_PFfrLLglvNmmka3491GDO4"
    }),
  ],
})
export class AddChildPageModule {}
