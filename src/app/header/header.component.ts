import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TutorialService } from '../tutorial/tutorial.service';

@Component({
  selector: 'app-header',
  template: `
  <nav class="navbar navbar-expand-md sticky-top" id="container">
    <div class="container-fluid">
      <div class="col-lg-3 col-md justify-content-center-md pl-0">
        <div class="row">
          <div class="col-6 pl-0">         
            <img src="assets/images/logo-tutorial.png" alt="" style="width: 100%;">
          </div>
          <div class="col-auto pl-0 mt-1">
            <div class="dropdown">
              <button type="button" class="dropdown-toggle" data-toggle="dropdown">
                API Version 
              </button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">1.0</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-9">
        <div class="row">
          <div class="col-lg-3 col-md mb-2 mt-2">
            <button style="border: none; background:  #73c046; text-align: left" (click)="goToTutorial('mt_01')">Melon Editor</button>
          </div>
          <div class="col-lg-3 col-md mb-2  mt-2">
            <button style="border: none; background:  #73c046; text-align: left" (click)="goToTutorial('mt_02')">Documentation</button>
          </div>
          <div class="col-lg-3 col-md mb-2  mt-2">
            <button style="border: none; background:  #73c046; text-align: left" (click)="goToTutorial('mt_42')">Project Sample</button>
          </div>
          <div class="col-lg-3 col-md mb-2  mt-2">
          <button style="border: none; background:  #73c046; text-align: left" (click)="goToTutorial('mt_56')">Video Tutorial</button>
          </div>
       </div>
      </div>
    </div>
  </nav>
  `,
  styles: [`
     #container{ background: #73c046; }
    .link{ text-align: center; color: #3C3C3C;}

    button:focus {
      outline: white 0px auto;
      color: white;
    }
    button:hover {
      color: white;
    }
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
