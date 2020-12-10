import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Parent } from '../../Models/Parent';
import FireBase from 'firebase';
import { ParentList } from '../../app/FirebaseConfig';
import { findLocaleData } from '@angular/common/src/i18n/locale_data_api';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  NameCheck = true;
  Status = false;
  parent:Parent = new Parent;
  constructor(public navCtrl: NavController, public toast: ToastController, public navParams: NavParams) {
  }

  ValidateUserName() {
    for (let chr of this.parent.UserName) {
      if (chr == " ") {
        this.NameCheck = false;
        break;
      }
    }
  }

  Login() {
    this.ValidateUserName();
    if (this.NameCheck) {
      FireBase.database().ref(ParentList).on("child_added", (child) => {
        if (this.parent.UserName == child.val().UserName && this.parent.Password == child.val().Password && this.parent.Email==child.val().Email) {
          this.parent.$key = child.key;
          this.Status = true;
        }});

      if (this.Status) {
        this.navCtrl.push("ParentHomePage", this.parent);
        this.parent= new Parent;
              }
      else {
        this.FindError();
      }

    } 
    else {
      this.FindError();
    }

    

  }
    FindError(){
      this.navCtrl.pop();
      const toast = this.toast.create({
        message: "Sorry Your data is invalid",
        duration: 4000
      });
      toast.present();
      this.parent = new Parent;
    }
}
