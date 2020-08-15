import { Component, OnInit ,ElementRef} from '@angular/core';
import * as p5 from 'p5';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.css'],
})
export class GamePage implements OnInit {
  canvasWid = 325;
  canvasHeight = 325;
  loading = true;
  started = false;
  can_run = true;
  is_current_turn = true;
  cities={
    start:{x:5,y:285,r:255,g:255,b:255,cost:-1,category:'quest',start:true,owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'START',version:0,sub_col:[255,255,255]},
    delhi:{x:5,y:245,r:141,g:187,b:68,cost:-1,category:'too_low',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'DELHI',version:0,sub_col:[168,203,109]},
    rio:{x:5,y:205,r:141,g:187,b:68,cost:-1,category:'too_low',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'RIO',version:0,sub_col:[168,203,109]},
    harbor:{x:5,y:165,r:240,g:250,b:253,cost:-1,category:'special',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'HARBOR',version:0,sub_col:[240,250,253]},
    bangkok:{x:5,y:125,r:89,g:180,b:246,cost:-1,category:'low',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'BANGKOK',version:0,sub_col:[158,213,252]},
    cairo:{x:5,y:85,r:89,g:180,b:246,cost:-1,category:'low',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'CAIRO',version:0,sub_col:[158,213,252]},
    madrid:{x:5,y:45,r:89,g:180,b:246,cost:-1,category:'low',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'MADRID',version:0,sub_col:[158,213,252]},
    question:{x:5,y:5,r:255,g:255,b:255,cost:-1,category:'quest',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'?',version:0,sub_col:[255,255,255]},
    djakarta:{x:45,y:5,r:174,g:63,b:107,cost:-1,category:'below_avg',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'JAKARTA',version:0,sub_col:[218,80,134]},
    berlin:{x:85,y:5,r:174,g:63,b:107,cost:-1,category:'below_avg',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'BERLIN',version:0,sub_col:[218,80,134]},
    moscow:{x:125,y:5,r:243,g:151,b:5,cost:-1,category:'avg',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'MOSCOW',version:0,sub_col:[252,190,93]},
    railway:{x:165,y:5,r:240,g:250,b:253,cost:-1,category:'special',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'RAILWAY',version:0,sub_col:[240,250,253]},
    toronto:{x:205,y:5,r:243,g:151,b:5,cost:-1,category:'avg',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'TORONTO',version:0,sub_col:[252,190,93]},
    seoul:{x:245,y:5,r:243,g:151,b:5,cost:-1,category:'avg',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'SEOUL',version:0,sub_col:[252,190,93]},
    jail:{x:285,y:5,r:255,g:255,b:255,cost:-1,category:'quest',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'JAIL',jail:true,version:0,sub_col:[255,255,255]},
    zurich:{x:285,y:45,r:28,g:144,b:108,cost:-1,category:'above_avg',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'ZURICH',version:0,sub_col:[94,210,173]},
    riyadh:{x:285,y:85,r:28,g:144,b:108,cost:-1,category:'above_avg',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'RIYADH',version:0,sub_col:[94,210,173]},
    sydney:{x:285,y:125,r:143,g:84,b:34,cost:-1,category:'high',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'SYDNEY',version:0,sub_col:[222,155,103]},
    elec:{x:285,y:165,r:240,g:250,b:253,cost:-1,category:'special',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'ELECTRICITY',version:0,sub_col:[240,250,253]},
    beijing:{x:285,y:205,r:143,g:84,b:34,cost:-1,category:'high',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'BEIJING',version:0,sub_col:[222,155,103]},
    dubai:{x:285,y:245,r:143,g:84,b:34,cost:-1,category:'high',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'DUBAI',version:0,sub_col:[222,155,103]},
    auction:{x:285,y:285,r:255,g:255,b:255,cost:-1,category:'quest',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'AUCTION',auction:true,version:0,sub_col:[240,250,253]},
    hongkong:{x:245,y:285,r:110,g:62,b:189,cost:1145,category:'vhigh',owner:'vamsi',upgrades:[],buyingPrice:100,sellingPrice:80,name:'HONG KONG',version:0,sub_col:[174,125,246]},
    paris:{x:205,y:285,r:110,g:62,b:189,cost:-1,category:'vhigh',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'PARIS',version:0,sub_col:[174,125,246]},
    london:{x:165,y:285,r:251,g:83,b:47,cost:-1,category:'vvhigh',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'LONDON',version:0,sub_col:[251,139,116]},
    airport:{x:125,y:285,r:240,g:250,b:253,cost:-1,category:'special',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'AIRPORT',version:0,sub_col:[240,250,253]},
    tokyo:{x:85,y:285,r:251,g:83,b:47,cost:-1,category:'vvhigh',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'TOKYO',version:0,sub_col:[251,139,116]},
    newyork:{x:45,y:285,r:251,g:83,b:47,cost:-1,category:'vvhigh',owner:null,upgrades:[],buyingPrice:100,sellingPrice:80,name:'NEW YORK',version:0,sub_col:[251,139,116]}
  }
  city_pos={
    start:{curr:4,tot:4}
  }
  show_dice = false;
  // cities = {}
  top_left_x = 5 + 35/2;
  top_left_y = 5 + 35/2;
  
  top_right_x = 285 + 35/2;
  top_right_y = 5 + 35/2;
  
  bottom_left_x = 5 + 35/2;
  bottom_left_y = 285 + 35/2;
  
  bottom_right_x = 285 + 35/2;
  bottom_right_y = 285 + 35/2;
  
  players = {
    vamsi:{
      city:'start',
      color:[19,141,218],
      x:this.cities['start'].x +35/2,
      y:this.cities['start'].y + 35/2
    },
    krishna:{
      city:'start',
      color:[74,188,48],
      x:this.cities['start'].x + 35/2,
      y:this.cities['start'].y + 35/2
    },
    a:{
      city:'start',
      color:[255,215,78],
      x:this.cities['start'].x + 35/2,
      y:this.cities['start'].y + 35/2
    },
    b:{
      city:'start',
      color:[254,76,59],
      x:this.cities['start'].x + 35/2,
      y:this.cities['start'].y + 35/2
    },
    

  }
  current_turn = 'krishna'
  moving=false;
  // players={}
  steps = 0;
  move_uid=''
  from_city =''
  p
  start_rolling = false;
  constructor(private el:ElementRef,private socketService:SocketService) {
    this.socketService.socket.on('new_player_joined',(r)=>{
      this.can_run = false;
      this.cities = r.cities;
      this.players = r.players;
      this.can_run = true;
      this.loading = false;
      console.log(this.players)
    })
    this.socketService.socket.on('init_play',(r)=>{
      this.players = r.players;
      this.cities = r.cities;
      this.current_turn = r.current_turn;
      if(this.current_turn==this.socketService.uid){
        this.is_current_turn = true;
      }
      this.started = true;

    })

    this.socketService.socket.on('rolled',(r)=>{
      this.can_run = false;
      this.steps = r.steps;
      this.move_uid = r.move_uid;
      this.from_city = r.from_city;
      this.roll_x = 162.5+90;
      this.roll_y=260;
      this.angle=0;
      this.start_rolling = true;
      this.can_run = true;


    })
   }

  ngOnInit() {
    
    const p5Obj = new p5(p=>{
      p.setup = ()=>{
        this.setup(p)
      }
      p.draw = ()=>{
        this.draw(p)
      }
      this.p = p;
    },this.el.nativeElement)
    
  }

  setup(p){
    const c = document.querySelector('#gameContainer');
    p.createCanvas(this.canvasWid,this.canvasHeight).parent(c);
    p.angleMode(p.DEGREES)
  }

  draw(p){
    p.background(255);
    p.rectMode(p.CORNER)
    if(this.can_run){
      this.drawCities(p);
      if(this.moving){
        if(this.steps==0){
          this.moving = false;
          var city_x = this.players[this.move_uid].x - 35/2;
          var city_y = this.players[this.move_uid].y - 35/2;
          if(this.city_pos[this.from_city] != undefined && this.city_pos[this.from_city] != null){
            this.city_pos[this.from_city].tot -= 1;
            this.city_pos[this.from_city].curr = this.city_pos[this.from_city].tot;
    
          }else{
            this.city_pos[this.from_city] = {tot:1,curr:1};
          }
          
          Object.keys(this.cities).forEach(c=>{
  
            if(this.cities[c].x==city_x && this.cities[c].y==city_y){
              
              if(this.city_pos[c] != undefined && this.city_pos[c] != null){
                this.city_pos[c].tot += 1;
                this.city_pos[c].curr = this.city_pos[c].tot;
        
              }else{
                this.city_pos[c] = {tot:1,curr:1};
        
              }
              this.players[this.move_uid].city = c;
            }
  
          })
          this.move_uid = ''

          if(this.current_turn==this.socketService.uid){
              this.socketService.socket.emit('roll_complete',{})
          }
          
        }
        if(this.steps!=0){
  
          this.movePlayer(this.move_uid);
                
        }
  
      }
      this.drawPlayer(p);
      if(this.start_rolling){
        this.roll_dice_anim()
        
      }
      if(this.show_dice){
        this.draw_dice(p);
      }

    }

  }
  roll_x = 162.5 + 135
  roll_y = 260
  angle = 0;
  roll_dice_anim(){
    if(this.roll_x > 162.5){
      this.angle -= 24;
      this.roll_x -= 9;
    }else{
      this.start_rolling = false;
    }
    
  }

  draw_dice(p){
    p.fill(210)
    p.noStroke();
    p.translate(this.roll_x,this.roll_y)
    p.rotate(this.angle)
    p.rectMode(p.CENTER)
    p.rect(0,0,30,30,5);
    p.fill(this.players[this.current_turn].color)
    const dis = 9;
    if(this.steps==1){
      p.ellipse(0,0,5,5);
    }else if(this.steps==2){
      p.ellipse(-dis,-dis,5,5);
      p.ellipse(dis,dis,5,5);
      
    }else if(this.steps==3){
      p.ellipse(-dis,-dis,5,5);
      p.ellipse(0,0,5,5)
      p.ellipse(dis,dis,5,5);
     
    }else if(this.steps==4){
      p.ellipse(-dis,-dis,5,5);
      p.ellipse(dis,dis,5,5);
      p.ellipse(-dis,dis,5,5);
      p.ellipse(dis,-dis,5,5);
      
    }else if(this.steps==5){
      p.ellipse(-dis,-dis,5,5);
      p.ellipse(dis,dis,5,5);
      p.ellipse(-dis,dis,5,5);
      p.ellipse(dis,-dis,5,5);
      p.ellipse(0,0,5,5)
    }else if(this.steps==6){
      p.ellipse(-dis,-dis,5,5);
      p.ellipse(dis,dis,5,5);
      p.ellipse(-dis,dis,5,5);
      p.ellipse(dis,-dis,5,5);
      p.ellipse(dis,0,5,5);
      p.ellipse(-dis,0,5,5);
    }
  }
  roll(){
    // if(this.current_turn==this.socketService.uid &&  this.is_current_turn){
    //   this.is_current_turn = false;
    //   this.socketService.socket.emit('roll')
    // }
    this.can_run = false;
    this.angle=0;
    this.roll_x = 162.5 + 135;
    this.roll_y = 260;
    this.steps = Math.ceil(Math.random()*6)
    this.show_dice = true;
    this.start_rolling = true;
    this.can_run = true;

  }
  drawCities(p){

    Object.keys(this.cities).forEach(city=>{
      var city_det = this.cities[city]
      // console.log(city_det.category)
      p.fill(city_det.r,city_det.g,city_det.b);
      p.noStroke();
      p.rect(city_det.x,city_det.y,35,35);
      p.fill(city_det.sub_col);
      p.rect(city_det.x,city_det.y,35,10);
      p.textAlign(p.CENTER,p.CENTER);
      if(city_det.category!="special" && city_det.category!="quest"){
        p.fill(255);
        p.textSize(5);
        p.stroke(255);
        p.strokeWeight(0.3);
        if(city_det.owner){
          p.fill(this.players[city_det.owner].color)
          // p.noStroke();
          p.strokeWeight(0.5)
          p.rect(city_det.x+2.5,city_det.y+1,30,12);
          p.fill(255)
          p.stroke(255)
          p.strokeWeight(0.5)
          p.textSize(9)
          p.text(city_det.cost.toString(),city_det.x + 2.5 + 30/2,city_det.y+1+6)
        }else{
          p.text(city_det.buyingPrice.toString(),city_det.x+35/2 ,city_det.y+5);
        }
        p.strokeWeight(0.3);
        p.fill(255)
        p.textSize(6)
        p.text(city_det.name,city_det.x+35/2,city_det.y+10+25/2);
        // console.log(city_det.category)
      }else if(city_det.category=="special"){
        p.fill(0,255,0)
        p.textSize(5);
        // console.log(city_det.category)
        p.stroke(0,255,0);
        p.strokeWeight(0.2);
        p.text(city_det.name,city_det.x+35/2 ,city_det.y+5);
        // p.textSize(6)
        // p.text(city_det.name,city_det.x+35/2,city_det.y+10+25/2);
      }else{
        p.fill(0)

        p.stroke(0);
        p.strokeWeight(0.2);
        p.textSize(6)
        p.text(city_det.name,city_det.x+35/2,city_det.y+10+25/2);
      }

    })
  }
  sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
  }
  drawPlayer(p){
    Object.keys(this.city_pos).forEach(c=>{
      this.city_pos[c].curr = this.city_pos[c].tot;
    })
    Object.keys(this.players).forEach(pl_id=>{
      var city = this.players[pl_id].city;
      p.fill(this.players[pl_id].color);
      p.stroke(255);
      p.strokeWeight(2.5);
      if(this.city_pos[city].curr==4){
        p.ellipse(this.players[pl_id].x -9,this.players[pl_id].y-9,9,9);
      }
      else if(this.city_pos[city].curr==3){
        p.ellipse(this.players[pl_id].x + 9,this.players[pl_id].y-9,9,9);
      }else if(this.city_pos[city].curr==2){
        p.ellipse(this.players[pl_id].x -9,this.players[pl_id].y + 9,9,9);
      }else if(this.city_pos[city].curr==1){
        if(this.city_pos[city].tot==1){
          p.ellipse(this.players[pl_id].x ,this.players[pl_id].y,9,9);
        }else{
          p.ellipse(this.players[pl_id].x +9,this.players[pl_id].y + 9,9,9);
        }
      }
      this.city_pos[city].curr -= 1;

    })


  }
  movePlayer(uid){
    if(this.steps==0){
      // this.moving = false;

    }else{
      if(this.players[uid].x==this.top_left_x){
        if(this.players[uid].y==this.top_left_y){
          this.players[uid].x += 40;
        }
        else{
          this.players[uid].y -= 40;
        }

      }else if(this.players[uid].x==this.top_right_x){
        if(this.players[uid].y==this.bottom_right_y){
          this.players[uid].x -= 40;
        }else{
          this.players[uid].y += 40;
        }
      }else if(this.players[uid].y==this.top_left_y){
        this.players[uid].x += 40;
      }else if(this.players[uid].y==this.bottom_left_y){
        this.players[uid].x -= 40;
      }

      // console.log(this.steps)
      this.steps--;
      this.sleep(500)
      // console.log(this.steps)

    }

  }
  // socket.on move = player_uid, current_city, 
  
  
}
