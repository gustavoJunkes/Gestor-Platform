import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { QuestionCardComponent } from './question-card/question-card.component';


@NgModule({
  declarations: [
    QuestionCardComponent
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule
  ]
})
export class QuestionModule { }
