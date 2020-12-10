import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Parent } from '../../Models/Parent';
import { Child } from '../../Models/Child';
import { FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { Location } from '../../Models/Location';
import { ChildsList } from '../../app/FirebaseConfig';

@IonicPage()
@Component({
  selector: 'page-edit-childre',
  templateUrl: 'edit-childre.html',
})
export class EditChildrePage {

  NameCheck=false;
  AgeCheck=false;
  LocationCheck=false;
  SchoolCheck=false;
  
  HomeLocation = false;
  SchoolLocation = false;

  LocationStatus=false;

  Baseline: Location = new Location(29.866866, 31.315270);
  MarkerLocation = new Location(null, null);
  ParentKey:string="";
  mychild = new Child;
  parent = new Parent;
  ChildRef: FirebaseObjectObservable<Child>;
  constructor(public toast: ToastController, public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
     
    this.mychild=this.navParams.data;
    this.ChildRef = this.database.object(ChildsList+"/"+this.mychild.$key);
    console.log("In Constructor");
    this.ParentKey=this.mychild.ParentNumber;
    console.log(this.mychild.ParentNumber);
  }

  

  EditChild() { 
    console.log("In Function");
    console.log(this.mychild);
    this.ValidateName();
    this.ValidateAge();
    this.ValidateLocations();
    this.ValidateSchoolName();
    console.log(this.SchoolCheck +" "+ this.NameCheck+" "+this.AgeCheck+" "+this.LocationCheck );
    console.log(this.mychild);
    if (this.SchoolCheck && this.NameCheck &&this.AgeCheck &&this.LocationCheck) {
      this.mychild.ParentNumber=this.ParentKey;
      this.ChildRef.update(this.mychild);
      this.navCtrl.pop();
      console.log("1 "+ this.mychild) ;
    }
    else {
      this.navCtrl.pop();
      const tst = this.toast.create({
        message: "Sorry,Update Failed",
        duration:3000
      });
      tst.present();
      console.log("2 "+ this.mychild) ;
    }
    this.parent = new Parent;
    this.mychild = new Child;
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
    this.LocationStatus=true;
  }
  SetHomeLocation() { 
    this.mychild.HomeAddress=this.MarkerLocation;
    this.HomeLocation = true;
    this.LocationStatus=true;
  }
  SetSchoolLocation() {
    this.mychild.SchoolAddress = this.MarkerLocation;
    this.SchoolLocation = true;
    this.LocationStatus=true;
  }


}
