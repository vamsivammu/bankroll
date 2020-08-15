import { Component, OnInit } from '@angular/core';
import { SocketService } from '../socket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.page.html',
  styleUrls: ['./join-room.page.css'],
})
export class JoinRoomPage implements OnInit {
  room_id:Number
  loading = false
  constructor(private socketService:SocketService,private router:Router) { }

  ngOnInit() {
  }
  join(){
    this.loading = true
    this.socketService.socket.emit('join_room',{room_id:this.room_id},(msg)=>{
      if(msg=='joined'){
        this.router.navigate(['game'])
      }else{
        alert(msg)
      }
    })
  }
}
