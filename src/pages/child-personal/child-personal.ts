import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, LoadingController } from 'ionic-angular';
import { Child } from '../../Models/Child';
import { Geolocation } from '@ionic-native/geolocation';
import { Location } from '../../Models/Location';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Message } from '../../Models/Message';


@IonicPage()
@Component({
  selector: 'page-child-personal',
  templateUrl: 'child-personal.html',
})
export class ChildPersonalPage {
  LastLoction:Location= new Location(null,null);
  MessageHome:Message=new Message;
  MessageSchool:Message=new Message;
  MessageDangerous:Message=new Message;
  LocationStatus=false;
  NewLocation:Location=new Location (null,null);
  child:Child = new Child;
  MessageRef:FirebaseListObservable<Message []>;
  constructor(public navCtrl: NavController,public database:AngularFireDatabase ,public toast:ToastController,public LoadingCtrl:LoadingController,public navParams: NavParams,public mdlCtrl:ModalController,private GeoLocation:Geolocation) {
    this.child = this.navParams.data;
    this.MessageRef =this.database.list("Messages");
    this.LastLoction=this.child.CurrentLocation;
    setInterval(()=>{
      this.setCurrentLocation();
      if(this.child.CounterDangerous>=5)
      {
        console.log("Done Dangerous ");
        this.MessageDangerous.Sender= this.child.Name;
          this.MessageDangerous.Reciever=this.child.ParentNumber;
          this.MessageDangerous.Content="Hi , "+this.child.Name +"didn't move from this place from 15 minutes";
          this.MessageRef.push(this.MessageDangerous);
          this.child.CounterDangerous=0;
      }
      
      if(this.LastLoction == this.child.CurrentLocation){
        this.child.CounterDangerous++;
        console.log("count");
      }
      else{
        this.child.CounterDangerous=0;
      }
      
        if(!this.child.Timer){
        if(this.child.HomeAddress == this.child.CurrentLocation ){
          this.MessageHome.Sender= this.child.Name;
          this.MessageHome.Reciever=this.child.ParentNumber;
          this.MessageHome.Content="Hi , "+this.child.Name +"has arrived to home";
          this.MessageRef.push(this.MessageHome);
          this.child.Timer=1;
        } 
        else if(this.child.SchoolAddress == this.child.CurrentLocation)
        {
          this.MessageSchool.Sender= this.child.Name;
          this.MessageSchool.Reciever=this.child.ParentNumber;
          this.MessageSchool.Content="Hi , "+this.child.Name +"has arrived to school";
          this.MessageRef.push(this.MessageSchool);
          this.child.Timer=1;
        }
      }
      else if(this.child.HomeAddress != this.child.CurrentLocation || this.child.SchoolAddress != this.child.CurrentLocation  ){
        this.child.Timer=0;
      } 
    },18000);
  }
  SendNotes(){
    this.navCtrl.push("MessagePage",this.child);
  }
  setCurrentLocation(){
    /*const Loading=this.LoadingCtrl.create({
      content:"Wait Until detect Location"
    })
    Loading.present();
    */this.GeoLocation.getCurrentPosition()
    .then((locationdate)=>{
      this.NewLocation.Latitude=locationdate.coords.latitude;
      this.NewLocation.Longitude=locationdate.coords.longitude;
      this.LocationStatus=true;
      this.child.CurrentLocation.Latitude=locationdate.coords.latitude;
      this.child.CurrentLocation.Longitude=locationdate.coords.longitude;
      //Loading.dismiss();
      
      
      console.log(this.child.CurrentLocation);
    }).catch((error)=>
      {const toast= this.toast.create({
        message:"Sorry error has accourd ",
        duration:3000
      });
      toast.present();
     } )
  }
  

}
