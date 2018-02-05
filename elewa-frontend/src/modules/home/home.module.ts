import { NgModule } from '@angular/core';

import { CoreModule } from '../../base-modules/core.module';
import { HomeComponent } from './components/home/home.component';
import { CourseModule } from '../course/course.module';

/**
 * Home Module. Contains landing components - app load + landing screen after login
 */
@NgModule({
  imports:      [CoreModule, CourseModule],

  declarations: [HomeComponent],

  exports:      [],
})
export class HomeModule { }
