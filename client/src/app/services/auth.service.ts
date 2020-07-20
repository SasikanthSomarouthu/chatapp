import { Injectable } from '@angular/core';
import {  Router} from "@angular/router";
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Observable } from "rxjs";
import { User } from "../../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 private user:Observable<firebase.User>;
 private authState:any;
  constructor( private agAuth:AngularFireAuth,
    private db:AngularFireDatabase,
    private router:Router) {
      this.user=agAuth.authState;

     }
     signUp(email:string,password:string,displayName:string){
       return this.agAuth.auth.createUserWithEmailAndPassword(email,password).then((user)=>{
         this.authState=user;
         const status='online';
       }
       )}
}
