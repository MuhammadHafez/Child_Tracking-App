import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import Firebase from 'firebase';


import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      
      statusBar.styleDefault();
      splashScreen.hide();
    });
    Firebase.initializeApp({
      apiKey: "AIzaSyBZDLBE2jmWa7oTBZlylN7SGonI7d3lDPo",
      authDomain: "finaldatabase-33aa2.firebaseapp.com",
      databaseURL: "https://finaldatabase-33aa2.firebaseio.com",
      projectId: "finaldatabase-33aa2",
      storageBucket: "finaldatabase-33aa2.appspot.com",
      messagingSenderId: "726413874042"
    });
    
  }
}

