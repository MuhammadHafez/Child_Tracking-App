import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChildPersonalPage } from './child-personal';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  declarations: [
    ChildPersonalPage,
  ],
  imports: [
    IonicPageModule.forChild(ChildPersonalPage),
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyATqpnvxJyt_PFfrLLglvNmmka3491GDO4"
    }),
  ],
})
export class ChildPersonalPageModule {}
