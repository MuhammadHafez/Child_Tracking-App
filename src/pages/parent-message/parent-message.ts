import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Message } from '../../Models/Message';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Parent } from '../../Models/Parent';

@IonicPage()
@Component({
  selector: 'page-parent-message',
  templateUrl: 'parent-message.html',
})
export class ParentMessagePage {
  
  parent:Parent = new Parent;
  MessageList:Message[]=[];
  DisplayList:Message[]=[];
  MessageRef:FirebaseListObservable<Message[]>;
  constructor(private database:AngularFireDatabase,public navCtrl: NavController, public navParams: NavParams) {
    this.MessageRef=this.database.list("Messages");
    this.parent=this.navParams.data;

    this.MessageRef.subscribe((message)=>{
      this.MessageList=message;
      this.DisplayList=[];
      for(let msg of this.MessageList){
        if(msg.Reciever==this.parent.$key)
        {
          this.DisplayList.push(msg);
        }
      }
    });

   
  }
  Back(){
    this.navCtrl.pop();
    this.parent= new Parent;
  }

}
