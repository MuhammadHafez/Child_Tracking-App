import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  Login()
  {
    this.navCtrl.push("LoginPage");
  }
  Register(){
    this.navCtrl.push("RegisterPage");
  }
  RegisterChildren(){
    this.navCtrl.push("RegisterChildrenPage");
  }

}
