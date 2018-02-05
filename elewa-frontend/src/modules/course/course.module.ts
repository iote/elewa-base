import { NgModule } from '@angular/core';

import { CoreModule } from '../../base-modules/core.module';
import { SubjectSelectionComponent } from './components/subject-selection/subject-selection.component';
import { SubjectDetailComponent } from './components/subject-detail/subject-detail.component';


@NgModule({
  imports:      [ CoreModule ],

  declarations: [SubjectSelectionComponent, SubjectDetailComponent],

  exports:      [SubjectSelectionComponent],
})
export class CourseModule { }
