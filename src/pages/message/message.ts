import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Child } from '../../Models/Child';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Parent } from '../../Models/Parent';
import { ParentList } from '../../app/FirebaseConfig';
import { Message } from '../../Models/Message';
import { IfStmt } from '@angular/compiler';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  Message:Message=new Message;
  MessageRef:FirebaseListObservable<Message[]>;
  child:Child=new Child;
  constructor(public toast:ToastController,public database:AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
  this.child=this.navParams.data;
    this.MessageRef=this.database.list("Messages");
}
  Send(){
    console.log("done");
    if(this.Message.Content!=""){
      this.Message.Sender=this.child.Name;
    this.Message.Reciever=this.child.ParentNumber;
    this.MessageRef.push(this.Message);
    }
    else{
      const toast= this.toast.create({
        message:"Faild, You put empty message",
        duration:3000
      });
      toast.present();
    }
      this.navCtrl.pop();
    this.Message=new Message;
  }
  Close(){
    this.navCtrl.pop();
    this.Message=new Message;
  }

  
}
