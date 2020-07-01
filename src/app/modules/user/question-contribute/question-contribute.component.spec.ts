import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuestionContributeComponent } from './question-contribute.component';

describe('QuestionContributeComponent', () => {
  let component: QuestionContributeComponent;
  let fixture: ComponentFixture<QuestionContributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionContributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionContributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
