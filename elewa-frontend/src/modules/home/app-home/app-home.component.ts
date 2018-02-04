import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Logger } from '../../../kernel/services/logger/logger.service';
import { Observable } from 'rxjs/Observable';
import { GraphqlService } from '../../../kernel/services/graphql/graphql.service';

import { allSubjectsLinks } from './all-subjects-links.graphql';

/**
 * App home component. Decides on what the logged in user gets to see.
 */ 
@Component({
  selector: 'app-home',
  templateUrl: './app-home.component.html', 
  styleUrls: []
})
export class AppHomeComponent implements OnInit {

  constructor(private _graphqlService: GraphqlService, private _logger: Logger, private _router: Router) { }
  
  subjects: Observable<any[]>;

  ngOnInit () {
      this._logger.log(() => 'App home component initialised. Loading all subjects.');
      this.subjects = this._graphqlService.doQuery({ query: allSubjectsLinks })
                                          .map(data => data.subjects);
  }

  goToSubject(subjId) {
      this._router.navigate(['app/teach', subjId ]);
  }

  // TODO: put in service
  getIcon(subject) {
      return 'img/subjects/' + subject.icon + '.png';
  }
}
