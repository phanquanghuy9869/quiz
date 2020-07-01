import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { QuestionDetailService } from 'src/app/services/question.service';
import { ActivatedRoute } from '@angular/router';
import { BaseDetailComponent } from '../../base/base-detai.component';
import { Question, Option } from 'src/app/models/data';
import { buffer } from 'rxjs/operators';

@Component({
  selector: 'app-question-contribute',
  templateUrl: './question-contribute.component.html',
  styleUrls: ['./question-contribute.component.css']
})
export class QuestionContributeComponent extends BaseDetailComponent<QuestionDetailService, Question> {
  public optionBuffer: Option = { text: '', code: '' }

  public editor = ClassicEditor;

  constructor(private _questionDetailService: QuestionDetailService, protected _route: ActivatedRoute) {
    super(_questionDetailService, _route);
  }

  async ngOnInit(): Promise<void> {
    await super.ngOnInit();
    if (this.model == null) {
      this.model = { content: '', selected: false, options: [], category: 'Chemiscal', level: 'Medium' };
    }
  }

  onReady(event: any) {
  }

  addOption() {
    if (!this.isNotEmptyOption(this.optionBuffer)) {
      return;
    }
    this.model.options.push(this.optionBuffer);
    this.resetBuffer();
  }

  removeOption(index: number) {
    this.model.options.splice(index, 1);
  }

  resetBuffer() {
    this.optionBuffer = { text: '', code: '' };
  }

  async addOrUpdate(): Promise<void>{
    this.addOption();
    await super.addOrUpdate();
  }

  isNotEmptyOption(option: Option) {
    return (option.text && option.text.length > 0 && option.code && option.code.length > 0);
  }
}
