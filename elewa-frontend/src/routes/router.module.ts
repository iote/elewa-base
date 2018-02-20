import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { ElewaPreloadStrategy } from './preloading-strategy';

import { LoginComponent } from '../modules/auth/login/login.component';
import { HomeComponent } from '../modules/home/components/home/home.component';
import { SubjectDetailComponent } from '../modules/course/components/subject-detail/subject-detail.component';
import { RegisterComponent } from '../modules/auth/register/register.component';

export const appRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'app',
    component: HomeComponent
  },
    {
      path: 'app/subject/:subjId',
      component: SubjectDetailComponent
    },
  { 
    path: '',
    redirectTo: '/app',
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
