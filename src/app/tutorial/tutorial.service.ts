import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  private id = new BehaviorSubject('mt_01');
  currentTutorial = this.id.asObservable();

  constructor(private http: HttpClient, private router: Router) { }
  
  public getTutorialSidebar(){
    return new Promise((resolve, reject) => {
      this.http.get('http://localhost:3000/tutorial/get-sidebar')
      .subscribe((sidebar) => resolve(sidebar) ,(error) => reject(error))
    }) 
  }

  public getTutorialContent(tutorial_id : string){
    return new Promise((resolve, reject) =>{
      this.http.get(`http://localhost:3000/tutorial/get-content?tutorial_id=${tutorial_id}`)
      .subscribe((content) => resolve(content), (error) => reject(error));
    })
  }

  public getTutorialImage(tutorial_id: string, image_id: string){
    return new Promise((resolve, reject) =>{
      this.http.get(`http://localhost:3000/tutorial/get-tutorial-image?tutorial_id=${tutorial_id}&image_id=${image_id}`, {responseType: 'blob' })
      .subscribe((image) => { resolve(image)}, (error) => reject(error));
    })
  }

  public goToTutorial(tutorial_id){
    return new Promise((resolve, reject) => {
      this.id.next(tutorial_id);
      this.router.navigate(['/tutorial']);
      resolve(this.currentTutorial);
    })  
  }



}
