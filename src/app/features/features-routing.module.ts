import { QuizComponent } from './avaliation/quiz/quiz.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "avaliacao",
    loadChildren: async () => import('./avaliation/avaliation.module').then((m) => m.AvaliationModule)
  },
  {
    path: "",
    redirectTo: "avaliacao",
    pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
