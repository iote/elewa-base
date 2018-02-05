import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Logger } from '../../../../providers/logger/logger.service';
import { Observable } from 'rxjs/Observable';
import { GraphqlService } from '../../../../providers/graphql/graphql.service';

import { subjectSelectionViewModel } from './subject-selection.viewmodel.graphql';

/**
 * App home component. Decides on what the logged in user gets to see.
 */ 
@Component({
  selector: 'ele-subject-selection',
  templateUrl: './subject-selection.component.html', 
  styleUrls: ['./subject-selection.component.scss']
})
export class SubjectSelectionComponent implements OnInit {

  constructor(private _graphqlService: GraphqlService, private _logger: Logger, private _router: Router) { }
  
  /** ViewModel. Defined in imported graph */
  subjects: Observable<any>; 

  ngOnInit () {
      this._logger.log(() => 'Subject Selection component initialised. Loading all subjects.');
      this.subjects = this._graphqlService.doQuery({ query: subjectSelectionViewModel })
                                          .map(data => data.subjects);
  }

  goToSubject(subjId) {
      this._router.navigate(['app/subject/', subjId]);
  }
  
}
