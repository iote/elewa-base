import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Logger } from '../../../../providers/logger/logger.service';
import { Observable } from 'rxjs/Observable';
import { GraphqlService } from '../../../../providers/graphql/graphql.service';

import { subjectDetailVM } from './subject-detail.viewmodel.graphql';

/**
 * App home component. Decides on what the logged in user gets to see.
 */ 
@Component({
  selector: 'ele-subject-detail',
  templateUrl: './subject-detail.component.html', 
  styleUrls: []
})
export class SubjectDetailComponent implements OnInit {
  
  constructor(private _graphqlService: GraphqlService, 
              private _logger: Logger, 
              private _route: ActivatedRoute,
              private _router: Router) { }
  
  /** ViewModel. Defined in imported graph */
  subject: Observable<any>; 

  ngOnInit () {
      this._logger.log(() => 'Subject Detail component initialised. Loading Courses For Subject.');

      this._route.params
                    .map(params => params.subjId)
                    .subscribe(this._loadViewModel.bind(this));
  }

  _loadViewModel(subjId: string): any {
    this.subject = this._graphqlService
                          .doQuery({ query: subjectDetailVM, 
                                     variables: { id: subjId } });
  }

  goToSubject(subjId) {
      this._router.navigate(['app/teach', subjId ]);
  }

}
