import { SharedModule } from './../../shared/shared.module';
import { HeaderComponent } from './../../shared/header/header.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AvaliationRoutingModule } from './avaliation-routing.module';
import { QuizComponent } from './quiz/quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';
import { AvaliationReportComponent } from './avaliation-report/avaliation-report.component';


@NgModule({
  declarations: [
    QuizComponent,
    AvaliationReportComponent
  ],
  imports: [
    CommonModule,
    AvaliationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule,
    SharedModule
  ],
  exports: []
})
export class AvaliationModule { }
