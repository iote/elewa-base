import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { ElewaPreloadStrategy } from './preloading-strategy';

import { LoginComponent } from '../../modules/auth/login/login.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  { 
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  }
  /*{ 
    path: '**', 
    component: PageNotFoundComponent 
  }*/
];
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        enableTracing: true, // <-- debugging purposes only
        // preloadingStrategy: ElewaPreloadStrategy, // <-- Review this
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule { }
