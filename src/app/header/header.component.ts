import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TutorialService } from '../tutorial/tutorial.service';

@Component({
  selector: 'app-header',
  template: `
  <nav class="navbar navbar-expand-md sticky-top" id="container">
    <div class="container-fluid">
      <div class="col-lg-2 col-md justify-content-center-md">
        <a class="navbar-brand" href="#"> <img src="assets/images/logo-tutorial.png" alt="" style="height: 25px;"></a>
      </div>
      <div class="col-lg-10">
        <div class="row">
          <div class="col-lg-3 col-md mb-2 mt-2">
            <a (click)="goToTutorial('mt_01')">Melon Editor</a>
          </div>
          <div class="col-lg-3 col-md mb-2  mt-2">
            <a (click)="goToTutorial('mt_02')">Documentation</a>
          </div>
          <div class="col-lg-3 col-md mb-2  mt-2">
            <a (click)="goToTutorial('mt_42')">Project Sample</a>
          </div>
          <div class="col-lg-3 col-md mb-2  mt-2">
          <a (click)="goToTutorial('mt_56')">Video Tutorial</a>
          </div>
       </div>
      </div>
    </div>
  </nav>
  `,
  styles: [`
     #container{ background: #73c046; }
    .link{ text-align: center; color: #3C3C3C;}
  `]
})
export class HeaderComponent implements OnInit {



  constructor(private tutorial : TutorialService) { }

  ngOnInit() {
  }

  goToTutorial(tutorial_id){
    this.tutorial.goToTutorial(tutorial_id);
  }

}
