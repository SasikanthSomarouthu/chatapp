import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
//import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../../models/chat-message.model';

@Injectable()
export class ChatService {
  user: firebase.User;
  chatMessages: AngularFireList<any[]>;
  chatMessage: ChatMessage;
  //userName: Observable<string>;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
    ) {
        this.afAuth.authState.subscribe(auth => {
          if (auth !== undefined && auth !== null) {
            this.user = auth;
          }
         // this.userName=this.
         
          
          // this.getUser().subscribe(a => {
          //   this.userName = a.displayName;
          // });
        });
    }

  getUser() {
    const userId = this.user.uid;
    const path = `/users/${userId}`;
    return this.db.object(path);
  }

  getUsers() {
    const path = '/users';
    return this.db.list(path);
  }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    const email = 'sasi@example.com';//this.user.email;
    this.chatMessages = this.getMessages();
    this.db.list('messages').push({
      message: msg,
      timeSent: timestamp,
      userName:'test-user', //this.userName,
      email: email});
  }

  getMessages(): AngularFireList<ChatMessage[]> {
    // query to create our message feed binding
    return this.db.list('messages', ref => ref.limitToLast(25).orderByKey());
  }

  getTimeStamp() {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

    return (date + ' ' + time);
  }
}