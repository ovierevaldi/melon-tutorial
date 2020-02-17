import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TutorialComponent } from './tutorial/tutorial.component';


const routes: Routes = [
  {
    path: 'tutorial',
    component: TutorialComponent
  },
  {
    path: 'tutorial/:tutorial_id',
    component: TutorialComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
