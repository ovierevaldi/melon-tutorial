import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
  <div class="row" id="container">
    <div class="col-4">
      <a class="link" href="http://melonjs.org/">MelonJs.org</a>
    </div>
    <div class="col-4">
      <span>Copyright 2018 - Melon Editor team</span>
    </div>
    <div class="col-4">
      <a class="link" href="http://www.melongaming.com/">Melongaming.com</a>
    </div>
  </div>
  `,
  styles: [`#container {background : #ff781f; text-align: center; padding: 25px;}
            .link {color: white;}`]
})
export class FooterComponent implements OnInit {

  constructor() { }
  
  ngOnInit() {
  }

}
