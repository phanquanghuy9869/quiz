import { Injectable } from '@angular/core';
import { BaseHttpService } from './base/http.service';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from 'src/app-config/AppConfig';
import { BaseGridService, BaseDataSource } from './base/grid.service';
import { DetailService } from './base/detail.service';

@Injectable({
  providedIn: 'root'
})
export class QuestionGridService extends BaseGridService {
  getPagingUrl = AppConfig.settings.apiUrl + AppConfig.settings.question.getQuestionPagingUrl;

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}

export class QuestionDataSource extends BaseDataSource<QuestionGridService> { }


@Injectable({
  providedIn: 'root'
})
export class QuestionDetailService extends DetailService {
  getUrl = AppConfig.settings.apiUrl + AppConfig.settings.question.getQuestionUrl;
  addUrl = AppConfig.settings.apiUrl + AppConfig.settings.question.createQuestionUrl;
  updateUrl = AppConfig.settings.apiUrl + AppConfig.settings.question.updateQuestionUrl;
  deleteUrl = AppConfig.settings.apiUrl + AppConfig.settings.question.deleteQuestionUrl;

  constructor(protected httpClient: HttpClient) {
    super(httpClient);
  }
}