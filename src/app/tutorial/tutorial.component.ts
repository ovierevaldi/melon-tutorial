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
  <div class="container-fluid mb-4">
  <div class="row">
    <nav class="col-md-3 col-lg-3 bg-light sidebar">
      <div class="sidebar-sticky" style="max-height: 720px; overflow-x: hidden; overflow-x: auto;">
        <h6 class="mt-4 mb-1">
          <a [ngClass]="tutorial_id == 'mt_01' ? 'selected': 'notSelected'" (click)="goToTutorial('mt_01')"><span>Melon Highlights</span></a>
        </h6>
        
        <h6 class="mt-4 mb-1">
          <span>Documentation</span>
        </h6>
        <ul style="padding-left: 3px;">
          <li *ngFor="let doc of documentation" style="list-style-type: none; margin-bottom: 5px;">
            <a [ngClass]="tutorial_id == doc.tutorial_id ? 'selected': 'notSelected'"  (click)="goToTutorial(doc.tutorial_id)">{{doc.sidebar_title}} </a>
          </li>
        </ul>

        <h6 class="mt-4 mb-1">
          <span>Project Sample</span>
        </h6>
        <ul style="padding-left: 10px">
          <li *ngFor="let sample of projectSample" style="list-style-type: none;">
            <a [ngClass]="tutorial_id == sample.tutorial_id ? 'selected': 'notSelected'" (click)="goToTutorial(sample.tutorial_id)">{{sample.sidebar_title}} </a>
          </li>
        </ul>

        <h6 class="mt-4 mb-1">
          <span>Video Tutorial</span>
        </h6>
        <ul style="padding-left: 10px">
          <li *ngFor="let video of videoTutorial" style="list-style-type: none;">
            <a [ngClass]="tutorial_id == video.tutorial_id ? 'selected': 'notSelected'" (click)="goToTutorial(video.tutorial_id)">{{video.sidebar_title}} </a>
          </li>
        </ul>
      </div>
    </nav>
    <main role="main" class="col-md-9 ml-sm-auto col-lg-9 pt-4 px-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
        <h1 class="h2">{{tutorialContent.title}}</h1>
      </div>
      <div #div (click)="click($event)" [innerHTML]="tutorialContent.description | safeHtml"></div>
    </main>
  </div>
</div>
  `,
  styles: [`.notSelected {color: #007bff;} .selected {color: black;}`]
})
export class TutorialComponent implements OnInit {
  sidebar = [];
  documentation = [];
  projectSample = [];
  videoTutorial = [];
  tutorial_id : string;
  tutorialContent : any = {title : ''};

  constructor(private tutorial: TutorialService, _DomSanitizationService: DomSanitizer) { }
  
  ngOnInit() {
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

}
