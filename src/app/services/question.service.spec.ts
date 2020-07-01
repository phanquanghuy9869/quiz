import { TestBed } from '@angular/core/testing';

import { QuestionGridService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionGridService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionGridService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
