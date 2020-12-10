import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrackingPage } from './tracking';
import {AgmCoreModule} from '@agm/core';
import {Geolocation} from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    TrackingPage,
  ],
  imports: [
    IonicPageModule.forChild(TrackingPage),
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyATqpnvxJyt_PFfrLLglvNmmka3491GDO4"
    }),
  ],
})
export class TrackingPageModule {}
