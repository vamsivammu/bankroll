import { Component } from '@angular/core';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.css'],
})
export class HomePage {
  loading = false;
  constructor(private socketService:SocketService,private router:Router) {}

  create_room(){
    // this.loading = true;
    console.log(this.socketService.socket.id)
    this.socketService.socket.emit('create_room',{},(msg)=>{
      if(msg=='created'){
        this.router.navigate(['game'])
      }else{
        alert(msg)
      }
    })
  }
  join_room(){
     this.router.navigate(['join-room'])
  }
}
