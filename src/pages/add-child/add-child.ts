import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Child } from '../../Models/Child';
import { Parent } from '../../Models/Parent';
import { Location } from '../../Models/Location';

@IonicPage()
@Component({
  selector: 'page-add-child',
  templateUrl: 'add-child.html',
})
export class AddChildPage {
  NameCheck=false;
  AgeCheck=false;
  LocationCheck=false;
  SchoolCheck=false;
  HomeLocation = false;
  SchoolLocation = false;
  LocationStatus = false;


  Baseline: Location = new Location(29.866866, 31.315270);
  MarkerLocation = new Location(null, null);
  
  mychild = new Child;
  parent = new Parent;
  ChildRef: FirebaseListObservable<Child[]>;
  
  constructor(public toast: ToastController, public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    this.ChildRef = this.database.list('Childs');
    this.parent = this.navParams.data;
  }

  

  AddChild() {
    this.ValidateName();
    this.ValidateAge();
    this.ValidateLocations();
    this.ValidateSchoolName();
    console.log(this.SchoolCheck +" "+ this.NameCheck+" "+this.AgeCheck+" "+this.LocationCheck );
    if (this.SchoolCheck && this.NameCheck &&this.AgeCheck &&this.LocationCheck) {
      this.mychild.ParentNumber = this.parent.$key;
      this.mychild.CurrentLocation=this.mychild.HomeAddress;
      this.ChildRef.push(this.mychild);
      this.navCtrl.pop();
      console.log("1 "+ this.mychild) ;
    }
    else {
      this.navCtrl.pop();
      const tst = this.toast.create({
        message: "Sorry, You put invalid data",
        duration:3000
      });
      tst.present();
      console.log("2 "+ this.mychild) ;
    }
    this.parent = new Parent;
    this.mychild = new Child;
  }
  
  SetHomeLocation() { 
    this.mychild.HomeAddress = this.MarkerLocation;
    this.HomeLocation = true;
  }
  SetSchoolLocation() {
    this.mychild.SchoolAddress = this.MarkerLocation;
    this.SchoolLocation = true;
  }



  ValidateSchoolName(){
    if(this.mychild.SchoolName !="")
    {
      this.SchoolCheck=true;
    }
  }
  ValidateLocations() {
    if (this.mychild.HomeAddress != null && this.mychild.SchoolAddress != null) {
      this.LocationCheck = true;
    }
  }

  ValidateName() {
    
    if (this.mychild.Name !="") {
      console.log("Name :"+this.mychild.Name);
     
      for (let chr of this.mychild.Name) {
        if (chr <= 'z' && chr >= 'a' || chr <= 'Z' && chr >= 'A'||chr ==" ") {
          this.NameCheck = true;
        }
        else {
          this.NameCheck = false;
          break;
        }
      }
    }
  
  }

  ValidateAge() {
    if (this.mychild.Age > 1 && this.mychild.Age <= 100 && this.mychild.Age!=null) {
      this.AgeCheck = true;
    }
  }

  mapclicked(event) {
    this.MarkerLocation.Latitude = event.coords.lat;
    this.MarkerLocation.Longitude = event.coords.lng;
    this.LocationStatus = true;
  }
}

