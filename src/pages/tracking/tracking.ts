import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Child } from '../../Models/Child';
import { Location } from '../../Models/Location';
import {Geolocation} from '@ionic-native/geolocation';


@IonicPage()
@Component({
  selector: 'page-tracking',
  templateUrl: 'tracking.html',
  providers:[Geolocation]
})
export class TrackingPage {
  LocationStatus = false;
  Baseline: Location = new Location(29.866866, 31.315270);
  MarkerLocation:Location = new Location(null,null);
  Child:Child= new Child;
  constructor(public ViewCtrl:ViewController,public navCtrl: NavController, public navParams: NavParams,private Geolocation:Geolocation) {
    this.Child=this.navParams.data;
  }

  GetCurrentLocation(){
    console.log(this.Child);
    this.MarkerLocation.Latitude=this.Child.CurrentLocation.Latitude;
    this.MarkerLocation.Longitude=this.Child.CurrentLocation.Longitude;
    this.LocationStatus=true;
  }
  Close(){
    this.ViewCtrl.dismiss();
  }

}
