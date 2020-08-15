import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { SocketService } from '../socket.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.css'],
})
export class SignupPage implements OnInit {
  name=''
  loading = false
  constructor(private auth:AngularFireAuth,private socketService:SocketService,private router:Router) { }

  ngOnInit() {
  }

  signup(){
    if(this.name && this.name!='' && this.name.trim()!=''){
      this.loading = true;
      this.auth.signInAnonymously().then(user=>{
        if(user){
          this.socketService.socket.emit('sign_in',{name:this.name,uid:user.user.uid})
          this.router.navigate(['home'])
        }else{
          this.loading = false;
        }
      })
    }

  }
}

