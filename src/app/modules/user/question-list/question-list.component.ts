import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { QuestionGridService, QuestionDataSource } from 'src/app/services/question.service';
import { BaseGridComponent } from '../../base/base-grid.component';
import { StringHelper } from '../../../utilities/string-helper';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent extends BaseGridComponent<QuestionGridService, QuestionDataSource> {
  displayedColumns: string[] = ['title'];
  // displayedColumns: string[] = ['title', 'category', 'author', 'text', 'options'];

  constructor(private _questionService: QuestionGridService) {
    super(_questionService, QuestionDataSource);
  }

  getFilterParams(): string {
    const params = StringHelper.serializeObjToUrlParam(this.filter);
    return params;
  }
}
