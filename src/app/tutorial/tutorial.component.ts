import { Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import { TutorialService } from './tutorial.service';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml'})

export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-tutorial',
  template: `
  <div class="container-fluid" style="height: calc(100vh - 9vh);">
    <div class="row" style="height: 100%;">
      <div class="col-12 col-md-3 col-xl-auto bd-sidebar" [ngClass]=" mobileSize === false ? 'bigMode': 'smallMode'">
        <h4 class="mt-2 section">Contents Index:</h4>

          <span class="section">Documentation</span>
          <div *ngFor="let doc of documentation" class="ml-2">
            <button style="border: none; background: white; text-align: left" [ngClass]="tutorial_id == doc.tutorial_id ? 'selected': 'notSelected'" (click)="goToTutorial(doc.tutorial_id)">{{doc.sidebar_title}} </button>
          </div>
      
          <span class="section">Project Sample</span>
          <div *ngFor="let sample of projectSample" class="ml-2">
            <button style="border: none; background: white; text-align: left" [ngClass]="tutorial_id == sample.tutorial_id ? 'selected': 'notSelected'" (click)="goToTutorial(sample.tutorial_id)">{{sample.sidebar_title}}</button>
          </div>
      
          <span  class="section">Video Tutorial</span>
          <div *ngFor="let video of videoTutorial" class="ml-2">
          <button style="border: none; background: white; text-align: left" [ngClass]="tutorial_id == video.tutorial_id ? 'selected': 'notSelected'" (click)="goToTutorial(video.tutorial_id)">{{video.sidebar_title}} </button>
          </div>
      </div>

      <div class="col-12 col-md-9 col-xl" role="main" style="height: 100%; overflow-y: auto; background: #fcfcfc;">
        <div class="col border-bottom pt-2 mb-4" style="text-align: center">
          <h1>{{tutorialContent.title}}</h1>
        </div>
        <div style="min-height: 71vh" class="col-auto" #div (click)="click($event)" [innerHTML]="tutorialContent.description | safeHtml">
        </div>
        <app-footer></app-footer>
      </div>

    </div>
  </div>
  `,
  styles: [`.notSelected {color: #3C3C3C;} .selected {color: #73c046;} .section{color: #ff781f; font-weight: bold;} 
  button:focus {
    outline: white 0px auto;
  }
  button:hover {
    color: #73c046
  }

  .smallMode{
    height: 20%;
    overflow-x: auto;
  }
  .bigMode{
    height: 100%;
    overflow-x: auto;
  }

  `]
})
export class TutorialComponent implements OnInit {
  mobileSize = false;

  sidebar = [];
  documentation = [];
  projectSample = [];
  videoTutorial = [];
  tutorial_id : string;
  tutorialContent : any = {title : ''};

  constructor(private tutorial: TutorialService, _DomSanitizationService: DomSanitizer) { }
  
  ngOnInit() {
    this.getScreenWidth();
    // Get sidebar
    this.tutorial.getTutorialSidebar()
    .then((res : any) => {
      for (let i = 0; i < res.length; i++) {
        this.sidebar.push(res[i])
        if(res[i].section == 'Documentation')
          this.documentation.push(res[i])
        else if(res[i].section == 'Project Sample')
          this.projectSample.push(res[i])
        else if(res[i].section == 'Video Tutorial')
          this.videoTutorial.push(res[i])
      }
    })
    .catch((err) => console.log(err))

    //get tutorial content
    this.tutorial.currentTutorial.subscribe((id) =>{
      this.tutorial_id = id;  
      this.getCurrentTutorial(this.tutorial_id);
    });
  }

  getCurrentTutorial(tutorial_id){
    this.tutorial.getTutorialContent(tutorial_id)
    .then((content: any) => {
      this.tutorialContent = content[0];

      // has images
      if(this.tutorialContent.image != null){
        var contentImages = JSON.parse(this.tutorialContent.image);  
        contentImages.forEach(element => {
          this.getTutorialImage(tutorial_id, element.image)
        });
      }

      // has video
      if(this.tutorialContent.video != null){
        this.getTutorialVideo(tutorial_id);
      }

    })
    .catch((err) =>{
      console.log(err);
    })
  }

  getTutorialImage(tutorial_id, image_id){
    this.tutorial.getTutorialImage(tutorial_id, image_id)
    .then((image : Blob) => {
      if(image != null)
        this.createImageFromBlob(image, image_id)
    })
    .catch((err) => {
      console.log(err);
    })
  }

  createImageFromBlob(image: Blob, image_id:string) {
      let reader = new FileReader();

      if (image) {
        reader.readAsDataURL(image);
      }

      reader.addEventListener("load", () => {
        var img = document.getElementById(image_id) as HTMLImageElement;
        img.src = String(reader.result);
      }, false);
  }

  goToTutorial(tutorial_id){
    this.tutorial.goToTutorial(tutorial_id)
    .then(() => {
      this.getCurrentTutorial(this.tutorial_id);      
    })
  }

  click(evt) {
    const href = evt.target.getAttribute('href');
    if (href) {
      evt.preventDefault();
      this.goToTutorial(href);
    }
  }

  getTutorialVideo(tutorial_id){
    this.tutorial.getTutorialVideo(tutorial_id)
    .then((src) => {
      var video =  document.getElementById('mt-video') as HTMLSourceElement;
      console.log(video);
      video.src = String(src);
    })
    .catch((err) =>{
      console.log(err);
    })
  }

  getVideoURL(){
    return 'http://localhost:3000/video/mt_56/highlight4.mp4';
  }

  getScreenWidth(){
   var width = window.innerWidth
    if (width <= 766){
      this.mobileSize = true;
    }
    else{
      this.mobileSize = false;
    }
  }
}
