import { Component, OnInit } from '@angular/core';
import { QuestionGridService, QuestionDetailService } from 'src/app/services/question.service';
import { Question } from 'src/app/models/data';
import { BaseDetailComponent } from '../../base/base-detai.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent extends BaseDetailComponent<QuestionDetailService, Question> {

  constructor(private _questionDetailService: QuestionDetailService, protected _route: ActivatedRoute) {
    super(_questionDetailService, _route);
  }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();
  }
}
