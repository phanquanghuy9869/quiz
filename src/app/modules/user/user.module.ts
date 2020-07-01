import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionDetailComponent } from './question-detail/question-detail.component';
import { QuestionListComponent } from './question-list/question-list.component';
import { MenuComponent } from './menu/menu.component';
import { ShareModule } from '../share/share.module';
import { RouterModule, Routes } from '@angular/router';
import { QuestionContributeComponent } from './question-contribute/question-contribute.component';

export const routes: Routes = [
  { path: 'question-list', component: QuestionListComponent },
  { path: 'question/:id', component: QuestionDetailComponent },
  { path: 'contribute-question/:id', component: QuestionContributeComponent },
  { path: 'contribute-question', component: QuestionContributeComponent },
];

@NgModule({
  declarations: [QuestionDetailComponent, QuestionListComponent, MenuComponent, QuestionContributeComponent],
  imports: [
    RouterModule.forChild(routes),
    ShareModule
  ]
})
export class UserModule { }
