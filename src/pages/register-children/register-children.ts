import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Parent } from '../../Models/Parent';
import {  ChildsList, ParentList } from '../../app/FirebaseConfig';
import FireBase from 'firebase';
import { Child } from '../../Models/Child';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';



@IonicPage()
@Component({
  selector: 'page-register-children',
  templateUrl: 'register-children.html',
})
export class RegisterChildrenPage {
  Status = false;
  Child:Child = new Child;
  ChildList:Child[]=[];
  ChildRef:FirebaseListObservable<Child[]>;
  constructor(public DataBase:AngularFireDatabase,public navCtrl: NavController, public toast: ToastController, public navParams: NavParams) {
      this.ChildRef=this.DataBase.list(ChildsList);

      this.ChildRef.subscribe((item)=>{
        this.ChildList=item;
      });
  }

  CheckChild() {
      for (let child of this.ChildList ){
        if(this.Child.Name==child.Name && this.Child.Age==child.Age && this.Child.SchoolName==child.SchoolName)
        {
          this.Status=true;
          this.Child=child;
          break;
        }
      }
      if(!this.Status){
        this.navCtrl.pop();
        const toast= this.toast.create({
          message:"Sorry You don't have Supervisor",
          duration:4000
        });
        toast.present();
      }
      else {
        this.navCtrl.push("ChildPersonalPage",this.Child);
      } 
        this.Child=new Child;
        this.Status=false;
    }
}
