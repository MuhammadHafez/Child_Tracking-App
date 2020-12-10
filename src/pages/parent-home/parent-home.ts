import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController, LoadingController, ViewController } from 'ionic-angular';
import { Child } from '../../Models/Child';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Parent } from '../../Models/Parent';
import { ChildsList } from '../../app/FirebaseConfig';

@IonicPage()
@Component({
  selector: 'page-parent-home',
  templateUrl: 'parent-home.html',
})
export class ParentHomePage {

  ChildListStatus= true;
  Status=false;
  parent = new Parent;
  mychild=new Child;
  DisplayList: Child[] = [];
  ChildList: Child[] = [];
  ChildRef: FirebaseListObservable<Child[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private DataBase: AngularFireDatabase, private ActionCtrl: ActionSheetController,
    public MdlCtrl:ModalController ,public ViewCtrl:ViewController, public LoadCtrl:LoadingController) {

      const Loading = this.LoadCtrl.create({
        content:"Wait Until display your own Children"
      });
      Loading.present();
    this.ChildRef = this.DataBase.list(ChildsList);
    this.parent = this.navParams.data;

    this.ChildRef.subscribe((child) => {
      this.ChildList = child;
      this.DisplayList=[];
      for(let obj of this.ChildList){
        console.log(obj);
        console.log(this.parent.$key);
      if(this.parent.$key==obj.ParentNumber)
      this.DisplayList.push(obj);
    }
    });
   
      
    Loading.dismiss();
  }
  Logout(){
    this.navCtrl.popToRoot();
    this.parent=new Parent;
  }
  SeeMessage(){
    this.navCtrl.push("ParentMessagePage",this.parent);
  }
  GotoAddChildPage() {
    this.navCtrl.push("AddChildPage", this.parent);

  }
  thisChildClicked(chld:Child){
    console.log(chld.ParentNumber);
    const ActionSheet= this.ActionCtrl.create({
      title:"Name is: "+chld.Name,
      buttons:[
        {
          text:"Edit",
          handler:()=>{
            console.log(chld);
            this.navCtrl.push("EditChildrePage",chld);
          }
        },
        {
          text:"Delete",
          handler:()=>{
            this.ChildRef.remove(chld.$key);
          }
        },
        {
          text:"Track him",
          handler:()=>{
            const Loading = this.MdlCtrl.create("TrackingPage",chld);
            Loading.present();
          }
        },
        {
          text:"Cancel",
          handler:()=>{
            
          }
        }
      ]

      }
      
    );
    ActionSheet.present();
  }

}
