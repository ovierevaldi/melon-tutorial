import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TutorialService } from '../tutorial/tutorial.service';

@Component({
  selector: 'app-header',
  template: `
  <div class="header-container">
    <nav class="navbar navbar-expand">
    <div class="col-2">
      <img src="assets/images/logo-tutorial.png" alt="" style="height: 40px;">
    </div>
    <div class="col-10">
      <div class="navbar-collapse collapse" id="navbarsExample04">
        <div class="col-3 link">
          <a>Melon Editor <span class="sr-only">(current)</span></a>
        </div>    
        <div class="col-3 link">
          <a (click)="goToTutorial('mt_02')">Documentation <span class="sr-only">(current)</span></a>
        </div> 
        <div class="col-3 link">
          <a (click)="goToTutorial('mt_42')">Project Sample <span class="sr-only">(current)</span></a>
        </div> 
        <div class="col-3 link">
          <a (click)="goToTutorial('mt_56')">Video Tutorial <span class="sr-only">(current)</span></a>
        </div>  
      </div>    
      </div>
    </nav>
  </div>
  `,
  styles: [`
    .header-container{ background: #73c046; }
    .link{ text-align: center; color: white;}
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
