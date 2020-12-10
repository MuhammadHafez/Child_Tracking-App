import { Component, ɵConsole } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Parent } from '../../Models/Parent';
import { ParentList } from '../../app/FirebaseConfig';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  NameCheck=true;
  Status = false;
  parent:Parent = new Parent;
  ParentsList:Parent[]=[];
  DataRef:FirebaseListObservable<Parent []>;
  constructor(public DB:AngularFireDatabase,public navCtrl: NavController, public toastCtrl:ToastController,public navParams: NavParams) {
    this.DataRef =this.DB.list(ParentList);

    this.DataRef.subscribe((item)=>{
      this.ParentsList=item;
    });
  }
  AddParent() {
    for (let parent of this.ParentsList ){
      if(this.parent.UserName==parent.UserName && this.parent.Email==parent.Email&&this.parent.Password==parent.Password)
      {
        this.Status=true;
        this.parent=parent;
        break;
      }
    }
    if(!this.Status){
      this.DataRef.push(this.parent);
      for(let parent of this.ParentsList ){
        if(this.parent.UserName==parent.UserName && this.parent.Email==parent.Email&&this.parent.Password==parent.Password)
        {
          this.parent=parent;
          break;
        }
      }
      this.navCtrl.push("ParentHomePage",this.parent);
    }
    else {
      this.navCtrl.push("ParentHomePage",this.parent);
    } 
      this.parent=new Parent;
      this.Status=false;
  }


/*
  AddParent(){
    this.ValidateUserName();
    if(this.NameCheck)
    { const DataBase = FireBase.database().ref(ParentList);
      DataBase.on("child_added",(child)=>{
        if(this.parent.UserName ==child.val().UserName && this.parent.Email ==child.val().Email&&this.parent.Password==child.val().Password){
          this.Status = false;
          this.parent.$key=child.key;
        }
        });
        if(this.Status)
        {
           DataBase.push(this.parent);
          DataBase.on("child_added",(child)=>{
            if(this.parent.UserName ==child.val().UserName && this.parent.Email ==child.val().Email&&this.parent.Password==child.val().Password ){
              this.parent.$key=child.key;
            }  });
          this.navCtrl.push("ChildPersonalPage",this.parent);
        }
        else{
          this.navCtrl.push("ChildPersonalPage",this.parent);   
        }
      }
    else{
      const toast = this.toastCtrl.create({
        message:"Sorry UserName shouldn't have space",
        duration:3000
      });
      this.navCtrl.pop();
      toast.present();
    }
    
    this.parent=new Parent;    
   
  }*/
  ValidateUserName(){
    for(let chr of this.parent.UserName)
    {
      if(chr ==" ")
      {
        this.NameCheck=false;
        break;
      }
    }
  }
  }
