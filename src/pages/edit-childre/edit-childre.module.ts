import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditChildrePage } from './edit-childre';
import {AgmCoreModule} from '@agm/core';

@NgModule({
  declarations: [
    EditChildrePage,
  ],
  imports: [
    IonicPageModule.forChild(EditChildrePage),
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyATqpnvxJyt_PFfrLLglvNmmka3491GDO4"
    }),
  ],
})
export class EditChildrePageModule {}
