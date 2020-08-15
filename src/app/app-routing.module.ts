import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AngularFireAuthGuard,redirectLoggedInTo,redirectUnauthorizedTo} from '@angular/fire/auth-guard'
const redirectNewUser = ()=>redirectUnauthorizedTo(['signup'])
const redirectOldUser = ()=>redirectLoggedInTo(['home'])

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe:redirectNewUser}
  },
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full',

  },
  {
    path: 'game',
    loadChildren: () => import('./game/game.module').then( m => m.GamePageModule),
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe:redirectNewUser}
    
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule),
    canActivate:[AngularFireAuthGuard],
    data:{authGuardPipe:redirectOldUser}
  },
  {
    path: 'join-room',
    loadChildren: () => import('./join-room/join-room.module').then( m => m.JoinRoomPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
