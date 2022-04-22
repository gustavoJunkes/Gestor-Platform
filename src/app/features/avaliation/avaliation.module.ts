import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvaliationRoutingModule } from './avaliation-routing.module';
import { QuizComponent } from './quiz/quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';


@NgModule({
  declarations: [
    QuizComponent
  ],
  imports: [
    CommonModule,
    AvaliationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule
  ],
  exports: []
})
export class AvaliationModule { }
