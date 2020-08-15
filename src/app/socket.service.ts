import { Injectable } from '@angular/core';
import * as io from 'socket.io-client'
import {AngularFireAuth} from '@angular/fire/auth'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  socket:SocketIOClient.Socket
  uid=''
  constructor(private auth:AngularFireAuth) {
    this.auth.onAuthStateChanged(user=>{
      if(user){
        this.uid = user.uid
        console.log(this.uid)
        this.socket.emit('sign_in',{uid:this.uid})
      }
    })
  }
  connect(){
    this.socket = io('http://localhost:5000');
  }

}
